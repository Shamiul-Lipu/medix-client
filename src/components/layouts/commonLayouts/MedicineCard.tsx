"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Medicine } from "@/constants/medicine";
import { useState } from "react";

import { getSession } from "@/actions/user.action";
import { toast } from "sonner";
import { UserRoles } from "@/constants/userRoles";
import { useCart } from "@/context/cartContext";
import Image from "next/image";

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  const { addToCart } = useCart();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = async () => {
    const toastId = toast.loading("Checking ...");
    setLoading(true);

    try {
      const { data } = await getSession();
      const { user } = data;

      if (!user) {
        toast.dismiss(toastId);
        toast.warning("You need to log in to add items to your cart");
        return;
      }

      if (user.role !== UserRoles.CUSTOMER) {
        toast.dismiss(toastId);
        toast.warning("Only customers can add items to the cart");
        return;
      }

      // Add item to cart
      addToCart({
        medicineId: medicine.id,
        name: medicine.name,
        manufacturer: medicine.manufacturer,
        price: Number(medicine.price),
        quantity: 1,
        imageUrl: medicine.imageUrl || "/placeholder.png",
        maxQuantity: Number(medicine.stock),
      });

      toast.dismiss(toastId);
      toast.success(`${medicine.name} was added to your cart.`);
    } catch (err) {
      console.error(err);
      toast.dismiss(toastId);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="group overflow-hidden rounded-2xl border border-border/40 bg-card shadow hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted/10">
        <Image
          src={medicine.imageUrl}
          alt={medicine.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          width={1000}
          height={1000}
          layout="responsive"
        />
        {medicine.stock === 0 && (
          <span className="absolute left-2 top-2 bg-destructive/90 text-white px-2 py-1 text-[10px] font-semibold rounded">
            Out of Stock
          </span>
        )}
        <Button
          variant="secondary"
          size="icon"
          className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-0 shadow-md backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
        >
          <Heart className="h-4 w-4" />
        </Button>
      </div>

      {/* Card Content */}
      <CardContent className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-muted-foreground">
          <span>{medicine.category.name}</span>
          <span className="text-primary font-medium">
            {medicine.manufacturer}
          </span>
        </div>

        <h3 className="font-semibold line-clamp-2 text-foreground">
          {medicine.name}
        </h3>

        {medicine.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {medicine.description}
          </p>
        )}

        <div className="flex items-baseline gap-2 mt-2">
          <span className="text-lg font-bold text-foreground">
            ৳ {medicine.price}
          </span>
          {medicine.stock === 0 && (
            <span className="text-sm text-destructive font-medium">
              Out of Stock
            </span>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-2">
          <Button
            className="flex-1 gap-2"
            size="sm"
            disabled={medicine.stock === 0 || loading}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            {loading ? "Adding..." : "Add to Cart"}
          </Button>

          <Link href={`/shop/${medicine.id}`} className="flex-1">
            <Button className="w-full gap-2" size="sm" variant="outline">
              Details
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MedicineCard;
