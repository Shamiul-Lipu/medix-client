"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { OrderDetailsDialog } from "./OrderDetailsDialog";
import { cancelOrder, updateOrderStatus } from "@/actions/order.actions";
import { toast } from "sonner";
import { getSession } from "@/actions/user.action";
import { UserRoles } from "@/constants/userRoles";

interface OrderItem {
  id: string;
  medicineNameSnapshot: string;
  manufacturerSnapshot?: string;
  quantity: number;
  priceSnapshot: number;
  subtotal: number;
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

// Allowed transitions for SELLER/ADMIN
const ORDER_TRANSITIONS: Record<string, string[]> = {
  PLACED: ["PROCESSING"],
  PROCESSING: ["SHIPPED"],
  SHIPPED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
};

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
  const [updatingOrders, setUpdatingOrders] = useState<Set<string>>(new Set());
  const [userRole, setUserRole] = useState<string | null>(null);

  // Fetch session once
  useEffect(() => {
    getSession().then((session) => {
      const user = session?.data?.user;
      setUserRole(user?.role ?? null);
    });
  }, []);

  const handleStatusUpdate = async (orderId: string, newStatus: string) => {
    setUpdatingOrders((prev) => new Set(prev).add(orderId));

    try {
      const session = await getSession();
      const user = session?.data?.user;

      if (!user) {
        throw new Error("User not authenticated");
      }

      let res;

      if (user.role === UserRoles.CUSTOMER) {
        res = await cancelOrder(orderId, "canceled");
      } else {
        res = await updateOrderStatus(orderId, newStatus);
      }

      if (res?.data?.success) {
        toast.success(
          user.role === UserRoles.CUSTOMER
            ? "Order canceled successfully"
            : `Order status changed to ${newStatus}`,
        );

        onRefresh();
      } else {
        toast.error(res?.data?.message ?? "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to update order status";
      toast.error(errorMessage);
    } finally {
      setUpdatingOrders((prev) => {
        const next = new Set(prev);
        next.delete(orderId);
        return next;
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
              const isUpdating = updatingOrders.has(order.id);

              return (
                <TableRow
                  key={order.id}
                  className="hover:bg-muted/50 overflow-visible"
                >
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
                  <TableCell className="overflow-visible">
                    <div className="flex items-center gap-2 overflow-visible">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>

                      {/* Status Update / Cancel Logic */}
                      {(() => {
                        if (!userRole) return null;

                        // CUSTOMER sees Cancel button if allowed
                        if (
                          userRole === UserRoles.CUSTOMER &&
                          (order.status === "PLACED" ||
                            order.status === "PROCESSING")
                        ) {
                          return (
                            <Button
                              variant="destructive"
                              size="sm"
                              disabled={isUpdating}
                              onClick={() =>
                                handleStatusUpdate(order.id, "CANCELLED")
                              }
                            >
                              {isUpdating ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                "Cancel"
                              )}
                            </Button>
                          );
                        }

                        // SELLER / ADMIN see dropdown
                        const allowedNextStatuses =
                          ORDER_TRANSITIONS[order.status] ?? [];

                        if (allowedNextStatuses.length === 0) return null;

                        return (
                          <StatusUpdateSelect
                            currentStatus={order.status}
                            onStatusChange={(newStatus) =>
                              handleStatusUpdate(order.id, newStatus)
                            }
                            isUpdating={isUpdating}
                          />
                        );
                      })()}
                    </div>
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
        />
      )}
    </>
  );
}

function StatusUpdateSelect({
  currentStatus,
  onStatusChange,
  isUpdating,
}: {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  isUpdating: boolean;
}) {
  const allowedNextStatuses = ORDER_TRANSITIONS[currentStatus] ?? [];

  if (allowedNextStatuses.length === 0) return null;

  return (
    <Select onValueChange={onStatusChange} disabled={isUpdating}>
      <SelectTrigger
        className="h-7 w-auto gap-1 border-0 bg-transparent p-0 hover:bg-muted"
        onClick={(e) => e.stopPropagation()}
      >
        {isUpdating ? (
          <Loader2 className="h-4 w-4 animate-spin opacity-50" />
        ) : (
          <ChevronDown className="h-4 w-4 opacity-50" />
        )}
      </SelectTrigger>

      <SelectContent position="popper" sideOffset={4} className="z-50">
        {allowedNextStatuses.map((status) => (
          <SelectItem key={status} value={status}>
            {status}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
