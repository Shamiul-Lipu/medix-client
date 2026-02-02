import { cookies } from "next/headers";

export type SidebarCategory = {
  id: string;
  name: string;
};

export interface Category {
  id: string;
  name: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCategoryPayload {
  name: string;
  description?: string;
  isActive: boolean;
}

interface UpdateCategoryPayload {
  name?: string;
  description?: string;
  isActive?: boolean;
}

const API_BASE = "http://localhost:5000/api/v1/category";

export const categoryService = {
  getCategories: async (page = 1, limit = 5, searchTerm = "") => {
    try {
      const cookieStore = await cookies();

      const queryParams = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(searchTerm ? { searchTerm } : {}),
      }).toString();

      const res = await fetch(`${API_BASE}?${queryParams}`, {
        headers: { Cookie: cookieStore.toString() },
        next: { tags: ["categories"] },
      });

      if (!res.ok) throw new Error("Failed to fetch categories");

      const data = await res.json();

      return {
        data: (data?.data?.data as Category[]) || [],
        pagination: data?.data?.pagination || null,
        error: null,
      };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: [], pagination: null, error: { message } };
    }
  },

  createCategory: async (payload: CreateCategoryPayload) => {
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
        throw new Error(err.message || "Failed to create category");
      }

      const data = await res.json();
      return { data: data.data as Category, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  updateCategory: async (id: string, payload: UpdateCategoryPayload) => {
    try {
      const cookieStore = await cookies();
      console.log(id, payload);
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
        throw new Error(err.message || "Failed to update category");
      }

      const data = await res.json();
      return { data: data.data as Category, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },

  deleteCategory: async (id: string) => {
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
        throw new Error(err.message || "Failed to delete category");
      }

      const data: {
        deletedMedicines: number;
        reassignedMedicines: number;
        categoryName: string;
      } = await res.json().then((d) => d.data);

      return { data, error: null };
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong";
      return { data: null, error: { message } };
    }
  },
};
