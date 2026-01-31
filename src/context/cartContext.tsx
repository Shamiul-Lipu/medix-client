"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import * as CartActions from "@/actions/cart.action";
import { CartItem } from "@/constants/cartTypes";
import { toast } from "sonner";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  totalAmount: number;
  isLoading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (item: CartItem) => Promise<void>;
  updateCart: (medicineId: string, quantity: number) => Promise<void>;
  removeFromCart: (medicineId: string) => Promise<void>;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [itemCount, setItemCount] = useState<number>(0);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchCart = async () => {
    setIsLoading(true);
    try {
      const res = await CartActions.getCart();

      if (res.error || !res.data?.success) {
        setItems([]);
        setItemCount(0);
        setTotalAmount(0);
      } else {
        const { items, summary } = res.data.data;
        setItems(items);
        setItemCount(summary.totalQuantity);
        setTotalAmount(summary.totalAmount);
      }
    } catch (err) {
      console.error("Failed to fetch cart:", err);
      toast.error("Failed to load cart.");
      setItems([]);
      setItemCount(0);
      setTotalAmount(0);
    } finally {
      setIsLoading(false);
    }
  };

  const addToCart = async (item: CartItem) => {
    const toastId = toast.loading("Adding item to cart...");
    try {
      const res = await CartActions.addToCart(item);

      if (res.error || !res.data?.success) {
        toast.error("Failed to add item.", { id: toastId });
      } else {
        toast.success("Item added to cart!", { id: toastId });
        await fetchCart();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  const updateCart = async (medicineId: string, quantity: number) => {
    const toastId = toast.loading("Updating cart...");
    try {
      const res = await CartActions.updateCart(medicineId, quantity);

      if (res.error || !res.data?.success) {
        toast.error("Failed to update item.", { id: toastId });
      } else {
        toast.success("Cart updated!", { id: toastId });
        await fetchCart();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  const removeFromCart = async (medicineId: string) => {
    const toastId = toast.loading("Removing item...");
    try {
      const res = await CartActions.removeFromCart(medicineId);

      if (res.error || !res.data?.success) {
        toast.error("Failed to remove item.", { id: toastId });
      } else {
        toast.success("Item removed!", { id: toastId });
        await fetchCart();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  const clearCart = async () => {
    const toastId = toast.loading("Clearing cart...");
    try {
      const res = await CartActions.clearCart();

      if (res.error || !res.data?.success) {
        toast.error("Failed to clear cart.", { id: toastId });
      } else {
        toast.success("Cart cleared!", { id: toastId });
        await fetchCart();
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.", { id: toastId });
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        totalAmount,
        isLoading,
        fetchCart,
        addToCart,
        updateCart,
        removeFromCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
