"use server";

import {
  categoryService,
  CreateCategoryPayload,
} from "@/service/categoryService";
import { updateTag } from "next/cache";

export const getCategories = async (
  page: number = 1,
  limit: number = 5,
  searchTerm: string = "",
) => {
  const res = await categoryService.getCategories(page, limit, searchTerm);
  updateTag("categories");
  return res;
};

export const createCategory = async (payload: CreateCategoryPayload) => {
  const res = await categoryService.createCategory(payload);
  updateTag("categories");
  return res;
};

export const updateCategory = async (
  id: string,
  payload: {
    name?: string;
    description?: string;
    isActive?: boolean;
  },
) => {
  const res = await categoryService.updateCategory(id, payload);
  updateTag("categories");
  return res;
};

export const deleteCategory = async (id: string) => {
  const res = await categoryService.deleteCategory(id);
  updateTag("categories");
  return res;
};
