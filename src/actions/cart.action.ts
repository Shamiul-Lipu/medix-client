"use server";

import { cartService } from "@/service/cartService";
import { CartItem } from "@/constants/cartTypes";
import { updateTag } from "next/cache";

export const getCart = async () => {
  const res = await cartService.getCart();
  updateTag("orders");
  updateTag("cartItems");

  return res;
};

export const addToCart = async (item: CartItem) => {
  const res = await cartService.addItem(item);
  updateTag("cartItems");
  return res;
};

export const removeFromCart = async (medicineId: string) => {
  const res = await cartService.removeItem(medicineId);
  updateTag("cartItems");
  return res;
};

export const clearCart = async () => {
  const res = await cartService.clearCart();
  updateTag("cartItems");

  return res;
};

export const updateCart = async (medicineId: string, quantity: number) => {
  const res = await cartService.updateItem(medicineId, quantity);
  updateTag("cartItems");
  return res;
};
