import { cookies } from "next/headers";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

const API_BASE = "http://localhost:5000/api/v1/review";

export const reviewService = {
  getAllReviews: async (options?: ServiceOptions) => {
    try {
      const res = await fetch(`${API_BASE}`, {
        cache: options?.cache,
        next: {
          revalidate: options?.revalidate,
          tags: options?.tags || ["reviews"],
        },
      });

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  createReview: async (payload: {
    orderItemId: string;
    medicineId: string;
    rating: number;
    comment?: string;
  }) => {
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

      if (!res.ok) throw new Error("Failed to create review");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  updateReview: async (
    reviewId: string,
    payload: { rating?: number; comment?: string },
  ) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/${reviewId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update review");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  deleteReview: async (reviewId: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/${reviewId}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) throw new Error("Failed to delete review");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },
};
