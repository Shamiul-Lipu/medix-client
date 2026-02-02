"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  MapPin,
  Phone,
  DollarSign,
  Calendar,
  Package,
  Loader2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

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

interface OrderDetailsDialogProps {
  order: Order;
  isOpen: boolean;
  onClose: () => void;
  onStatusUpdate: (itemId: string, newStatus: string) => void;
  updatingItems: Set<string>;
}

const ITEM_STATUS_OPTIONS = [
  "PLACED",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

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

const formatDateTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export function OrderDetailsDialog({
  order,
  isOpen,
  onClose,
  onStatusUpdate,
  updatingItems,
}: OrderDetailsDialogProps) {
  // Calculate overall order status from items
  const allStatuses = order.items.map((item) => item.status);
  const uniqueStatuses = [...new Set(allStatuses)];
  const orderStatus =
    uniqueStatuses.length === 1 ? uniqueStatuses[0] : order.status;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <DialogTitle className="text-2xl">Order {order.id}</DialogTitle>
              <DialogDescription>
                Order details and shipping information
              </DialogDescription>
            </div>
            <Badge className={getStatusColor(orderStatus)}>{orderStatus}</Badge>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Customer Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Package className="h-4 w-4" />
              Customer Information
            </h3>
            <div className="grid gap-4 rounded-lg border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">
                    {order.shippingName}
                  </p>
                </div>
                {order.customerEmail && (
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">
                      {order.customerEmail}
                    </p>
                  </div>
                )}
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">Contact</p>
                  <p className="font-medium text-foreground">
                    {order.shippingPhone}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    Shipping Address
                  </p>
                  <p className="font-medium text-foreground">
                    {order.shippingAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Order Items</h3>
            <div className="rounded-lg border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Medicine</TableHead>
                    <TableHead className="text-center">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Subtotal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => {
                    const isUpdating = updatingItems.has(item.id);

                    return (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {item.medicineNameSnapshot}
                        </TableCell>
                        <TableCell className="text-center">
                          {item.quantity}
                        </TableCell>
                        <TableCell className="text-right">
                          ৳{item.priceSnapshot.toFixed(2)}
                        </TableCell>
                        <TableCell className="text-right font-semibold">
                          ৳{item.subtotal.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Select
                            value={item.status}
                            onValueChange={(newStatus) =>
                              onStatusUpdate(item.id, newStatus)
                            }
                            disabled={
                              isUpdating ||
                              item.status === "DELIVERED" ||
                              item.status === "CANCELLED"
                            }
                          >
                            <SelectTrigger className="w-35">
                              <SelectValue>
                                {isUpdating ? (
                                  <span className="flex items-center gap-2">
                                    <Loader2 className="h-3 w-3 animate-spin" />
                                    Updating...
                                  </span>
                                ) : (
                                  "Change Status"
                                )}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {ITEM_STATUS_OPTIONS.map((status) => (
                                <SelectItem
                                  key={status}
                                  value={status}
                                  disabled={status === item.status}
                                >
                                  {status}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>

          <Separator />

          {/* Order Information */}
          <div className="space-y-3">
            <h3 className="font-semibold text-foreground">Order Information</h3>
            <div className="grid gap-4 rounded-lg border p-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Total Amount
                    </p>
                    <p className="text-xl font-bold text-foreground">
                      ৳{order.totalAmount.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Payment Method
                  </p>
                  <p className="font-medium text-foreground">
                    {order.paymentMethod === "COD"
                      ? "Cash on Delivery"
                      : "Card"}
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Created</p>
                    <p className="font-medium text-foreground">
                      {formatDateTime(order.createdAt)}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Last Updated</p>
                  <p className="font-medium text-foreground">
                    {formatDateTime(order.updatedAt)}
                  </p>
                </div>
              </div>

              {/* Delivery Status */}
              {order.deliveredAt && (
                <div className="pt-3 border-t">
                  <p className="text-sm text-muted-foreground">
                    Delivered on{" "}
                    <span className="font-medium text-green-600">
                      {formatDateTime(order.deliveredAt)}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {order.notes && (
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground">Notes</h3>
              <p className="rounded-lg bg-muted p-3 text-sm text-foreground">
                {order.notes}
              </p>
            </div>
          )}

          {/* Action Info */}
          <div className="rounded-lg bg-blue-50 dark:bg-blue-950 p-4 text-sm text-blue-900 dark:text-blue-100">
            <p className="font-medium mb-1">ℹ️ Status Management</p>
            <p className="text-xs">
              Update individual item statuses above. The order status will
              automatically update when all items reach the same status. Items
              cannot be updated after being marked as DELIVERED or CANCELLED.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
