import { Filter, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import FilterSidebar, { Category } from "./FilterSidebar";

interface MobileFiltersProps {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  inStockOnly: boolean;
  setInStockOnly: (val: boolean) => void;
}

export default function MobileFilters({
  categories,
  selectedCategories,
  setSelectedCategories,
  inStockOnly,
  setInStockOnly,
}: MobileFiltersProps) {
  const activeFiltersCount = selectedCategories.length + (inStockOnly ? 1 : 0);

  return (
    <div className="fixed bottom-6 right-6 z-50 lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="lg"
            className="rounded-full shadow-2xl h-14 w-14 relative"
          >
            <Filter className="h-5 w-5" />
            {activeFiltersCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[85vw] sm:w-100 overflow-y-auto"
        >
          <SheetHeader className="mb-6">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-xl">Filters</SheetTitle>
              <SheetClose asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <X className="h-5 w-5" />
                </Button>
              </SheetClose>
            </div>
          </SheetHeader>

          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            inStockOnly={inStockOnly}
            setInStockOnly={setInStockOnly}
          />

          {/* Apply Button */}
          <div className="sticky bottom-0 left-0 right-0 pt-6 pb-2 bg-background border-t mt-6">
            <SheetClose asChild>
              <Button className="w-full" size="lg">
                Apply Filters
                {activeFiltersCount > 0 && ` (${activeFiltersCount})`}
              </Button>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
