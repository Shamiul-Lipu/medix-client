import { cookies } from "next/headers";

export interface Medicine {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  price: string;
  stock: number;
  imageUrl?: string;
  dosageForm?: string;
  strength?: string;
  usageInstructions?: string;
  sideEffects?: string;
  isActive: boolean;
  createdAt: string;

  category: {
    id: string;
    name: string;
  };

  seller?: {
    id: string;
    name: string;
  };
}

export interface CreateMedicinePayload {
  id: string;
  sellerId?: string;
  categoryId?: string;

  name?: string;
  description?: string | null;
  manufacturer: string;
  price?: number;
  stock?: number;
  dosageForm?: string | null;
  strength?: string | null;
  usageInstructions?: string | null;
  sideEffects?: string | null;
  imageUrl?: string | null;
  isActive?: boolean;
}

export interface UpdateMedicinePayload {
  id: string;
  sellerId?: string;
  categoryId?: string;
  name?: string;
  description?: string | null;
  manufacturer: string;
  price?: number;
  stock?: number;
  dosageForm?: string | null;
  strength?: string | null;
  usageInstructions?: string | null;
  sideEffects?: string | null;
  imageUrl?: string | null;
  isActive?: boolean;
}

export interface GetMedicinesParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: string;
  manufacturer?: string;
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  sortByStock?: boolean;
  sortOrderStock?: "asc" | "desc";
}

const API_BASE = `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/medicine`;

export const medicineService = {
  getMedicines: async (params?: Partial<GetMedicinesParams>) => {
    try {
      const cookieStore = await cookies();

      const query = params
        ? `?${new URLSearchParams(
            Object.entries(params)
              .filter(([, v]) => v !== undefined && v !== null)
              .map(([k, v]) => [k, String(v as string | number | boolean)]),
          ).toString()}`
        : "";

      const res = await fetch(`${API_BASE}${query}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: { tags: ["medicines"] },
      });

      if (!res.ok) throw new Error("Failed to fetch medicines");

      const json = await res.json();

      return {
        data: json.data as {
          pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
          };
          data: Medicine[];
        },
        error: null,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";

      return {
        data: null,
        error: { message },
      };
    }
  },

  getMedicineById: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "GET",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to get medicine");
      }

      const data = await res.json();
      return { data: data.data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  createMedicine: async (payload: Partial<Medicine>) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create medicine");
      }

      const data = await res.json();
      return { data: data.data as Medicine, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  updateMedicine: async (id: string, payload: Partial<Medicine>) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to update medicine");
      }

      const data = await res.json();
      return { data: data.data as Medicine, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  deleteMedicine: async (id: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to delete medicine");
      }

      const data = await res.json();
      return { data: data.data as Medicine, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },
};
