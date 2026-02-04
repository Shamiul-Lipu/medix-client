import { UserRole } from "@/constants/userRoles";
import { cookies } from "next/headers";

const API_BASE = "http://localhost:5000/api/v1/admin";

interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
  tags?: string[];
}

interface AdminUserControlPayload {
  isBanned?: boolean;
  role?: UserRole;
  [key: string]: any;
}

export const adminService = {
  getAllUsers: async (
    filters?: Record<string, any>,
    options?: ServiceOptions,
  ) => {
    try {
      const cookieStore = await cookies();
      const query = filters
        ? "?" + new URLSearchParams(filters).toString()
        : "";

      const res = await fetch(`${API_BASE}/users${query}`, {
        headers: { Cookie: cookieStore.toString() },
        cache: options?.cache,
        next: {
          revalidate: options?.revalidate,
          tags: options?.tags || ["adminUsers"],
        },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },

  controlUser: async (userId: string, payload: AdminUserControlPayload) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_BASE}/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to update user");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },

  getSingleUserDetails: async (sellerId: string) => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(`${API_BASE}/sellers/${sellerId}/activity`, {
        headers: { Cookie: cookieStore.toString() },
      });

      if (!res.ok) throw new Error("Failed to fetch seller activity");

      const data = await res.json();
      return { data, error: null };
    } catch (err) {
      return {
        data: null,
        error: {
          message: err instanceof Error ? err.message : "Something went wrong",
        },
      };
    }
  },
};
