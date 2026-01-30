import Link from "next/link";
import { Medicine } from "@/constants/medicine";
import ProductCard from "./ProductCard";

interface ProductListProps {
  medicines: Medicine[];
}

export default function ProductList({ medicines }: ProductListProps) {
  return (
    <div className="flex flex-col gap-4">
      {medicines.map((medicine) => (
        <Link key={medicine.id} href={`/shop/${medicine.id}`}>
          <ProductCard medicine={medicine} viewMode="list" />
        </Link>
      ))}
    </div>
  );
}
