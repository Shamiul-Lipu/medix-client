"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

import MedicineDialog from "./MedicineDialog";

interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  price: number;
  stock: number;
  dosageForm: string;
  strength: string;
  isActive: boolean;
}

/* ------------------------------------------------------------------ */
/* Mock Data */
/* ------------------------------------------------------------------ */

const MOCK_MEDICINES: Medicine[] = [
  {
    id: "1",
    name: "Aspirin",
    manufacturer: "Bayer",
    category: "Pain Relief",
    price: 5.99,
    stock: 150,
    dosageForm: "Tablet",
    strength: "500mg",
    isActive: true,
  },
  {
    id: "2",
    name: "Ibuprofen",
    manufacturer: "Advil",
    category: "Pain Relief",
    price: 7.99,
    stock: 45,
    dosageForm: "Tablet",
    strength: "400mg",
    isActive: true,
  },
  {
    id: "3",
    name: "Amoxicillin",
    manufacturer: "GSK",
    category: "Antibiotics",
    price: 12.99,
    stock: 0,
    dosageForm: "Capsule",
    strength: "500mg",
    isActive: true,
  },
  {
    id: "4",
    name: "Vitamin C",
    manufacturer: "Nature's Way",
    category: "Vitamins",
    price: 9.99,
    stock: 200,
    dosageForm: "Tablet",
    strength: "1000mg",
    isActive: true,
  },
  {
    id: "5",
    name: "Metformin",
    manufacturer: "Merck",
    category: "Diabetes",
    price: 15.99,
    stock: 75,
    dosageForm: "Tablet",
    strength: "850mg",
    isActive: false,
  },
];

/* ------------------------------------------------------------------ */
/* Component */
/* ------------------------------------------------------------------ */

export default function MedicinesTab() {
  const [medicines, setMedicines] = useState<Medicine[]>(MOCK_MEDICINES);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  const itemsPerPage = 5;

  /* ------------------------------------------------------------------ */
  /* Derived Data */
  /* ------------------------------------------------------------------ */

  const categories = Array.from(new Set(medicines.map((m) => m.category)));

  const filteredMedicines = useMemo(() => {
    return medicines.filter((medicine) => {
      const matchesSearch =
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        medicine.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || medicine.category === categoryFilter;

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "low" && medicine.stock > 0 && medicine.stock <= 50) ||
        (stockFilter === "out" && medicine.stock === 0) ||
        (stockFilter === "high" && medicine.stock > 50);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [medicines, searchTerm, categoryFilter, stockFilter]);

  const totalPages = Math.ceil(filteredMedicines.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMedicines = filteredMedicines.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  /* ------------------------------------------------------------------ */
  /* Handlers */
  /* ------------------------------------------------------------------ */

  const handleAddMedicine = (newMedicine: Medicine) => {
    if (editingMedicine) {
      setMedicines(
        medicines.map((m) =>
          m.id === editingMedicine.id ? { ...newMedicine, id: m.id } : m,
        ),
      );
      toast.success("Medicine updated");
      setEditingMedicine(null);
    } else {
      setMedicines([
        ...medicines,
        { ...newMedicine, id: Date.now().toString() },
      ]);
      toast.success("Medicine added");
    }

    setDialogOpen(false);
  };

  const handleEditMedicine = (medicine: Medicine) => {
    setEditingMedicine(medicine);
    setDialogOpen(true);
  };

  const handleDeleteMedicine = (id: string) => {
    toast.warning("Delete medicine?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: () => {
          setMedicines(medicines.filter((m) => m.id !== id));
          toast.success("Medicine deleted");
        },
      },
    });
  };

  const getStockVariant = (stock: number) => {
    if (stock === 0) return "destructive";
    if (stock <= 50) return "secondary";
    return "default";
  };

  const getStockLabel = (stock: number) => {
    if (stock === 0) return "Out of stock";
    if (stock <= 50) return "Low stock";
    return "In stock";
  };

  /* ------------------------------------------------------------------ */
  /* UI */
  /* ------------------------------------------------------------------ */

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name or manufacturer..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="pl-9"
            />
          </div>

          <Button
            onClick={() => {
              setEditingMedicine(null);
              setDialogOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add medicine
          </Button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={stockFilter} onValueChange={setStockFilter}>
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="All stock levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All stock levels</SelectItem>
              <SelectItem value="high">High stock</SelectItem>
              <SelectItem value="low">Low stock</SelectItem>
              <SelectItem value="out">Out of stock</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Empty state */}
      {filteredMedicines.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="font-medium">No medicines found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}

      {/* Table */}
      {filteredMedicines.length > 0 && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Manufacturer
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Strength
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {paginatedMedicines.map((medicine) => (
                <tr
                  key={medicine.id}
                  className="border-b transition hover:bg-muted/50"
                >
                  <td className="px-6 py-4 font-medium">{medicine.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {medicine.manufacturer}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {medicine.category}
                  </td>
                  <td className="px-6 py-4 font-medium">
                    ${medicine.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant={getStockVariant(medicine.stock)}>
                      {medicine.stock} · {getStockLabel(medicine.stock)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {medicine.strength}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleEditMedicine(medicine)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDeleteMedicine(medicine.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Showing {startIndex + 1}–
            {Math.min(startIndex + itemsPerPage, filteredMedicines.length)} of{" "}
            {filteredMedicines.length}
          </p>

          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                size="sm"
                variant={page === currentPage ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Dialog */}
      <MedicineDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddMedicine}
        medicine={editingMedicine}
        categories={categories}
      />
    </div>
  );
}
