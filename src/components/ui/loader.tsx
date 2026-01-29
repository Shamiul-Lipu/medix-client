import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

type LoaderProps = {
  label?: string;
  fullscreen?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Loader({
  label = "Loading…",
  fullscreen = false,
  size = "md",
  className,
}: LoaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 text-muted-foreground",
        fullscreen && "h-screen",
        className,
      )}
    >
      <Spinner size={size} />
      {label && <span className="text-sm">{label}</span>}
    </div>
  );
}
