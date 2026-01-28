import { MobileSidebar } from "./mobile-sidebar";
import { Role } from "./nav-config";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Topbar({ role }: { role: Role }) {
  return (
    <header className="h-16 border-b flex items-center justify-between px-4">
      <MobileSidebar role={role} />

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon">
          <User className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
