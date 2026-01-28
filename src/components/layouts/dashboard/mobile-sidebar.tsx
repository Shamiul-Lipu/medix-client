"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { navItems, Role } from "./nav-config";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@/components/ui/visually-hidden";

export function MobileSidebar({ role }: { role: Role }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="w-64">
        <VisuallyHidden>
          <DialogTitle>Dashboard Navigation</DialogTitle>
        </VisuallyHidden>

        <div className="mb-6 text-lg font-semibold text-blue-600">Medix</div>

        <nav className="space-y-1">
          {navItems[role].map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm
                           text-muted-foreground hover:bg-muted transition"
              >
                {/* <Icon className="h-4 w-4" /> */}
                {item.title}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
