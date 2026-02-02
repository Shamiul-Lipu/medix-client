"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OrderStats } from "@/components/layouts/dashboard/seller/OrderStats";
import { OrdersTable } from "@/components/layouts/dashboard/seller/OrdersTable";

import { Skeleton } from "@/components/ui/skeleton";
import { getOrders } from "@/actions/order.actions";
import { toast } from "sonner";

// Types matching backend response
interface OrderItem {
  id: string;
  medicineNameSnapshot: string;
  quantity: number;
  priceSnapshot: string;
  subtotal: string;
  status: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
}

interface Order {
  id: string;
  totalAmount: string;
  status: string;
  paymentMethod: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  createdAt: string;
  deliveredAt: string | null;
  customer: Customer;
  items: OrderItem[];
}

interface OrdersResponse {
  data: {
    success: boolean;
    data: {
      meta: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
      };
      orders: Order[];
    };
  };
}

export default function OrdersDashboard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Fetch orders on mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = (await getOrders()) as OrdersResponse;

      if (response.data?.success && response.data.data?.orders) {
        setOrders(response.data.data.orders);
        console.log(setOrders);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders. Please try again.");

      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter orders by search term
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.shippingPhone.includes(searchTerm) ||
      order.customer?.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Transform orders for stats component (needs totalAmount as number)
  const ordersForStats = filteredOrders.map((order) => ({
    status: order.status,
    totalAmount: parseFloat(order.totalAmount),
  }));

  // Transform orders for table (needs proper types)
  const ordersForTable = filteredOrders.map((order) => ({
    id: order.id,
    customerId: order.customer.id,
    customerName: order.customer.name,
    customerEmail: order.customer.email,
    totalAmount: parseFloat(order.totalAmount),
    paymentMethod: order.paymentMethod,
    status: order.status,
    shippingName: order.shippingName,
    shippingPhone: order.shippingPhone,
    shippingAddress: order.shippingAddress,
    notes: "", // Backend doesn't return notes in list view
    createdAt: new Date(order.createdAt),
    updatedAt: new Date(order.createdAt), // Use createdAt as fallback
    deliveredAt: order.deliveredAt ? new Date(order.deliveredAt) : null,
    items: order.items.map((item) => ({
      id: item.id,
      medicineNameSnapshot: item.medicineNameSnapshot,
      quantity: item.quantity,
      priceSnapshot: parseFloat(item.priceSnapshot),
      subtotal: parseFloat(item.subtotal),
      status: item.status,
    })),
  }));

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Orders
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Manage and track all customer orders
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        {isLoading ? (
          <div className="mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <OrderStats orders={ordersForStats} className="mb-8" />
        )}

        {/* Search and Orders */}
        <Card>
          <CardHeader>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <CardTitle>All Orders</CardTitle>
                <CardDescription>
                  {isLoading ? (
                    <Skeleton className="h-4 w-32" />
                  ) : (
                    <>
                      {filteredOrders.length} of {orders.length} orders
                    </>
                  )}
                </CardDescription>
              </div>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  disabled={isLoading}
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
              <OrdersTable orders={ordersForTable} onRefresh={fetchOrders} />
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
