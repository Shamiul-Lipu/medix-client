import { ShoppingCart, Package, Info } from "lucide-react";
import { Medicine } from "@/constants/medicine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

interface ProductCardProps {
  medicine: Medicine;
  viewMode: "grid" | "list";
}

export default function ProductCard({ medicine, viewMode }: ProductCardProps) {
  const isOutOfStock = medicine.stock === 0;
  const isLowStock = medicine.stock > 0 && medicine.stock <= 10;
  const price = parseFloat(medicine.price);

  return (
    <Card
      className={`group overflow-hidden transition-all hover:shadow-xl border-2 hover:border-primary/20 cursor-pointer ${
        viewMode === "list" ? "flex flex-row" : "flex flex-col"
      } ${isOutOfStock ? "opacity-60" : ""}`}
    >
      {/* Image */}
      <div
        className={`relative bg-gradient-to-br from-muted to-muted/50 overflow-hidden ${
          viewMode === "list" ? "w-48 sm:w-56 shrink-0" : "aspect-square"
        }`}
      >
        <img
          src={medicine.imageUrl || "/placeholder.png"}
          alt={medicine.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = "/placeholder.png";
          }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isOutOfStock && (
            <Badge variant="destructive" className="shadow-lg">
              Out of Stock
            </Badge>
          )}
          {isLowStock && !isOutOfStock && (
            <Badge
              variant="secondary"
              className="shadow-lg bg-orange-500 text-white"
            >
              Only {medicine.stock} left
            </Badge>
          )}
        </div>
      </div>

      {/* Content */}
      <CardContent
        className={`flex flex-col p-4 ${viewMode === "list" ? "flex-1 justify-between" : ""}`}
      >
        <div className="space-y-2">
          {/* Category */}
          <Badge variant="secondary" className="text-xs font-normal">
            {medicine.category?.name || "General"}
          </Badge>

          {/* Title */}
          <h3 className="font-bold text-base md:text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {medicine.name}
          </h3>

          {/* Manufacturer */}
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {medicine.manufacturer}
          </p>

          {/* Description (List view only) */}
          {viewMode === "list" && medicine.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">
              {medicine.description}
            </p>
          )}

          {/* Dosage info */}
          {medicine.dosageForm && medicine.strength && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="capitalize">{medicine.dosageForm}</span>
              <span>•</span>
              <span>{medicine.strength}</span>
            </div>
          )}
        </div>

        {/* Price and Actions */}
        <div className={`flex items-center justify-between gap-2 mt-4`}>
          <span className="text-xl md:text-2xl font-bold">
            ৳{price.toFixed(2)}
          </span>
        </div>

        {/* Stock Indicator */}
        {!isOutOfStock && (
          <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
            <Package className="h-3 w-3" />
            <span>
              {medicine.stock > 50
                ? "In Stock"
                : `${medicine.stock} units available`}
            </span>
          </div>
        )}

        {/*  */}
        <div className="flex gap-2 mt-2">
          <Button
            className="flex-1 gap-2"
            size="sm"
            disabled={isOutOfStock}
            onClick={(e) => {
              e.preventDefault();
              console.log("Add to cart:", medicine.id);
            }}
          >
            <ShoppingCart className="h-4 w-4" />

            <span className="hidden sm:inline">
              {isOutOfStock ? "Unavailable" : "Add to Cart"}
            </span>
          </Button>

          <Link href={`/medicines/${medicine.id}`} className="flex-1">
            <Button
              className="w-full gap-2 rounded-full shrink-0 gap-2"
              size="sm"
              variant="outline"
            >
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
