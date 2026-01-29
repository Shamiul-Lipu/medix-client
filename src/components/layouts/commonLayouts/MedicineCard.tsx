import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Medicine } from "@/constants/medicine";

interface MedicineCardProps {
  medicine: Medicine;
}

const MedicineCard: React.FC<MedicineCardProps> = ({ medicine }) => {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-border/40 bg-card shadow hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted/10">
        <img
          src={medicine.imageUrl || "/placeholder.png"}
          alt={medicine.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
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
            ৳{medicine.price}
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
            disabled={medicine.stock === 0}
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </Button>

          <Link href={`/medicines/${medicine.id}`} className="flex-1">
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
