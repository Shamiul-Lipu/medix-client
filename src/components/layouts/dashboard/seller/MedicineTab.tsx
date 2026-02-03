"use client";

import { useState, useEffect } from "react";
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

import {
  createMedicine,
  deleteMedicine,
  getMedicines,
  updateMedicine,
} from "@/actions/medicine.action";
import { Medicine } from "@/service/medicine.service";
import { Skeleton } from "@/components/ui/skeleton";
import { getCategories } from "@/actions/category.action";
import MedicineDialog, { MedicineFormValues } from "./MedicineDialog";

type SortOption = "newest" | "stock-high" | "stock-low" | "price-high";

export default function MedicinesTab() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const [sort, setSort] = useState<SortOption>("newest");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [allCategories, setAllCategories] = useState<
    { id: string; name: string }[]
  >([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMedicine, setEditingMedicine] = useState<Medicine | null>(null);

  const itemsPerPage = 5;

  const fetchMedicines = async () => {
    try {
      setLoading(true);

      let sortBy: "createdAt" | "price" | "stock";
      let sortOrder: "asc" | "desc";

      switch (sort) {
        case "stock-high":
          sortBy = "stock";
          sortOrder = "desc";
          break;

        case "stock-low":
          sortBy = "stock";
          sortOrder = "asc";
          break;

        case "price-high":
          sortBy = "price";
          sortOrder = "desc";
          break;

        default:
          sortBy = "createdAt";
          sortOrder = "desc";
      }

      const res = await getMedicines({
        page: currentPage,
        limit: itemsPerPage,
        search: searchTerm || undefined,
        categoryId: categoryFilter === "all" ? undefined : categoryFilter,

        // sorting (IMPORTANT: only these)
        sortBy,
        sortOrder,
      });

      if (res.error) throw new Error(res.error.message);

      setMedicines(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
    } catch (err) {
      toast.error("Failed to fetch medicines");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, [searchTerm, categoryFilter, sort, currentPage]);

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

  const handleAddMedicine = async (values: MedicineFormValues) => {
    try {
      setLoading(true);

      const payload = {
        id: editingMedicine?.id,
        categoryId: values.categoryId,
        name: values.name,
        manufacturer: values.manufacturer,
        price: String(values.price),
        stock: values.stock,
        dosageForm: values.dosageForm || undefined,
        strength: values.strength || undefined,
        isActive: values.isActive,
      };

      // CREATE or UPDATE depending on editingMedicine
      const res = editingMedicine
        ? await updateMedicine(editingMedicine.id, payload)
        : await createMedicine(payload);

      if (res.error) {
        toast.error(res.error.message);
        return;
      }

      toast.success(editingMedicine ? "Medicine updated" : "Medicine added");
      setDialogOpen(false);
      setEditingMedicine(null);
      await fetchMedicines();
    } catch (err: any) {
      const message = err instanceof Error ? err.message : "Action failed";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMedicine = async (id: string) => {
    toast.warning("Delete medicine?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await deleteMedicine(id);
            if (res.error) throw new Error(res.error.message);
            toast.success("Medicine deleted");
            fetchMedicines();
          } catch (err: any) {
            toast.error(err.message || "Failed to delete");
          }
        },
      },
    });
  };

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const res = await getCategories(1, 1000);
        if (res.error) throw new Error(res.error.message);
        setAllCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };

    fetchAllCategories();
  }, []);

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
          {/* Category filter */}
          <Select
            value={categoryFilter}
            onValueChange={(v) => {
              setCategoryFilter(v);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="sm:w-48">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {allCategories.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sorting */}
          <Select
            value={sort}
            onValueChange={(v) => {
              setSort(v as SortOption);
              setCurrentPage(1);
            }}
          >
            <SelectTrigger className="sm:w-56">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="stock-high">Stock: High → Low</SelectItem>
              <SelectItem value="stock-low">Stock: Low → High</SelectItem>
              <SelectItem value="price-high">Price: High → Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-muted/50">
              <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Manufacturer
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">Price</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Stock</th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Strength
              </th>
              <th className="px-6 py-3 text-left text-sm font-medium">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              // Skeleton rows while loading
              [...Array(itemsPerPage)].map((_, i) => (
                <tr key={i} className="border-b">
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-32 rounded-md" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-24 rounded-md" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-16 rounded-md" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </td>
                </tr>
              ))
            ) : medicines.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-6 text-center">
                  No medicines found
                </td>
              </tr>
            ) : (
              medicines.map((m) => (
                <tr key={m.id} className="border-b hover:bg-muted/50">
                  <td className="px-6 py-4 font-medium">{m.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {m.manufacturer}
                  </td>
                  <td className="px-6 py-4 font-medium">${m.price}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getStockVariant(m.stock)}>
                      {m.stock} · {getStockLabel(m.stock)}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {m.strength}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          setEditingMedicine(m);
                          setDialogOpen(true);
                        }}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-destructive"
                        onClick={() => handleDeleteMedicine(m.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </p>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
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
      />
    </div>
  );
}
