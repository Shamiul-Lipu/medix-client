"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { Button } from "@/components/ui/button";
import CategoryDialog from "./CategoryDialog";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "@/actions/category.action";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
}

interface CategoryPayload {
  name: string;
  description?: string;
  isActive: boolean;
}

export default function CategoriesTab() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  // Pagination & Search
  const [page, setPage] = useState(1);
  const [limit] = useState(5); // smaller for demo
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);
  const [pagination, setPagination] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearchTerm(searchTerm), 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const fetchCategories = useCallback(
    async (targetPage: number, searchQuery: string) => {
      setLoading(true);
      try {
        const res = await getCategories(targetPage, limit, searchQuery);
        if (res.error) {
          toast.error(res.error.message);
        } else {
          setCategories(res.data);
          setPagination(res.pagination || null);
          setPage(targetPage);
        }
      } finally {
        setLoading(false);
      }
    },
    [limit],
  );

  useEffect(() => {
    fetchCategories(1, debouncedSearchTerm);
  }, [debouncedSearchTerm, fetchCategories]);

  const filteredCategories = useMemo(() => {
    return categories
      .map((c) => ({ ...c, description: c.description ?? "" }))
      .filter((c) => c.id !== "All");
  }, [categories]);

  const handleSubmit = async (payload: CategoryPayload) => {
    setLoading(true);
    try {
      let res;
      if (editingCategory) {
        res = await updateCategory(editingCategory.id, payload);
      } else {
        res = await createCategory(payload);
      }

      if (res.error) {
        setDialogOpen(false);
        toast.error(res.error.message);
        return;
      }

      toast.success(editingCategory ? "Category updated" : "Category created");
      setDialogOpen(false);
      setEditingCategory(null);
      await fetchCategories(page, debouncedSearchTerm);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id: string) => {
    toast.warning("Delete category?", {
      description: "This action cannot be undone.",
      action: {
        label: "Delete",
        onClick: async () => {
          try {
            const res = await deleteCategory(id);
            if (res.error || !res.data) {
              toast.error(res.error?.message || "Failed to delete category");
              return;
            }
            const { categoryName, deletedMedicines, reassignedMedicines } =
              res.data;
            toast.success(`Category "${categoryName}" deleted.`, {
              description: `${deletedMedicines} of your medicines deleted. ${reassignedMedicines} medicine(s) from other sellers reassigned to Admin.`,
            });
            await fetchCategories(page, debouncedSearchTerm);
          } catch (err: unknown) {
            const message =
              err instanceof Error ? err.message : "Failed to delete category";
            toast.error(message);
          }
        },
      },
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Categories</h2>
          <p className="text-sm text-muted-foreground">
            Manage and organize your product categories.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          />
          <Button
            onClick={() => {
              setEditingCategory(null);
              setDialogOpen(true);
            }}
          >
            Add category
          </Button>
        </div>
      </div>

      {loading && (
        <div className="space-y-2">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="flex flex-col gap-2 rounded-lg border p-4">
              <Skeleton className="h-4 w-1/3" /> {/* Category Name */}
              <Skeleton className="h-3 w-2/3" /> {/* Description */}
              <div className="flex gap-2 mt-2">
                <Skeleton className="h-6 w-16" /> {/* Edit button */}
                <Skeleton className="h-6 w-16" /> {/* Delete button */}
              </div>
            </div>
          ))}
        </div>
      )}

      {!loading && filteredCategories.length === 0 && (
        <div className="rounded-lg border border-dashed p-8 text-center">
          <p className="font-medium">No categories yet</p>
          <p className="text-sm text-muted-foreground mt-1">
            Create your first category to get started.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {filteredCategories.map((cat) => (
          <div
            key={cat.id}
            className="flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <p className="font-medium">{cat.name}</p>
                <Badge variant={cat.isActive ? "default" : "secondary"}>
                  {cat.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>
              {cat.description && (
                <p className="text-sm text-muted-foreground">
                  {cat.description}
                </p>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setEditingCategory(cat);
                  setDialogOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDelete(cat.id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center mt-4 gap-2 flex-wrap">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => fetchCategories(page - 1, debouncedSearchTerm)}
          >
            Prev
          </Button>

          {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
            (p) => (
              <Button
                key={p}
                size="sm"
                variant={p === page ? "default" : "outline"}
                onClick={() => fetchCategories(p, debouncedSearchTerm)}
              >
                {p}
              </Button>
            ),
          )}

          <Button
            size="sm"
            variant="outline"
            disabled={page === pagination.totalPages}
            onClick={() => fetchCategories(page + 1, debouncedSearchTerm)}
          >
            Next
          </Button>
        </div>
      )}

      <CategoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        category={editingCategory}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
