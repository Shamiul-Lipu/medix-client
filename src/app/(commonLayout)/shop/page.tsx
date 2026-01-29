"use client";

import { useState } from "react";
import { Filter, LayoutGrid, List, Star, Search } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

// -----------------------------
// FilterSidebar: move outside
// -----------------------------
interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

// Define a Product type
interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  prescriptionRequired: boolean;
  inStock: boolean;
}

// Type the array
const ALL_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    brand: "HealthCare",
    price: 5.99,
    rating: 4.8,
    reviews: 124,
    category: "Pain Relief",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&h=400&auto=format&fit=crop",
    prescriptionRequired: false,
    inStock: true,
  },
  {
    id: 2,
    name: "Amoxicillin 250mg",
    brand: "PharmaMed",
    price: 12.5,
    rating: 4.5,
    reviews: 89,
    category: "Antibiotics",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=400&h=400&auto=format&fit=crop",
    prescriptionRequired: true,
    inStock: true,
  },
  {
    id: 3,
    name: "Vitamin C 1000mg",
    brand: "Vitality",
    price: 15.99,
    rating: 4.9,
    reviews: 245,
    category: "Vitamins",
    image:
      "https://images.unsplash.com/photo-1616671285442-990422e5898d?q=80&w=400&h=400&auto=format&fit=crop",
    prescriptionRequired: false,
    inStock: true,
  },
  {
    id: 4,
    name: "Blood Pressure Monitor",
    brand: "Omron",
    price: 45.0,
    rating: 4.7,
    reviews: 156,
    category: "Medical Devices",
    image:
      "https://images.unsplash.com/photo-162859535482e-59737578fffe?q=80&w=400&h=400&auto=format&fit=crop",
    prescriptionRequired: false,
    inStock: true,
  },
  {
    id: 5,
    name: "Ibuprofen 200mg",
    brand: "HealthCare",
    price: 6.5,
    rating: 4.6,
    reviews: 78,
    category: "Pain Relief",
    image:
      "https://images.unsplash.com/photo-1550572017-ed20015ade7a?q=80&w=400&h=400&auto=format&fit=crop",
    prescriptionRequired: false,
    inStock: true,
  },
  {
    id: 6,
    name: "Insulin Glargine",
    brand: "Lantus",
    price: 85.0,
    rating: 4.9,
    reviews: 42,
    category: "Diabetes",
    image:
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?q=80&w=400&h=400&auto=format&fit=crop",
    prescriptionRequired: true,
    inStock: false,
  },
];

const CATEGORIES = [
  "All",
  "Pain Relief",
  "Vitamins",
  "Personal Care",
  "Baby Care",
  "Diabetes",
  "Antibiotics",
  "Medical Devices",
];

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="flex flex-col gap-6">
      {/* Categories */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
          Categories
        </h3>
        <div className="flex flex-col gap-2">
          {CATEGORIES.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategory === cat}
                onCheckedChange={() => setSelectedCategory(cat)}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">
                {cat}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Prescription */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
          Prescription
        </h3>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Checkbox id="rx-required" />
            <Label htmlFor="rx-required" className="text-sm">
              Required
            </Label>
          </div>
          <div className="flex items-center gap-2">
            <Checkbox id="rx-not-required" />
            <Label htmlFor="rx-not-required" className="text-sm">
              Not Required
            </Label>
          </div>
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-3">
          Availability
        </h3>
        <div className="flex items-center gap-2">
          <Checkbox id="in-stock" />
          <Label htmlFor="in-stock" className="text-sm">
            In Stock Only
          </Label>
        </div>
      </div>
    </div>
  );
};

// -----------------------------
// Main CatalogPage
// -----------------------------

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Filter by category AND search
  const filteredProducts = ALL_PRODUCTS.filter(
    (p) =>
      (selectedCategory === "All" || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="container px-4 py-10 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Medicine Catalog
            </h1>
            <p className="text-muted-foreground">
              Showing {filteredProducts.length} results for &quot;
              {selectedCategory}&quot;
            </p>
          </div>

          {/* Search Input */}
          <Input
            type="text"
            placeholder="Search products..."
            className="mt-2 md:mt-0 md:w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Select defaultValue="newest">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Average Rating</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="hidden border rounded-lg p-1 md:flex">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filter */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="lg:hidden">
                <Filter className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
              </SheetHeader>
              <div className="py-6">
                <FilterSidebar
                  selectedCategory={selectedCategory}
                  setSelectedCategory={setSelectedCategory}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block lg:col-span-1 border rounded-2xl p-6 h-fit sticky top-24">
          <FilterSidebar
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </aside>

        {/* Products */}
        <div className="lg:col-span-3">
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/catalog/${product.id}`}>
                <Card
                  className={`group overflow-hidden cursor-pointer transition-all hover:shadow-lg ${
                    viewMode === "list" ? "flex flex-row" : "flex flex-col"
                  }`}
                >
                  <div
                    className={`relative bg-muted overflow-hidden ${
                      viewMode === "list" ? "w-48 shrink-0" : "aspect-square"
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-full transition-transform group-hover:scale-105"
                    />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.prescriptionRequired && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 h-5"
                        >
                          Rx Required
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge
                          variant="destructive"
                          className="text-[10px] px-1.5 h-5"
                        >
                          Out of Stock
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col p-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-1">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-primary text-primary"
                                  : "text-muted"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>
                      <CardTitle className="text-lg font-bold mb-1 group-hover:text-primary transition-colors">
                        {product.name}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {product.brand}
                      </CardDescription>
                      {viewMode === "list" && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          High-quality {product.category.toLowerCase()} medicine
                          for effective results. Carefully tested and certified
                          by healthcare professionals.
                        </p>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-auto">
                      <span className="text-xl font-bold">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button
                        size="sm"
                        className="rounded-full"
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to Cart" : "Notify Me"}
                      </Button>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
