import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingBag,
  BarChart3,
  FileText,
} from "lucide-react";

// Role-based navigation
export const NAV_ITEMS = {
  ADMIN: [
    {
      label: "Overview",
      href: "/dashboard/admin",
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
      href: "/dashboard/customer",
      icon: LayoutDashboard,
    },
    {
      label: "Orders",
      href: "/dashboard/customer/orders",
      icon: ShoppingBag,
    },
  ],
  SELLER: [
    {
      label: "Overview",
      href: "/dashboard/seller",
      icon: LayoutDashboard,
    },
    {
      label: "Inventory",
      href: "/dashboard/seller/inventory",
      icon: Package,
    },
    {
      label: "Prescriptions",
      href: "/dashboard/seller",
      icon: FileText,
    },
  ],
};
