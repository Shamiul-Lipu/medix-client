import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  MessageSquare,
} from "lucide-react";

// Role-based navigation
export const NAV_ITEMS = {
  ADMIN: [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      label: "Reports",
      href: "/dashboard/admin/reports",
      icon: BarChart3,
    },
  ],
  CUSTOMER: [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Orders",
      href: "/dashboard/customer/orders",
      icon: ShoppingBag,
    },
    {
      label: "Reviews",
      href: "/dashboard/customer/reviews",
      icon: MessageSquare,
    },
  ],
  SELLER: [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Orders",
      href: "/dashboard/seller/orders",
      icon: LayoutDashboard,
    },
    {
      label: "Inventory",
      href: "/dashboard/seller/inventory",
      icon: Package,
    },
    {
      label: "Reviews",
      href: "/dashboard/seller/reviews",
      icon: MessageSquare,
    },
  ],
};
