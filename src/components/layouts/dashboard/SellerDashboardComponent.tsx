"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Package,
  AlertCircle,
  Clock,
  DollarSign,
  Store,
  Mail,
  MapPin,
} from "lucide-react";
import { User } from "./CustomerDashboardComponent";

export interface SellerDashboard {
  totalMedicines: number;
  lowStockMedicines: number;
  pendingOrders: number;
  recentOrderItems: {
    id: string;
    quantity: number;
    subtotal: string;
    order: {
      id: string;
      createdAt: string;
    };
    medicineNameSnapshot: string;
  }[];
}

interface SellerDashboardProps {
  user: User;
  dashboard: SellerDashboard;
}

export function SellerDashboardComponent({
  user,
  dashboard,
}: SellerDashboardProps) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const totalRevenue = dashboard.recentOrderItems.reduce(
    (sum, item) => sum + Number(item.subtotal),
    0,
  );

  return (
    <div className="space-y-8">
      {/* ===== Profile Header ===== */}
      <Card className="bg-gradient-to-r from-blue-50-50 to-blue-100 shadow-md">
        <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-2 ring-purple-500">
              <AvatarFallback className="text-lg font-semibold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {user.name}
                <Store className="h-5 w-5 text-purple-600" />
              </h2>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" /> {user.email}
              </p>
              {user.address && (
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <MapPin className="h-4 w-4" /> {user.address}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
              SELLER
            </Badge>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Medicines"
          value={dashboard.totalMedicines}
          icon={Package}
          description="Products in catalog"
          gradient="from-indigo-100 to-indigo-50 text-indigo-900"
        />
        <StatCard
          title="Low Stock"
          value={dashboard.lowStockMedicines}
          icon={AlertCircle}
          description="Need restocking"
          gradient="from-red-100 to-red-50 text-red-900"
        />
        <StatCard
          title="Pending Orders"
          value={dashboard.pendingOrders}
          icon={Clock}
          description="Awaiting fulfillment"
          gradient="from-yellow-100 to-yellow-50 text-yellow-900"
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue.toFixed(0)}`}
          icon={DollarSign}
          description="From recent orders"
          gradient="from-green-100 to-green-50 text-green-900"
        />
      </div>

      {/* ===== Recent Orders Table ===== */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Order Items</CardTitle>
          <CardDescription>
            Showing your latest {dashboard.recentOrderItems.length} items sold
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-2">Medicine</th>
                  <th className="text-center py-2 px-2">Qty</th>
                  <th className="text-right py-2 px-2">Subtotal</th>
                  <th className="text-right py-2 px-2">Order Date</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.recentOrderItems.map((item) => (
                  <tr
                    key={item.id}
                    className={`border-b last:border-none hover:bg-muted/50 transition-shadow ${
                      item.quantity <= 5 ? "bg-amber-50 dark:bg-red-900/10" : ""
                    }`}
                  >
                    <td className="py-3 px-2 font-medium">
                      {item.medicineNameSnapshot}
                    </td>
                    <td className="text-center py-3 px-2">{item.quantity}</td>
                    <td className="text-right py-3 px-2 font-semibold">
                      ${item.subtotal}
                    </td>
                    <td className="text-right py-3 px-2 text-muted-foreground">
                      {formatDate(item.order.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/* ===== Reusable StatCard ===== */
function StatCard({
  title,
  value,
  icon: Icon,
  description,
  gradient,
}: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  gradient: string;
}) {
  return (
    <Card
      className={`bg-linear-to-tr ${gradient} shadow-lg hover:scale-105 transform transition`}
    >
      <CardHeader className="flex justify-between items-center pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs">{description}</p>
      </CardContent>
    </Card>
  );
}
