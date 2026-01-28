"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  FileText,
  Settings,
  Bell,
  Search,
  Menu,
  ChevronRight,
  Infinity,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_ITEMS = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    href: "/dashboard",
    section: "Platform",
  },
  {
    label: "Inventory",
    icon: Package,
    href: "/dashboard/inventory",
    section: "Platform",
  },
  {
    label: "Patients",
    icon: Users,
    href: "/dashboard/patients",
    section: "Platform",
  },
  {
    label: "Orders",
    icon: ShoppingBag,
    href: "/dashboard/orders",
    badge: 12,
    section: "Platform",
  },
  {
    label: "Reports",
    icon: BarChart3,
    href: "/dashboard/reports",
    section: "Management",
  },
  {
    label: "Prescriptions",
    icon: FileText,
    href: "/dashboard/prescriptions",
    section: "Management",
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Mock state requested by user
  const isLoggedIn = true;
  const role = "admin";
  const cartCount = 2;

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex h-screen overflow-hidden bg-background/50 selection:bg-primary/20 selection:text-primary">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 transform flex-col border-r border-border bg-card shadow-soft transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Area */}
        <div className="flex h-16 items-center border-b border-border/50 px-6">
          <Link href="/" className="flex items-center gap-2 text-primary">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Infinity className="h-5 w-5" strokeWidth={2} />
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">
              Nexus<span className="text-secondary">Health</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {["Platform", "Management"].map((section) => (
            <div key={section} className="mb-4">
              <div className="mb-2 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                {section}
              </div>
              {NAV_ITEMS.filter((item) => item.section === section).map(
                (item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-accent text-accent-foreground border border-transparent shadow-sm"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
                      }`}
                    >
                      <div className="flex items-center">
                        <item.icon
                          className={`mr-3 h-[18px] w-[18px] stroke-[1.5] ${isActive ? "text-primary" : "group-hover:text-primary transition-colors"}`}
                        />
                        {item.label}
                      </div>
                      {item.badge && (
                        <Badge
                          variant="secondary"
                          className="bg-secondary/10 text-secondary border border-secondary/20 h-5 px-1.5 text-[10px] font-semibold"
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                },
              )}
            </div>
          ))}
        </nav>

        {/* User Profile (Bottom) */}
        <div className="border-t border-border bg-muted/30 p-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="group flex w-full items-center">
                <div className="relative">
                  <Avatar className="h-9 w-9 border border-border">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-accent text-xs font-bold text-primary uppercase">
                      AM
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card"></span>
                </div>
                <div className="ml-3 text-left">
                  <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Alex Morgan
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    Pharmacist {role.charAt(0).toUpperCase() + role.slice(1)}
                  </p>
                </div>
                <ChevronRight className="ml-auto h-4 w-4 text-muted-foreground group-hover:text-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex min-w-0 flex-1 flex-col lg:ml-64">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 px-4 backdrop-blur-md sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden text-muted-foreground"
            >
              <Menu className="h-6 w-6" />
            </Button>

            {/* Breadcrumb - Simplified for overview */}
            <nav className="hidden items-center text-sm font-medium text-muted-foreground sm:flex">
              <Link
                href="/dashboard"
                className="transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
              <ChevronRight className="mx-2 h-3 w-3 text-border" />
              <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-foreground">
                Overview
              </span>
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search */}
            <div className="relative group hidden md:flex">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                type="text"
                placeholder="Search patients, drugs..."
                className="w-64 border-transparent bg-muted/50 pl-9 pr-4 text-sm transition-all focus:bg-background focus:ring-1 focus:ring-ring"
              />
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <kbd className="hidden rounded border border-border bg-card px-1.5 font-sans text-[10px] font-medium text-muted-foreground sm:inline-block">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Notifications */}
            <Button
              variant="ghost"
              size="icon"
              className="relative text-muted-foreground hover:text-foreground rounded-full"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full border-2 border-background bg-secondary"></span>
            </Button>

            <div className="hidden h-8 w-px bg-border sm:block"></div>

            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center gap-2 text-xs font-medium shadow-sm"
            >
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-background/50">
          {children}
        </main>
      </div>
    </div>
  );
}
