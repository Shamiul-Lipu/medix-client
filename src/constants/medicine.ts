export interface Medicine {
  id: string;
  name: string;
  description: string;
  manufacturer: string;
  price: string;
  stock: number;
  dosageForm: string | null;
  strength: string | null;
  imageUrl: string;
  category: { id: string; name: string };
  createdAt: string;
}

export interface ServiceOptions {
  cache?: RequestCache;
  revalidate?: number;
}

export interface GetMedicinesParams {
  search?: string;
  categoryId?: string;
  manufacturer?: string;
  minPrice?: string | number;
  maxPrice?: string | number;
  minStock?: string | number;
  maxStock?: string | number;
  page?: string | number;
  limit?: string | number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  category?: string;
}
