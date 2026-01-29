import Link from "next/link";
import { Medicine } from "@/constants/medicine";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  medicines: Medicine[];
}

export default function ProductGrid({ medicines }: ProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {medicines.map((medicine) => (
        <Link key={medicine.id} href={`/catalog/${medicine.id}`}>
          <ProductCard medicine={medicine} viewMode="grid" />
        </Link>
      ))}
    </div>
  );
}
