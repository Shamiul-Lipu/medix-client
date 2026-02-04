"use server";

import { UserRole } from "@/constants/userRoles";
import { adminService } from "@/service/adminService";
import { updateTag } from "next/cache";

export const getAllUsers = async (filters?: Record<string, any>) => {
  const res = await adminService.getAllUsers(filters);
  updateTag("adminUsers"); // invalidate cache for users
  return res;
};

export const controlUser = async (
  userId: string,
  payload: { isBanned?: boolean; role?: UserRole; [key: string]: any },
) => {
  const res = await adminService.controlUser(userId, payload);
  updateTag("adminUsers"); // invalidate users cache
  return res;
};

export const getSingleUserDetails = async (sellerId: string) => {
  const res = await adminService.getSingleUserDetails(sellerId);
  updateTag(`sellerActivity:${sellerId}`); // invalidate specific seller activity cache
  return res;
};
