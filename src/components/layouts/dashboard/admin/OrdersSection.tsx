"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Search, Eye, Loader2, XCircle } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  cancelOrder,
  getOrders,
  updateOrderStatus,
} from "@/actions/order.actions";
import { toast } from "sonner";

interface OrderItem {
  id: string;
  medicineNameSnapshot: string;
  manufacturerSnapshot?: string;
  quantity: number;
  priceSnapshot: string;
  subtotal: string;
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
  notes?: string;
  createdAt: string;
  deliveredAt: string | null;
  customer: Customer;
  items: OrderItem[];
}

export function OrdersSection() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [orderToCancel, setOrderToCancel] = useState<Order | null>(null);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  // Fetch orders
  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getOrders();

      if (response.data?.success && response.data.data?.orders) {
        setOrders(response.data.data.orders);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      toast.error("Failed to load orders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  // Filter orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.shippingName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer?.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Update order status
  const handleStatusChange = async (orderId: string, newStatus: string) => {
    setActionLoading(orderId);

    try {
      const response = await updateOrderStatus(orderId, newStatus);

      if (response.data?.success) {
        toast.success(`Order status changed to ${newStatus}`);

        fetchOrders();
      } else {
        throw new Error(response.data?.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error(`Failed to update order status`);
    } finally {
      setActionLoading(null);
    }
  };

  // Cancel order
  const handleCancelClick = (order: Order) => {
    if (order.status === "DELIVERED" || order.status === "CANCELLED") {
      toast.warning(`Cannot cancel ${order.status.toLowerCase()} orders`);
      return;
    }

    setOrderToCancel(order);
    setIsCancelDialogOpen(true);
  };

  const handleCancelConfirm = async () => {
    if (!orderToCancel) return;

    setActionLoading(orderToCancel.id);
    setIsCancelDialogOpen(false);

    try {
      const response = await cancelOrder(
        orderToCancel.id,
        "Cancelled by admin",
      );

      if (response.data?.success) {
        toast.success("Order has been cancelled successfully");

        fetchOrders();
      } else {
        throw new Error(response.data?.message || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.success("Failed to cancel order");
    } finally {
      setActionLoading(null);
      setOrderToCancel(null);
    }
  };

  // View order details
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "default";
      case "PLACED":
      case "PROCESSING":
        return "secondary";
      case "CANCELLED":
        return "destructive";
      case "SHIPPED":
        return "outline";
      default:
        return "outline";
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString));
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Orders Management</CardTitle>
          <CardDescription>View and manage all customer orders</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by Order ID or Customer Name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                disabled={loading}
              />
            </div>
            <Select
              value={statusFilter}
              onValueChange={setStatusFilter}
              disabled={loading}
            >
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="PLACED">Placed</SelectItem>
                <SelectItem value="PROCESSING">Processing</SelectItem>
                <SelectItem value="SHIPPED">Shipped</SelectItem>
                <SelectItem value="DELIVERED">Delivered</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Orders Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-32" />
                      </TableCell>
                    </TableRow>
                  ))
                ) : filteredOrders.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-center py-8 text-gray-500"
                    >
                      No orders found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredOrders.map((order) => {
                    const isLoading = actionLoading === order.id;

                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          {order.id}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {order.shippingName}
                            </span>
                            <span className="text-xs text-gray-500">
                              {order.customer?.email}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">
                            {order.items.length} items
                          </span>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ৳{parseFloat(order.totalAmount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <span className="text-sm">{order.paymentMethod}</span>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusBadgeVariant(order.status)}>
                            {order.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              value={order.status}
                              onValueChange={(value) =>
                                handleStatusChange(order.id, value)
                              }
                              disabled={
                                isLoading ||
                                order.status === "DELIVERED" ||
                                order.status === "CANCELLED"
                              }
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PLACED">Placed</SelectItem>
                                <SelectItem value="PROCESSING">
                                  Processing
                                </SelectItem>
                                <SelectItem value="SHIPPED">Shipped</SelectItem>
                                <SelectItem value="DELIVERED">
                                  Delivered
                                </SelectItem>
                                <SelectItem value="CANCELLED">
                                  Cancelled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleViewDetails(order)}
                              disabled={isLoading}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCancelClick(order)}
                              disabled={
                                isLoading ||
                                order.status === "DELIVERED" ||
                                order.status === "CANCELLED"
                              }
                            >
                              {isLoading ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                              )}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Order Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
            <DialogDescription>
              Complete information for order {selectedOrder?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold mb-2">Customer Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Name</p>
                    <p>{selectedOrder.shippingName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Email</p>
                    <p>{selectedOrder.customer?.email}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Phone</p>
                    <p>{selectedOrder.shippingPhone}</p>
                  </div>
                </div>
              </div>

              {/* Order Status */}
              <div>
                <h3 className="font-semibold mb-2">Order Status</h3>
                <Badge variant={getStatusBadgeVariant(selectedOrder.status)}>
                  {selectedOrder.status}
                </Badge>
              </div>

              {/* Items Purchased */}
              <div>
                <h3 className="font-semibold mb-2">Items Purchased</h3>
                <div className="space-y-2">
                  {selectedOrder.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <p className="font-medium">
                          {item.medicineNameSnapshot}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ৳
                          {parseFloat(item.priceSnapshot).toFixed(2)}
                        </p>
                      </div>
                      <p className="font-medium">
                        ৳{parseFloat(item.subtotal).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Details */}
              <div>
                <h3 className="font-semibold mb-2">Shipping Address</h3>
                <div className="text-sm space-y-1 bg-gray-50 p-3 rounded-lg">
                  <p>{selectedOrder.shippingAddress}</p>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h3 className="font-semibold mb-2">Payment Method</h3>
                <p className="text-sm">{selectedOrder.paymentMethod}</p>
              </div>

              {/* Notes */}
              {selectedOrder.notes && (
                <div>
                  <h3 className="font-semibold mb-2">Notes</h3>
                  <p className="text-sm bg-gray-50 p-3 rounded-lg">
                    {selectedOrder.notes}
                  </p>
                </div>
              )}

              {/* Dates */}
              <div>
                <h3 className="font-semibold mb-2">Order Date</h3>
                <p className="text-sm">{formatDate(selectedOrder.createdAt)}</p>
                {selectedOrder.deliveredAt && (
                  <>
                    <h3 className="font-semibold mb-2 mt-3">Delivered Date</h3>
                    <p className="text-sm text-green-600">
                      {formatDate(selectedOrder.deliveredAt)}
                    </p>
                  </>
                )}
              </div>

              {/* Total Amount */}
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">Total Amount</h3>
                  <p className="text-xl font-bold">
                    ৳{parseFloat(selectedOrder.totalAmount).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Cancel Confirmation Dialog */}
      <AlertDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancel Order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will cancel order{" "}
              {orderToCancel?.id} for {orderToCancel?.shippingName}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No, Keep Order</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Yes, Cancel Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
