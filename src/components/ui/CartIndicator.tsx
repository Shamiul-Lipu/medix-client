"use client";

import { useCart } from "@/context/cartContext";

export default function CartIndicator() {
  const { itemCount, isLoading } = useCart();

  if (isLoading)
    return (
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pharmacy-teal-light opacity-75"></span>
    );
  console.log(itemCount);
  return (
    <>
      {" "}
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          {itemCount}
        </span>
      ) : (
        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
          0
        </span>
      )}
    </>
  );
}
