"use client";

import { useCart } from "@/context/cartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import OrderSheet from "@/components/layouts/commonLayouts/OrderSheet";
import Image from "next/image";

type Medicine = {
  id: string;
  name: string;
  manufacturer: string;
  price: string;
  stock: number;
  imageUrl: string;
  category: { id: string; name: string };
};

type CartItem = {
  id: string;
  customerId: string;
  medicineId: string;
  quantity: number;
  medicine: Medicine;
  isAvailable: boolean;
  insufficientStock: boolean;
};

export default function CartPage() {
  const {
    items,
    itemCount,
    totalAmount,
    isLoading,
    updateCart,
    removeFromCart,
    clearCart,
  } = useCart();

  const typedItems: CartItem[] = items.map((i: any) => ({
    id: i.id || i.medicineId,
    customerId: i.customerId || "unknown",
    medicineId: i.medicineId,
    quantity: i.quantity,
    medicine: {
      id: i.medicine?.id || i.medicineId,
      name: i.medicine?.name || i.name,
      manufacturer: i.medicine?.manufacturer || i.manufacturer,
      price: i.medicine?.price || i.price,
      stock: i.medicine?.stock || i.stock || 0,
      imageUrl: i.medicine?.imageUrl || i.imageUrl || "/placeholder.png",
      category: i.medicine?.category || { id: "unknown", name: "Unknown" },
    },
    isAvailable: i.isAvailable ?? true,
    insufficientStock: i.insufficientStock ?? false,
  }));

  const getItemSubtotal = (item: CartItem) =>
    Number(item.medicine.price) * item.quantity;

  if (!typedItems || typedItems.length === 0) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
        <div className="pointer-events-none absolute left-1/2 top-32 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            color: "var(--border)",
          }}
        />
        <div className="container relative px-4 py-16">
          <div className="mx-auto max-w-md text-center">
            <div className="mb-6 flex justify-center">
              <div className="rounded-full bg-muted p-8">
                <ShoppingBag className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
            <h2 className="mb-3 text-2xl font-bold">Your cart is empty</h2>
            <p className="mb-8 text-muted-foreground">
              Start adding medicines to your cart to see them here
            </p>
            <Link href="/catalog">
              <Button size="lg" className="gap-2">
                Browse Products
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const orderItems = typedItems.map((item) => ({
    medicineId: item.medicineId,
    quantity: item.quantity,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden ">
      {/* Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          color: "var(--border)",
        }}
      />

      <div className="container relative px-4 py-8 md:py-12 container-wide">
        {/* Header */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {typedItems.length}{" "}
              {typedItems.length === 1 ? "product" : "products"}, {itemCount}{" "}
              {itemCount === 1 ? "unit" : "units"} in your cart
            </p>
          </div>
          <Button variant="outline" onClick={clearCart}>
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            {typedItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-6 overflow-hidden rounded-2xl border border-border/40 bg-background/70 py-6 shadow-sm backdrop-blur transition-shadow hover:shadow-md"
              >
                <div className="flex flex-col gap-6 p-4 sm:flex-row md:p-6">
                  {/* Image */}
                  <div className="mx-auto h-24 w-24 shrink-0 overflow-hidden rounded-2xl border bg-white shadow-sm sm:mx-0">
                    <Image
                      src={item.medicine.imageUrl}
                      alt={item.medicine.name}
                      className="h-full w-full object-cover"
                      width={1000}
                      height={1000}
                      layout="responsive"
                    />
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col gap-1 text-center sm:text-left">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                      <div>
                        <h3 className="text-lg font-bold">
                          {item.medicine.name}
                        </h3>
                        <p className="text-xs font-medium uppercase tracking-wider text-primary">
                          {item.medicine.manufacturer}
                        </p>
                      </div>
                      <span className="text-lg font-bold">
                        ৳{getItemSubtotal(item).toFixed(2)}
                      </span>
                    </div>

                    {item.quantity > 1 && (
                      <p className="text-xs text-muted-foreground">
                        ৳{Number(item.medicine.price).toFixed(2)} each
                      </p>
                    )}

                    {/* Quantity Controls */}
                    <div className="mt-auto flex items-center justify-center gap-4 pt-4 sm:justify-start">
                      <div className="flex items-center gap-0 overflow-hidden rounded-full border bg-background p-1 shadow-sm">
                        <button
                          onClick={() =>
                            updateCart(item.medicineId, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCart(item.medicineId, item.quantity + 1)
                          }
                          disabled={item.quantity >= item.medicine.stock}
                          className="inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.medicineId)}
                        className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-muted-foreground transition-colors hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="hidden sm:inline">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link href="/catalog">
              <Button variant="outline" className="w-full" size="lg">
                ← Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1 sticky">
            <div className="sticky top-24 flex flex-col gap-6 rounded-3xl border border-border/40 bg-background/80 py-6 shadow-lg backdrop-blur">
              <div className="flex flex-col gap-4 px-6">
                <h2 className="text-xl font-bold">Order Summary</h2>
                <Separator />
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Total Amount</span>
                  <span className="font-medium">৳{totalAmount.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-xl text-primary">
                    ৳{totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-4 px-6">
                {/* OrderSheet component should manage the button */}
                <OrderSheet cartItems={orderItems} />

                <p className="px-4 text-center text-[10px] text-muted-foreground">
                  By clicking checkout, you agree to our Terms of Service and
                  Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
