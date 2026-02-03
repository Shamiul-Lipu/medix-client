"use client";

import { useEffect, useState } from "react";
import { Medicine } from "@/constants/medicine";
import CatalogHeader from "@/components/catalog/CatalogHeader";
import { Skeleton } from "@/components/ui/skeleton";
import FilterSidebar, { Category } from "@/components/catalog/FilterSidebar";
import ProductGrid from "@/components/catalog/ProductGrid";
import ProductList from "@/components/catalog/ProductList";
import Pagination from "@/components/catalog/Pagination";
import MobileFilters from "@/components/catalog/MobileFilters";
import { getMedicines } from "@/actions/medicine.action";
import { getCategories } from "@/actions/category.action";

export type SortOption = "newest" | "price-low" | "price-high" | "rating";

export default function CatalogPage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [allCategories, setAllCategories] = useState<Category[]>([]);

  const limit = 12;

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    const fetchMedicines = async () => {
      setLoading(true);
      try {
        const res = await getMedicines({
          search: debouncedSearch || undefined,
          page,
          limit,
          sortBy: sort === "newest" ? "createdAt" : "price",
          sortOrder:
            sort === "newest" ? "desc" : sort === "price-high" ? "desc" : "asc",
        });

        if (res.data) {
          const allMedicines = res.data.data as unknown as Medicine[];

          const catMap: Record<string, string> = {};
          allMedicines.forEach((m) => {
            if (m.category?.id && m.category?.name) {
              catMap[m.category.id] = m.category.name;
            }
          });

          let filtered = allMedicines;

          if (selectedCategories.length > 0) {
            filtered = filtered.filter((m) =>
              selectedCategories.includes(m.category?.id ?? ""),
            );
          }

          if (inStockOnly) {
            filtered = filtered.filter((m) => m.stock > 0);
          }

          setMedicines(filtered);
          setTotalPages(res.data.pagination.totalPages);
        }
      } catch (err) {
        console.error("Failed to fetch medicines", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
  }, [debouncedSearch, selectedCategories, inStockOnly, sort, page]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategories, inStockOnly, sort]);

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
    <div className="min-h-screen bg-linear-to-bfrom-background to-muted/20">
      <div className="container px-4 py-8 md:py-12">
        {/* Header */}
        <CatalogHeader
          search={search}
          setSearch={setSearch}
          sort={sort}
          setSort={setSort}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalResults={medicines.length}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8 mt-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <FilterSidebar
                categories={allCategories}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
              />
            </div>
          </aside>

          {/* Products */}
          <div className="lg:col-span-3">
            {loading ? (
              <ProductGridSkeleton viewMode={viewMode} />
            ) : medicines.length === 0 ? (
              <EmptyState
                search={debouncedSearch}
                onClearFilters={() => {
                  setSearch("");
                  setSelectedCategories([]);
                  setInStockOnly(false);
                }}
              />
            ) : (
              <>
                {viewMode === "grid" ? (
                  <ProductGrid medicines={medicines} />
                ) : (
                  <ProductList medicines={medicines} />
                )}

                {totalPages > 1 && (
                  <Pagination
                    currentPage={page}
                    totalPages={totalPages}
                    onPageChange={setPage}
                  />
                )}
              </>
            )}
          </div>
        </div>

        {/* Mobile Filters */}
        <MobileFilters
          categories={allCategories}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          inStockOnly={inStockOnly}
          setInStockOnly={setInStockOnly}
        />
      </div>
    </div>
  );
}

function ProductGridSkeleton({ viewMode }: { viewMode: "grid" | "list" }) {
  return (
    <div
      className={
        viewMode === "grid"
          ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
          : "flex flex-col gap-4"
      }
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={`border rounded-xl overflow-hidden ${
            viewMode === "list" ? "flex flex-row" : ""
          }`}
        >
          <Skeleton
            className={
              viewMode === "list"
                ? "w-48 h-48 shrink-0"
                : "aspect-square w-full"
            }
          />
          <div className="p-4 flex-1 space-y-3">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-10 w-full mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

function EmptyState({
  search,
  onClearFilters,
}: {
  search: string;
  onClearFilters: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-24 h-24 mb-6 rounded-full bg-muted flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 0 0114 0z"
          />
        </svg>
      </div>
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-muted-foreground mb-6 max-w-md">
        {search
          ? `We couldn't find any products matching "${search}". Try adjusting your search or filters.`
          : "No products match your current filters. Try adjusting your selection."}
      </p>
      <button
        onClick={onClearFilters}
        className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
      >
        Clear all filters
      </button>
    </div>
  );
}
