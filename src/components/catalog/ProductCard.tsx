"use client";

import { ShoppingCart, Package, Info } from "lucide-react";
import { Medicine } from "@/constants/medicine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";
import { useCart } from "@/context/cartContext";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface ProductCardProps {
  medicine: Medicine;
  viewMode: "grid" | "list";
}

export default function ProductCard({ medicine, viewMode }: ProductCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  const isOutOfStock = medicine.stock === 0;
  const isLowStock = medicine.stock > 0 && medicine.stock <= 10;
  const price = parseFloat(medicine.price);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    setLoading(true);
    const toastId = toast.loading("Adding to cart...");
    try {
      await addToCart({
        medicineId: medicine.id,
        quantity: 1,
        name: medicine.name,
        manufacturer: medicine.manufacturer,
        price: price,
        imageUrl: medicine.imageUrl,
        maxQuantity: medicine.stock,
      });
      toast.success("Added to cart!", { id: toastId });
    } catch (err) {
      console.error(err);
      toast.error("Failed to add to cart", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = () => {
    router.push(`/shop/${medicine.id}`);
  };

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
        <Image
          src={medicine.imageUrl}
          alt={medicine.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          width={1000}
          height={1000}
          layout="responsive"
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
          <Badge variant="secondary" className="text-xs font-normal">
            {medicine.category?.name || "General"}
          </Badge>

          <h3 className="font-bold text-base md:text-lg line-clamp-2 group-hover:text-primary transition-colors">
            {medicine.name}
          </h3>

          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {medicine.manufacturer}
          </p>

          {viewMode === "list" && medicine.description && (
            <p className="text-sm text-muted-foreground line-clamp-2 hidden sm:block">
              {medicine.description}
            </p>
          )}

          {medicine.dosageForm && medicine.strength && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="capitalize">{medicine.dosageForm}</span>
              <span>•</span>
              <span>{medicine.strength}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center justify-between gap-2 mt-4">
          <span className="text-xl md:text-2xl font-bold">
            ৳ {price.toFixed(2)}
          </span>
        </div>

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

        {/* Actions */}
        <div className="flex gap-2 mt-2">
          <Button
            className="flex-1 gap-2"
            size="sm"
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </Button>

          <Button
            className="flex-1 gap-2"
            size="sm"
            variant="outline"
            onClick={handleViewDetails}
          >
            <Info className="h-4 w-4" />
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
