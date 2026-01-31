"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { Medicine } from "@/constants/medicine";
import { useCart } from "@/context/cartContext";

interface ProductActionButtonsProps {
  medicine: Medicine;
}

export default function ProductActionButtons({
  medicine,
}: ProductActionButtonsProps) {
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    if (medicine.stock === 0) return;

    const toastId = toast.loading(`Adding ${medicine.name}...`);

    try {
      await addToCart({
        medicineId: medicine.id,
        name: medicine.name,
        manufacturer: medicine.manufacturer,
        price: Number(medicine.price),
        imageUrl: medicine.imageUrl || "/placeholder.png",
        quantity: 1,
        maxQuantity: medicine.stock,
      });
      toast.success(`${medicine.name} added to cart!`, { id: toastId });
    } catch (err: Error | unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to add item to cart";
      toast.error(message, { id: toastId });
    }
  };

  const handleBuyNow = async () => {
    if (medicine.stock === 0) return;

    try {
      await addToCart({
        medicineId: medicine.id,
        name: medicine.name,
        manufacturer: medicine.manufacturer,
        price: Number(medicine.price),
        imageUrl: medicine.imageUrl || "/placeholder.png",
        quantity: 1,
        maxQuantity: medicine.stock,
      });
    } catch (err: Error | unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to proceed to add";
      toast.error(message);
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        size="lg"
        disabled={medicine.stock === 0}
        onClick={handleAddToCart}
        className="flex-1"
      >
        <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
      </Button>

      <Button
        size="lg"
        variant="outline"
        disabled={medicine.stock === 0}
        onClick={handleBuyNow}
        className="flex-1"
      >
        Buy Now
      </Button>
    </div>
  );
}
