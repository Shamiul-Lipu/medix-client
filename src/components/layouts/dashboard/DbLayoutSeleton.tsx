import { Skeleton } from "@/components/ui/skeleton";

export const DbLayoutSeleton = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Full Width Skeleton for the header or main section */}
      <Skeleton className="h-14 w-full rounded-md" />

      {/* Grid of Skeletons for cards or content areas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-32 w-full rounded-md" />
        <Skeleton className="h-32 w-full rounded-md" />
        <Skeleton className="h-32 w-full rounded-md" />
      </div>

      {/* Main Content Skeleton */}
      <Skeleton className="h-48 w-full rounded-md" />
      <Skeleton className="h-24 w-full rounded-md" />
    </div>
  );
};
