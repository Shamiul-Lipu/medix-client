"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { updateOrderItemStatus } from "@/actions/order.actions";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  medicineNameSnapshot: string;
  quantity: number;
  priceSnapshot: number;
  subtotal: number;
  status: string;
}

interface Order {
  id: string;
  customerId: string;
  customerName?: string;
  customerEmail?: string;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  deliveredAt?: Date | null;
  items: OrderItem[];
}

interface OrdersTableProps {
  orders: Order[];
  onRefresh: () => void;
}

// OrderItem statuses (backend supports these)
// const ITEM_STATUS_OPTIONS = [
//   "PLACED",
//   "PROCESSING",
//   "SHIPPED",
//   "DELIVERED",
//   "CANCELLED",
// ];

const getStatusColor = (status: string) => {
  switch (status) {
    case "PLACED":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    case "PROCESSING":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    case "SHIPPED":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
    case "DELIVERED":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    case "CANCELLED":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(date);
};

export function OrdersTable({ orders, onRefresh }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  const handleItemStatusUpdate = async (itemId: string, newStatus: string) => {
    try {
      // Add to updating set
      setUpdatingItems((prev) => new Set(prev).add(itemId));

      const response = await updateOrderItemStatus(itemId, newStatus);

      if (response.data?.success) {
        toast.success(`Order item status changed to ${newStatus}`);

        // Refresh orders to get updated data
        onRefresh();
      } else {
        throw new Error(response.data?.message || "Failed to update status");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update order status");
    } finally {
      // Remove from updating set
      setUpdatingItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }
  };

  if (orders.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center rounded-lg border border-dashed border-border bg-muted/50">
        <p className="text-muted-foreground">No orders found</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold">Order ID</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Items</TableHead>
              <TableHead className="font-semibold">Amount</TableHead>
              <TableHead className="font-semibold">Payment</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="text-right font-semibold">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              // Get the most common item status for order-level display
              const itemStatuses = order.items.map((item) => item.status);
              const statusCounts = itemStatuses.reduce(
                (acc, status) => {
                  acc[status] = (acc[status] || 0) + 1;
                  return acc;
                },
                {} as Record<string, number>,
              );
              const primaryStatus =
                Object.entries(statusCounts).sort(
                  (a, b) => b[1] - a[1],
                )[0]?.[0] || order.status;

              return (
                <TableRow key={order.id} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-foreground">
                    {order.id}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">
                        {order.shippingName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {order.shippingPhone}
                      </span>
                      {order.customerEmail && (
                        <span className="text-xs text-muted-foreground">
                          {order.customerEmail}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <span className="text-sm font-medium">
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </span>
                      {order.items.length > 0 && (
                        <span className="text-xs text-muted-foreground">
                          {order.items[0].medicineNameSnapshot}
                          {order.items.length > 1 &&
                            ` +${order.items.length - 1} more`}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-semibold text-foreground">
                    ৳{order.totalAmount.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {order.paymentMethod === "COD"
                      ? "Cash on Delivery"
                      : "Card"}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${getStatusColor(primaryStatus)}`}>
                      {primaryStatus}
                    </Badge>
                    {order.items.length > 1 && (
                      <span className="ml-2 text-xs text-muted-foreground">
                        (mixed)
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(order.createdAt)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      {selectedOrder && (
        <OrderDetailsDialog
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleItemStatusUpdate}
          updatingItems={updatingItems}
        />
      )}
    </>
  );
}
