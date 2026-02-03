"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Package, Star, CalendarCheck } from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "CUSTOMER" | "SELLER";
  phone?: string | null;
  address?: string | null;
  image?: string | null;
  isBanned: boolean;
  createdAt: string;
}

export interface CustomerDashboard {
  totalOrders: number;
  cartItems: number;
  reviewsGiven: number;
  recentOrders: {
    id: string;
    status: "DELIVERED" | "CANCELLED" | "PENDING";
    totalAmount: string;
    createdAt: string;
  }[];
}

interface CustomerDashboardProps {
  user: User;
  dashboard: CustomerDashboard;
}

export function CustomerDashboardComponent({
  user,
  dashboard,
}: CustomerDashboardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "CANCELLED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold">Hello, {user.name} 👋</h1>
          <p className="text-muted-foreground mt-2">
            Here’s your account overview and recent orders
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              className="h-12 w-12 rounded-full border-2 border-indigo-500"
            />
          ) : (
            <div className="h-12 w-12 rounded-full bg-indigo-200 flex items-center justify-center text-white font-bold">
              {user.name[0].toUpperCase()}
            </div>
          )}
          <div>
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-tr from-indigo-100 to-indigo-50 shadow-lg hover:scale-105 transform transition">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium text-indigo-700">
              Total Orders
            </CardTitle>
            <Package className="h-5 w-5 text-indigo-700" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-indigo-900">
              {dashboard.totalOrders}
            </p>
            <p className="text-xs text-indigo-600">All purchases</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-tr from-emerald-100 to-emerald-50 shadow-lg hover:scale-105 transform transition">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium text-emerald-700">
              Cart Items
            </CardTitle>
            <ShoppingCart className="h-5 w-5 text-emerald-700" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-emerald-900">
              {dashboard.cartItems}
            </p>
            <p className="text-xs text-emerald-600">In your cart</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-tr from-yellow-100 to-yellow-50 shadow-lg hover:scale-105 transform transition">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium text-yellow-700">
              Reviews
            </CardTitle>
            <Star className="h-5 w-5 text-yellow-700" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-yellow-900">
              {dashboard.reviewsGiven}
            </p>
            <p className="text-xs text-yellow-600">Products reviewed</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-tr from-purple-100 to-purple-50 shadow-lg hover:scale-105 transform transition">
          <CardHeader className="flex justify-between items-center pb-2">
            <CardTitle className="text-sm font-medium text-purple-700">
              Member Since
            </CardTitle>
            <CalendarCheck className="h-5 w-5 text-purple-700" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-purple-900">
              {new Date(user.createdAt).getFullYear()}
            </p>
            <p className="text-xs text-purple-600">Member for 1+ years</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
          <CardDescription>
            Showing your latest {dashboard.recentOrders.length} orders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {dashboard.recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition-shadow shadow-sm hover:shadow-md"
              >
                <div>
                  <p className="text-sm font-medium">
                    Order #{order.id.slice(0, 8)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </p>
                </div>
                <div className="text-right flex flex-col items-end gap-1">
                  <p className="text-sm font-bold">${order.totalAmount}</p>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
