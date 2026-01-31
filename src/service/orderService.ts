import { cookies } from "next/headers";

interface OrderItem {
  id: string;
  medicineNameSnapshot: string;
  quantity: number;
  priceSnapshot: number;
  subtotal: number;
  status: string;
}

interface CreateOrderPayload {
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  notes?: string;
  items: {
    medicineId: string;
    quantity: number;
  }[];
}

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

const API_BASE = "http://localhost:5000/api/v1/order";

export const orderService = {
  // Get all orders for the user
  getOrders: async (options?: ServiceOptions) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}`, {
        headers: { Cookie: cookieStore.toString() },
        cache: options?.cache,
        next: {
          revalidate: options?.revalidate,
          tags: options?.tags || ["orders"],
        },
      });

      if (!res.ok) throw new Error("Failed to fetch orders");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  // Get a single order by ID
  getOrderById: async (orderId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/${orderId}`, {
        headers: { Cookie: cookieStore.toString() },
      });

      if (!res.ok) throw new Error("Failed to fetch order");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  // Create a new order
  createOrder: async (payload: CreateOrderPayload) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to create order");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  // Update the status of an order item
  updateOrderItemStatus: async (itemId: string, status: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/items/${itemId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Failed to update item status");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  // Cancel an order
  cancelOrder: async (orderId: string, reason?: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/${orderId}/cancel`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ reason }),
      });

      if (!res.ok) throw new Error("Failed to cancel order");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },
};
