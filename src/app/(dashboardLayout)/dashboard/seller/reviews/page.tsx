"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getOrders } from "@/actions/order.actions";
import {
  Order,
  ReviewDashboard,
} from "@/components/layouts/dashboard/review/ReviewDashboard";

export default function SellerReviewPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const res = await getOrders();
    if (res.error) {
      toast.error(res.error?.message);
      setLoading(false);
      return;
    }

    setOrders(res?.data?.data?.orders);
    setLoading(false);
  };

  useEffect(() => {
    const load = async () => {
      await fetchOrders();
    };
    load();
  }, []);

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      <ReviewDashboard
        role="SELLER"
        orders={orders}
        loading={loading}
        onDeleteReview={undefined}
        onOpenReviewModal={undefined}
      />
    </div>
  );
}
