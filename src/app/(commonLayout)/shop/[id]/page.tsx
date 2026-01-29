"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LayoutGrid, List, Star, Filter } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Card,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/constants/medicine";

// -----------------------------
// FilterSidebar
// -----------------------------
interface FilterSidebarProps {
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  prescriptionFilter: "all" | "required" | "not-required";
  setPrescriptionFilter: (val: "all" | "required" | "not-required") => void;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
}

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
  prescriptionFilter,
  setPrescriptionFilter,
  inStockOnly,
  setInStockOnly,
}) => (
  <div className="flex flex-col gap-6">
    {/* Category */}
    <div>
      <h3 className="text-sm font-bold uppercase mb-3">Categories</h3>
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
      <h3 className="text-sm font-bold uppercase mb-3">Prescription</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id="rx-required"
            checked={prescriptionFilter === "required"}
            onCheckedChange={() => setPrescriptionFilter("required")}
          />
          <Label htmlFor="rx-required" className="text-sm">
            Required
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="rx-not-required"
            checked={prescriptionFilter === "not-required"}
            onCheckedChange={() => setPrescriptionFilter("not-required")}
          />
          <Label htmlFor="rx-not-required" className="text-sm">
            Not Required
          </Label>
        </div>
      </div>
    </div>

    <Separator />

    {/* Stock */}
    <div>
      <h3 className="text-sm font-bold uppercase mb-3">Availability</h3>
      <div className="flex items-center gap-2">
        <Checkbox
          id="in-stock"
          checked={inStockOnly}
          onCheckedChange={() => setInStockOnly(!inStockOnly)}
        />
        <Label htmlFor="in-stock" className="text-sm">
          In Stock Only
        </Label>
      </div>
    </div>
  </div>
);

// -----------------------------
// Main CatalogPage
// -----------------------------
export default function CatalogPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [prescriptionFilter, setPrescriptionFilter] = useState<
    "all" | "required" | "not-required"
  >("all");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<
    "newest" | "price-low" | "price-high" | "rating"
  >("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const [page, setPage] = useState(1);
  const limit = 12; // products per page
  const [totalPages, setTotalPages] = useState(1);

  // Fetch medicines
  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const res = await medicineService.getMedicines({
          search: search || undefined,
          category: category !== "All" ? category : undefined,
          page,
          limit,
          sortBy: sort === "newest" ? "createdAt" : "price",
          sortOrder: sort === "price-high" ? "desc" : "asc",
        });

        if (res.data?.success) {
          let filtered = res.data.data.data as Medicine[];

          // Apply client-side filters

          if (inStockOnly) filtered = filtered.filter((m) => m.stock > 0);

          setMedicines(filtered);
          setTotalPages(res.data.data.pagination.totalPages);
        }
      } catch (err) {
        console.error("Failed to fetch medicines", err);
      }
    };

    fetchMedicines();
  }, [search, category, prescriptionFilter, inStockOnly, sort, page]);

  return (
    <div className="container px-4 py-10 md:py-16">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Medicine Catalog
          </h1>
          <Input
            type="text"
            placeholder="Search products..."
            className="mt-2 md:mt-0 md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={sort} onValueChange={(v) => setSort(v as any)}>
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

          <div className="hidden border rounded-lg p-1 md:flex">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile Filters */}
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
                  selectedCategory={category}
                  setSelectedCategory={setCategory}
                  prescriptionFilter={prescriptionFilter}
                  setPrescriptionFilter={setPrescriptionFilter}
                  inStockOnly={inStockOnly}
                  setInStockOnly={setInStockOnly}
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
            selectedCategory={category}
            setSelectedCategory={setCategory}
            prescriptionFilter={prescriptionFilter}
            setPrescriptionFilter={setPrescriptionFilter}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
          />
        </aside>

        {/* Products */}
        <div className="lg:col-span-3">
          {medicines.length === 0 ? (
            <p className="text-center text-muted-foreground">
              No products found
            </p>
          ) : (
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "flex flex-col gap-4"
              }
            >
              {medicines.map((m) => (
                <Link key={m.id} href={`/catalog/${m.id}`}>
                  <Card
                    className={`group overflow-hidden cursor-pointer transition-all hover:shadow-lg ${viewMode === "list" ? "flex flex-row" : "flex flex-col"}`}
                  >
                    <div
                      className={`relative bg-muted overflow-hidden ${viewMode === "list" ? "w-48 shrink-0" : "aspect-square"}`}
                    >
                      <img
                        src={m.imageUrl || "/placeholder.png"}
                        alt={m.name}
                        className="object-cover w-full h-full transition-transform group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 flex flex-col p-4">
                      <CardTitle className="text-lg font-bold mb-1">
                        {m.name}
                      </CardTitle>
                      <CardDescription className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                        {m.manufacturer}
                      </CardDescription>
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-xl font-bold">৳{m.price}</span>
                        <Button
                          size="sm"
                          className="rounded-full"
                          disabled={m.stock === 0}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-6">
              <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Prev
              </Button>
              <span>
                {page} / {totalPages}
              </span>
              <Button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
