import { CartItem } from "@/constants/cartTypes";
import { cookies } from "next/headers";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

const API_BASE = "http://localhost:5000/api/v1/cart";

export const cartService = {
  getCart: async (options?: ServiceOptions) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}`, {
        headers: { Cookie: cookieStore.toString() },
        cache: options?.cache,
        next: {
          revalidate: options?.revalidate,
          tags: options?.tags || ["cartItems"],
        },
      });

      if (!res.ok) throw new Error("Failed to fetch cart");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  addItem: async (item: CartItem) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(item),
      });

      if (!res.ok) throw new Error("Failed to add item");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  updateItem: async (medicineId: string, quantity: number) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/items/${medicineId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("Failed to update item");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  removeItem: async (medicineId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/items/${medicineId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error("Failed to remove item");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  clearCart: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}`, {
        method: "DELETE",
        headers: { Cookie: cookieStore.toString() },
      });

      if (!res.ok) throw new Error("Failed to clear cart");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  updateCart: async (medicineId: string, quantity: number) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_BASE}/items/${medicineId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ quantity }),
      });

      if (!res.ok) throw new Error("Failed to update cart item");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },
};
