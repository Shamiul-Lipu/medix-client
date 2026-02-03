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
  Users,
  ShoppingCart,
  Package,
  TrendingUp,
  User as UserIcon,
  ShieldCheck,
  Mail,
} from "lucide-react";
import { User } from "./CustomerDashboardComponent";

export interface RecentUser {
  id: string;
  name: string;
  role: "CUSTOMER" | "SELLER" | "ADMIN";
  createdAt: string;
}

export interface AdminDashboard {
  totalUsers: number;
  totalCustomers: number;
  totalSellers: number;
  totalOrders: number;
  totalMedicines: number;
  recentUsers: RecentUser[];
}

interface AdminDashboardProps {
  user: User;
  dashboard: AdminDashboard;
}

export function AdminDashboardComponent({
  user,
  dashboard,
}: AdminDashboardProps) {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "CUSTOMER":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "SELLER":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-8">
      {/* ===== Admin Profile Header ===== */}
      <Card className="bg-gradient-to-r from-teal-50 to-teal-100 shadow-md">
        <CardContent className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 pt-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-14 w-14 ring-2 ring-teal-500">
              <AvatarFallback className="text-lg font-semibold">
                {user.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                {user.name}
                <ShieldCheck className="h-5 w-5 text-red-600" />
              </h2>
              <p className="text-sm text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {user.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* ===== Stats Grid ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard
          title="Total Users"
          value={dashboard.totalUsers}
          icon={Users}
          description="All registered users"
          gradient="from-red-100 to-red-50 text-red-900"
        />
        <StatCard
          title="Customers"
          value={dashboard.totalCustomers}
          icon={UserIcon}
          description="Active shoppers"
          gradient="from-blue-100 to-blue-50 text-blue-900"
        />
        <StatCard
          title="Sellers"
          value={dashboard.totalSellers}
          icon={ShoppingCart}
          description="Vendors / Pharmacies"
          gradient="from-purple-100 to-purple-50 text-purple-900"
        />
        <StatCard
          title="Total Orders"
          value={dashboard.totalOrders}
          icon={TrendingUp}
          description="Platform transactions"
          gradient="from-yellow-100 to-yellow-50 text-yellow-900"
        />
        <StatCard
          title="Medicines"
          value={dashboard.totalMedicines}
          icon={Package}
          description="Products in catalog"
          gradient="from-green-100 to-green-50 text-green-900"
        />
      </div>

      {/* ===== Metrics & Health ===== */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Platform Metrics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <MetricRow
              label="Avg Orders per Customer"
              value={(dashboard.totalOrders / dashboard.totalCustomers).toFixed(
                1,
              )}
            />
            <MetricRow
              label="Medicines per Seller"
              value={(
                dashboard.totalMedicines / dashboard.totalSellers
              ).toFixed(1)}
            />
            <MetricRow
              label="User Distribution"
              value={`${dashboard.totalCustomers} Customers / ${dashboard.totalSellers} Sellers`}
            />
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>System Health</CardTitle>
            <CardDescription>Platform status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <HealthRow label="User Bans" value="No bans" />
            <HealthRow label="Platform Status" value="Operational" />
            <HealthRow label="Admin Account" value="Active" />
          </CardContent>
        </Card>
      </div>

      {/* ===== Recent Users Table ===== */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent User Registrations</CardTitle>
          <CardDescription>
            Latest {dashboard.recentUsers.length} registered users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b bg-gray-100">
                <tr>
                  <th className="text-left py-2 px-2">Name</th>
                  <th className="text-left py-2 px-2">Role</th>
                  <th className="text-right py-2 px-2">Registered</th>
                </tr>
              </thead>
              <tbody>
                {dashboard.recentUsers.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b last:border-none hover:bg-muted/50 transition"
                  >
                    <td className="py-3 px-2 font-medium">{u.name}</td>
                    <td className="py-3 px-2">
                      <Badge className={getRoleColor(u.role)}>{u.role}</Badge>
                    </td>
                    <td className="text-right py-3 px-2 text-muted-foreground">
                      {formatDate(u.createdAt)}
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

/* ===== Reusable UI Helpers ===== */
function StatCard({
  title,
  value,
  icon: Icon,
  description,
  gradient,
}: {
  title: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  gradient: string;
}) {
  return (
    <Card
      className={`bg-gradient-to-tr ${gradient} shadow-lg hover:scale-105 transform transition`}
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

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-none">
      <span className="text-sm">{label}</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}

function HealthRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between border-b pb-2 last:border-none">
      <span className="text-sm">{label}</span>
      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
        {value}
      </Badge>
    </div>
  );
}
