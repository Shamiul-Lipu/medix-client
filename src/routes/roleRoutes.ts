import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  // BarChart3,
  MessageSquare,
  ClipboardCheck,
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
      label: "Users Activity",
      href: "/dashboard/admin/users-activity",
      icon: Users,
    },
    {
      label: "Moderation",
      href: "/dashboard/admin/reviews",
      icon: ClipboardCheck,
    },
    {
      label: "Inventory",
      href: "/dashboard/admin/inventory",
      icon: Package,
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
