import Link from "next/link";
import { User, Shield, ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MainLogo from "./mainLogo";
import { getSession } from "@/actions/user.action";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import LogoutButton from "./LogoutButton";

export async function Navbar() {
  // Server-side fetch session
  const { data: session } = await getSession();
  const user = session?.user ?? null;
  const isLoggedIn = !!user;
  const userRole = user?.role;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <MainLogo />

        {/* Right actions */}
        <div className="flex items-center gap-2">
          {/* Desktop navigation */}
          <nav className="hidden md:flex gap-6 items-center">
            <Link
              href="/shop"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Shop
            </Link>
          </nav>
          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
          </Link>

          {/* Auth buttons / dropdown */}
          {!isLoggedIn ? (
            <div className="hidden md:flex gap-2">
              <Button variant="ghost" size="sm">
                <Link href="/login">Login</Link>
              </Button>
              <Button size="sm">
                <Link href="/register">Register</Link>
              </Button>
            </div>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>

                {userRole === "admin" && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin" className="flex items-center gap-2">
                      <Shield className="h-4 w-4" /> Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem className="text-red-600">
                  <LogoutButton />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="flex flex-col justify-between h-full p-6 bg-background text-foreground"
            >
              {/* Sheet Title for accessibility */}
              <SheetTitle>
                <VisuallyHidden>Mobile Navigation Menu</VisuallyHidden>
              </SheetTitle>

              {/* Top: Logo */}
              <MainLogo />

              {/* Navigation */}
              <nav className="flex flex-col gap-4 mt-6">
                <Link href="/shop" className="text-lg font-medium">
                  Shop
                </Link>
              </nav>

              {/* Bottom: Auth buttons */}
              <div className="flex flex-col gap-2 mt-auto">
                {!isLoggedIn ? (
                  <>
                    <Button variant="outline" className="w-full">
                      <Link href="/login">Login</Link>
                    </Button>
                    <Button className="w-full">
                      <Link href="/register">Register</Link>
                    </Button>
                  </>
                ) : (
                  <LogoutButton />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
