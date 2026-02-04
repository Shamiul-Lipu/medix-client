"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

type Role = "CUSTOMER" | "ADMIN" | "SELLER";

export type OrderItem = {
  id: string;
  medicineId: string;
  medicineNameSnapshot: string;
  quantity: number;
  priceSnapshot: string;
  subtotal: string;
  review: {
    id: string;
    rating: number;
    comment?: string;
  } | null;
};

export type Order = {
  id: string;
  totalAmount: string;
  status: "DELIVERED" | "CANCELLED" | "PLACED" | "PROCESSING" | "SHIPPED";
  paymentMethod: string;
  createdAt: string;
  deliveredAt: string | null;
  items: OrderItem[];
};

type Props = {
  role: Role;
  orders: Order[];
  loading: boolean;
  onDeleteReview?: (reviewId: string) => Promise<void>;
  onOpenReviewModal?: (item: OrderItem) => void;
};

export function ReviewDashboard({
  role,
  orders,
  loading,
  onOpenReviewModal,
  onDeleteReview,
}: Props) {
  const canEdit = role === "CUSTOMER";
  const canDelete = role === "CUSTOMER" || role === "ADMIN";

  return (
    <div className="grid gap-4">
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-gray-200 bg-white shadow-sm">
              <CardHeader className="flex justify-between items-center">
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-6 w-24" />
              </CardHeader>
              <CardContent>
                {[1, 2].map((j) => (
                  <div
                    key={j}
                    className="border rounded-lg p-3 flex justify-between items-center bg-slate-50"
                  >
                    <div>
                      <Skeleton className="h-5 w-48 mb-2" />
                      <Skeleton className="h-4 w-64" />
                      <Skeleton className="h-4 w-40 mt-2" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-24" />
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : orders.length === 0 ? (
        <div className="text-center text-lg text-gray-500 py-6">
          No orders found.
        </div>
      ) : (
        orders.map((order) => (
          <Card key={order.id} className="border-gray-200 bg-white shadow-sm">
            <CardHeader className="flex justify-between items-start">
              <div>
                <CardTitle className="text-base font-semibold">
                  Order ID: {order.id}
                </CardTitle>
                <div className="text-sm text-muted-foreground mt-1">
                  Total:{" "}
                  <span className="font-medium"> {order.totalAmount}</span> •
                  Payment: {order.paymentMethod}
                  {order.deliveredAt && (
                    <>
                      {" "}
                      • Delivered:{" "}
                      {new Date(order.deliveredAt).toLocaleString()}
                    </>
                  )}
                </div>
              </div>

              <Badge
                className={
                  order.status === "DELIVERED"
                    ? "bg-emerald-100 text-emerald-800"
                    : order.status === "CANCELLED"
                      ? "bg-red-100 text-red-800"
                      : order.status === "SHIPPED"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "PROCESSING"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                }
              >
                {order.status}
              </Badge>
            </CardHeader>

            <CardContent>
              <div className="grid gap-3">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="border border-gray-200 rounded-lg p-3 flex justify-between items-center bg-slate-50"
                  >
                    <div>
                      <div className="font-medium">
                        {item.medicineNameSnapshot}
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        Qty: {item.quantity} • Price: {item.priceSnapshot} •
                        Subtotal: {item.subtotal}
                      </div>

                      {/* Review Section */}
                      {item.review ? (
                        <div className="mt-2 text-sm text-muted-foreground bg-teal-50 p-1 rounded-2xl text-center">
                          ⭐ Rating:{" "}
                          <span className="font-medium">
                            {item.review.rating}
                          </span>
                          {item.review.comment && (
                            <>
                              {" "}
                              • Comment:{" "}
                              <span className="font-medium">
                                {item.review.comment}
                              </span>
                            </>
                          )}
                        </div>
                      ) : (
                        <div className="mt-2 text-sm text-muted-foreground bg-red-50 p-1 rounded-2xl text-center">
                          No reviews yet.
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2">
                      {/* Customer Add/Edit */}
                      {canEdit && order.status === "DELIVERED" && (
                        <Button
                          size="sm"
                          onClick={() => onOpenReviewModal?.(item)}
                        >
                          {item.review ? "Edit Review" : "Add Review"}
                        </Button>
                      )}

                      {/* Customer + Admin Delete */}
                      {canDelete && item.review && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => onDeleteReview?.(item.review!.id)}
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
  );
}
