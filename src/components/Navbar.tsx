"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Search,
  ShoppingCart,
  Menu,
  ChevronDown,
  User,
  LogOut,
  Shield,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MainLogo from "./mainLogo";

/**
 * Mock auth state
 * Replace with real auth (NextAuth, Clerk, custom, etc.)
 */
const isLoggedIn = false;
const userRole: "user" | "admin" = "admin";

export function Navbar() {
  const [mobileSearch, setMobileSearch] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* LEFT — Logo */}
        <MainLogo />

        {/* CENTER — Desktop Nav */}
        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/shop"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Shop
          </Link>

          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground transition hover:text-foreground">
              Categories <ChevronDown className="h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Vitamins</DropdownMenuItem>
              <DropdownMenuItem>Pain Relief</DropdownMenuItem>
              <DropdownMenuItem>Heart Health</DropdownMenuItem>
              <DropdownMenuItem>Baby Care</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link
            href="/about"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            About
          </Link>
        </div>

        {/* RIGHT — Actions */}
        <div className="flex items-center gap-2">
          {/* Desktop Search */}
          {/* <div className="hidden md:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search medicines..."
                className="h-9 w-56 pl-9"
              />
            </div>
          </div> */}

          {/* Mobile Search Toggle */}
          {/* <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileSearch((v) => !v)}
          >
            <Search className="h-5 w-5" />
          </Button> */}

          {/* Cart */}
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                3
              </span>
            </Button>
          </Link>

          {/* Auth */}
          {!isLoggedIn ? (
            <div className="hidden gap-2 md:flex">
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
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col gap-6">
              <Link href="/" className="text-lg font-bold">
                Medix
              </Link>

              <Input placeholder="Search medicines..." />

              <nav className="flex flex-col gap-4">
                <Link href="/shop">Shop</Link>
                <Link href="/categories">Categories</Link>
                <Link href="/about">About</Link>
              </nav>

              {!isLoggedIn ? (
                <div className="flex gap-2">
                  <Button variant="outline" className="w-full">
                    <Link href="/login">Login</Link>
                  </Button>
                  <Button className="w-full">
                    <Link href="/register">Register</Link>
                  </Button>
                </div>
              ) : (
                <Button variant="outline">Logout</Button>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {/* {mobileSearch && (
        <div className="border-t px-4 py-2 md:hidden">
          <Input placeholder="Search medicines..." autoFocus />
        </div>
      )} */}
    </header>
  );
}
