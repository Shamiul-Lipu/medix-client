import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Users,
  Settings,
} from "lucide-react";

export type Role = "user" | "admin";

export const navItems: Record<
  Role,
  {
    title: string;
    href: string;
    icon: unknown;
  }[]
> = {
  user: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "My Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
  admin: [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Products",
      href: "/dashboard/products",
      icon: Package,
    },
    {
      title: "Orders",
      href: "/dashboard/orders",
      icon: ShoppingBag,
    },
    {
      title: "Users",
      href: "/dashboard/users",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ],
};
