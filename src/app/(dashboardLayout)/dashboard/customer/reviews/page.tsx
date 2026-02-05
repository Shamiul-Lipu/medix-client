"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  createReview,
  deleteReview,
  updateReview,
} from "@/actions/review.action";
import { getOrders } from "@/actions/order.actions";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type OrderItem = {
  id: string;
  medicineId: string;
  medicineNameSnapshot: string;
  quantity: number;
  priceSnapshot: string;
  subtotal: string;
  review: {
    id: string;
    orderItemId: string;
    medicineId: string;
    rating: number;
    comment?: string;
  } | null;
};

type Order = {
  id: string;
  totalAmount: string;
  status: "DELIVERED" | "CANCELLED" | "PLACED" | "PROCESSING" | "SHIPPED";
  paymentMethod: string;
  createdAt: string;
  deliveredAt: string | null;
  items: OrderItem[];
};

export default function DashboardPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<OrderItem | null>(null);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getOrders();
    if (res.error) {
      toast.error(`${res.error.message}`);
      setLoading(false);
      return;
    }

    const sortedOrders = res.data.data.orders.sort((a: Order, b: Order) => {
      if (a.status === "DELIVERED" && b.status !== "DELIVERED") return -1;
      if (a.status !== "DELIVERED" && b.status === "DELIVERED") return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    setOrders(sortedOrders);
    setLoading(false);
  };

  useEffect(() => {
    const loadOrders = async () => {
      await fetchOrders();
    };
    loadOrders();
  }, []);

  const openReviewModal = (item: OrderItem) => {
    setSelectedItem(item);
    setRating(item.review?.rating ?? 5);
    setComment(item.review?.comment ?? "");
    setOpen(true);
  };

  const handleSaveReview = async () => {
    if (!selectedItem) return;

    const payload = {
      orderItemId: selectedItem.id,
      medicineId: selectedItem.medicineId,
      rating,
      comment,
    };

    let res;
    if (selectedItem.review) {
      res = await updateReview(selectedItem.review.id, { rating, comment });
    } else {
      res = await createReview(payload);
    }

    if (res.error) {
      toast.error(`${res.error.message}`);
      return;
    }

    toast.success(
      `${selectedItem.review ? "Review updated" : "Review created"}`,
    );

    setOpen(false);
    fetchOrders();
  };

  const handleDeleteReview = async (reviewId: string) => {
    const res = await deleteReview(reviewId);
    if (res.error) {
      toast.error(`${res.error.message}`);
      return;
    }
    toast.success(`Review deleted`);
    fetchOrders();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DELIVERED":
        return "bg-emerald-100 text-emerald-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      case "SHIPPED":
        return "bg-blue-100 text-blue-800";
      case "PROCESSING":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      <div className="grid gap-4">
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border rounded-lg p-4">
                <Skeleton className="h-6 w-1/2 mb-3" />
                <Skeleton className="h-4 w-1/3 mb-4" />
                <div className="grid gap-3">
                  {[1, 2].map((j) => (
                    <div
                      key={j}
                      className="border rounded-md p-3 flex justify-between items-center"
                    >
                      <div>
                        <Skeleton className="h-5 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                      </div>
                      <div className="flex gap-2">
                        <Skeleton className="h-8 w-24" />
                        <Skeleton className="h-8 w-24" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          orders.map((order) => (
            <Card
              key={order?.id}
              className="border-gray-200 bg-white shadow-sm"
            >
              <CardHeader className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-base font-semibold">
                    Order ID: {order?.id}
                  </CardTitle>
                  <div className="text-sm text-muted-foreground mt-1">
                    Total:{" "}
                    <span className="font-medium">{order.totalAmount}</span> •
                    Payment: {order?.paymentMethod}
                    {order?.deliveredAt && (
                      <>
                        {" "}
                        • Delivered:{" "}
                        {new Date(order?.deliveredAt).toLocaleString()}
                      </>
                    )}
                  </div>
                </div>

                <Badge className={getStatusColor(order?.status)}>
                  {order?.status}
                </Badge>
              </CardHeader>

              <CardContent>
                <div className="grid gap-3">
                  {order?.items?.map((item) => (
                    <div
                      key={item?.id}
                      className="border border-gray-200 rounded-lg p-3 flex justify-between items-center bg-slate-50"
                    >
                      <div>
                        <div className="font-medium">
                          {item?.medicineNameSnapshot}
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          Qty: {item?.quantity} • Price: {item?.priceSnapshot} •
                          Subtotal: {item?.subtotal}
                        </div>

                        {item?.review && (
                          <div className="mt-2 text-sm text-muted-foreground">
                            ⭐ Rating:{" "}
                            <span className="font-medium">
                              {item?.review?.rating}
                            </span>
                            {item?.review?.comment && (
                              <>
                                {" "}
                                • Comment:{" "}
                                <span className="font-medium">
                                  {item?.review?.comment}
                                </span>
                              </>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {order?.status === "DELIVERED" && (
                          <Button
                            size="sm"
                            onClick={() => openReviewModal(item)}
                          >
                            {item?.review ? "Edit Review" : "Add Review"}
                          </Button>
                        )}

                        {item?.review && (
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteReview(item?.review!.id)}
                          >
                            Delete Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Review Modal */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>
              {selectedItem?.review ? "Edit Review" : "Add Review"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Rating (1-5)</label>
              <Input
                type="number"
                min={1}
                max={5}
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Comment</label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your review..."
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveReview}>Save</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
