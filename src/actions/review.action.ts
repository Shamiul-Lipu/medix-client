"use server";

import { reviewService } from "@/service/reviewService";
import { updateTag } from "next/cache";

export const getReviews = async () => {
  const res = await reviewService.getAllReviews();
  updateTag("reviews");
  return res;
};

export const createReview = async (payload: {
  orderItemId: string;
  medicineId: string;
  rating: number;
  comment?: string;
}) => {
  const res = await reviewService.createReview(payload);
  updateTag("reviews");
  return res;
};

export const updateReview = async (
  reviewId: string,
  payload: { rating?: number; comment?: string },
) => {
  const res = await reviewService.updateReview(reviewId, payload);
  updateTag("reviews");
  return res;
};

export const deleteReview = async (reviewId: string) => {
  const res = await reviewService.deleteReview(reviewId);
  updateTag("reviews");
  return res;
};
