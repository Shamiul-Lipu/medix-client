import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export type Category = {
  id: string;
  name: string;
};

type FilterSidebarProps = {
  categories: Category[];
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
};

export default function FilterSidebar({
  categories,
  selectedCategories,
  setSelectedCategories,
  inStockOnly,
  setInStockOnly,
}: FilterSidebarProps) {
  const activeFiltersCount = selectedCategories.length + (inStockOnly ? 1 : 0);

  const handleClearAll = () => {
    setSelectedCategories([]);
    setInStockOnly(false);
  };

  const toggleCategory = (id: string) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id],
    );
  };

  return (
    <div className="border rounded-xl p-6 bg-card shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="rounded-full">
              {activeFiltersCount}
            </Badge>
          )}
        </div>
        {activeFiltersCount > 0 && (
          <button
            onClick={handleClearAll}
            className="text-xs text-primary hover:underline font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            Categories
          </h3>
          <div className="space-y-3">
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id={`cat-${cat.id}`}
                    checked={selectedCategories.includes(cat.id)}
                    onCheckedChange={() => toggleCategory(cat.id)}
                  />
                  <Label
                    htmlFor={`cat-${cat.id}`}
                    className="text-sm cursor-pointer font-normal hover:text-primary transition-colors"
                  >
                    {cat.name}
                  </Label>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Availability */}
        <div>
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-primary rounded-full" />
            Availability
          </h3>
          <div className="flex items-center gap-2">
            <Checkbox
              id="in-stock"
              checked={inStockOnly}
              onCheckedChange={() => setInStockOnly(!inStockOnly)}
            />
            <Label
              htmlFor="in-stock"
              className="text-sm cursor-pointer font-normal hover:text-primary transition-colors"
            >
              In Stock Only
            </Label>
          </div>
        </div>
      </div>
    </div>
  );
}
