import { LayoutGrid, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/app/(commonLayout)/shop/page";

interface CatalogHeaderProps {
  search: string;
  setSearch: (val: string) => void;
  sort: SortOption;
  setSort: (val: SortOption) => void;
  viewMode: "grid" | "list";
  setViewMode: (val: "grid" | "list") => void;
  totalResults: number;
}

export default function CatalogHeader({
  search,
  setSearch,
  sort,
  setSort,
  viewMode,
  setViewMode,
  totalResults,
}: CatalogHeaderProps) {
  return (
    <div className="space-y-6">
      {/* Title and Description */}
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Medicine <span className="text-primary">Catalog</span>
        </h1>
        <p className="text-muted-foreground">
          Browse our complete collection of medicines and healthcare products
        </p>
      </div>

      {/* Search and Controls */}
      <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search by name, manufacturer, or category..."
            className="pl-10 h-11"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Results count */}
          <span className="text-sm text-muted-foreground whitespace-nowrap hidden sm:block">
            {totalResults} {totalResults === 1 ? "product" : "products"}
          </span>

          {/* Sort */}
          <Select value={sort} onValueChange={(v) => setSort(v as SortOption)}>
            <SelectTrigger className="w-[180px] h-11">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest Arrivals</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Top Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="hidden md:flex border rounded-lg p-1 bg-muted/50">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-9 w-9"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
