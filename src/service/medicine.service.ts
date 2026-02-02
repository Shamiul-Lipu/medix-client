// import { GetMedicinesParams, ServiceOptions } from "@/constants/medicine";
import { cookies } from "next/headers";

export interface Medicine {
  id: string;
  sellerId: string;
  categoryId: string;

  name: string;
  description?: string | null;
  manufacturer: string;
  price: number;
  stock: number;
  dosageForm?: string | null;
  strength?: string | null;
  usageInstructions?: string | null;
  sideEffects?: string | null;
  imageUrl?: string | null;
  isActive: boolean;

  createdAt: string;
  updatedAt: string;
}

interface CreateMedicinePayload {
  categoryId: string;
  name: string;
  description?: string;
  manufacturer: string;
  price: number;
  stock: number;
  dosageForm?: string;
  strength?: string;
  usageInstructions?: string;
  sideEffects?: string;
  imageUrl?: string;
}

interface UpdateMedicinePayload {
  categoryId?: string;
  name?: string;
  description?: string;
  manufacturer?: string;
  price?: number;
  stock?: number;
  dosageForm?: string;
  strength?: string;
  usageInstructions?: string;
  sideEffects?: string;
  imageUrl?: string;
  isActive?: boolean;
}

const API_BASE = "http://localhost:5000/api/v1/medicine";

export const medicineService = {
  // GET seller medicines
  getMedicines: async () => {
    try {
      const cookieStore = await cookies();

      const res = await fetch(API_BASE, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["medicines"] },
      });

      if (!res.ok) throw new Error("Failed to fetch medicines");

      const data = await res.json();
      return { data: data.data as Medicine[], error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  // CREATE medicine
  createMedicine: async (payload: CreateMedicinePayload) => {
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

  // UPDATE medicine
  updateMedicine: async (id: string, payload: UpdateMedicinePayload) => {
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

  // DELETE / DEACTIVATE medicine
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
