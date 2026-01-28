"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems, Role } from "./nav-config";
import { cn } from "@/lib/utils";

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r bg-background">
      <div className="h-16 flex items-center px-6 font-semibold text-blue-600">
        Medix
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems[role].map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-muted-foreground hover:bg-muted",
              )}
            >
              {/* <Icon className="h-4 w-4" /> */}
              {item.title}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
