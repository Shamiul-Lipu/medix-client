"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MainLogo from "@/components/ui/mainLogo";
import LogoutButton from "@/components/ui/LogoutButton";
import { getSession } from "@/actions/user.action";
import { Loader } from "@/components/ui/loader";
import { SessionData } from "@/constants/userRoles";
import { NAV_ITEMS } from "@/routes/roleRoutes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getSession();
        setData(data);
      } catch (err) {
        console.error("Failed to fetch session", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <Loader fullscreen label="Loading dashboard…" />;
  if (!data?.user) return;

  const { user } = data;
  const role = user.role as keyof typeof NAV_ITEMS;
  const navItems = NAV_ITEMS[role];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  // "/dashboard/customer/orders" → ["dashboard", "customer", "orders"]
  const segments = pathname.split("/").filter(Boolean);

  return (
    <div className="flex h-screen overflow-hidden bg-background/50 selection:bg-primary/20 selection:text-primary">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-foreground/20 backdrop-blur-sm lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-card shadow-soft transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center border-b border-border/50 px-6">
          <MainLogo />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-6">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-accent text-accent-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center">
                  <item.icon
                    className={`mr-3 h-5 w-5 stroke-[1.5] ${
                      isActive
                        ? "text-primary"
                        : "group-hover:text-primary transition-colors"
                    }`}
                  />
                  {item.label}
                </div>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
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

            <nav className="hidden items-center text-sm font-medium text-muted-foreground sm:flex">
              {segments.map((segment, index) => {
                const href = "/" + segments.slice(0, index + 1).join("/");
                const isLast = index === segments.length - 1;

                return (
                  <div key={href} className="flex items-center">
                    {index !== 0 && (
                      <ChevronRight className="mx-2 h-3 w-3 text-border" />
                    )}

                    <Link
                      href={href}
                      className={
                        isLast
                          ? "rounded-md bg-muted px-2 py-0.5 text-xs text-foreground"
                          : "hover:text-foreground capitalize"
                      }
                    >
                      {segment.replace("-", " ")}
                    </Link>
                  </div>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="group flex w-full items-center bg-teal-50 p-0.5">
                  <div className="relative">
                    <Avatar className="h-9 w-9 border border-border">
                      {user.image ? (
                        <AvatarImage src={user.image} />
                      ) : (
                        <AvatarFallback className="flex items-center justify-center bg-muted text-foreground">
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-success ring-2 ring-card"></span>
                  </div>
                  <div className="ml-3 text-left">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      {user.name}
                    </p>
                    <Badge className="text-[10px] text-muted-foreground bg-amber-100">
                      {role}
                    </Badge>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <Link href="/shop">Shop</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-destructive">
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-background/50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
