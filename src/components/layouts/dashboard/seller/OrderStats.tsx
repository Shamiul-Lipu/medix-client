"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Package, CheckCircle, Truck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface Order {
  status: string;
  totalAmount: number;
}

interface OrderStatsProps {
  orders: Order[];
  className?: string;
}

export function OrderStats({ orders, className }: OrderStatsProps) {
  const totalOrders = orders.length;
  const confirmedOrders = orders.filter((o) => o.status === "CONFIRMED").length;
  const shippedOrders = orders.filter((o) => o.status === "SHIPPED").length;
  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const stats = [
    {
      label: "Total Orders",
      value: totalOrders,
      icon: Package,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300",
    },
    {
      label: "Confirmed",
      value: confirmedOrders,
      icon: CheckCircle,
      color:
        "bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300",
    },
    {
      label: "In Transit",
      value: shippedOrders,
      icon: Truck,
      color:
        "bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-300",
    },
    {
      label: "Amount",
      value: `${totalRevenue.toFixed(2)}`,
      icon: AlertCircle,
      color:
        "bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-300",
      isRevenue: true,
    },
  ];

  return (
    <div
      className={cn(
        "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
        className,
      )}
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </div>
                <div className={cn("rounded-lg p-3", stat.color)}>
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
