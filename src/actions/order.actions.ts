"use server";

import { orderService } from "@/service/orderService";
import { updateTag } from "next/cache";

export const getOrders = async () => {
  const res = await orderService.getOrders();
  updateTag("orders");
  return res;
};

export const getOrderById = async (orderId: string) => {
  const res = await orderService.getOrderById(orderId);
  updateTag("orders");
  return res;
};

export const createOrder = async (orderData: {
  shippingName: string;
  shippingPhone: string;
  shippingAddress: string;
  items: { medicineId: string; quantity: number }[];
  notes?: string;
}) => {
  const res = await orderService.createOrder(orderData);
  updateTag("orders");
  updateTag("cartItems");
  return res;
};

export const updateOrderItemStatus = async (itemId: string, status: string) => {
  const res = await orderService.updateOrderItemStatus(itemId, status);
  updateTag("orders");
  return res;
};

export const cancelOrder = async (orderId: string, reason?: string) => {
  const res = await orderService.cancelOrder(orderId, reason);
  return res;
};
