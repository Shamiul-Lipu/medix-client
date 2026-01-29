import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";
import Link from "next/link";
import React from "react";

const Cart = () => {
  return (
    <>
      {/* Cart Page */}
      <div className="relative overflow-hidden min-h-screen">
        {/* Background Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />

        {/* Radial Glow */}
        <div className="pointer-events-none absolute left-1/2 top-32 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

        {/* Subtle Grid Texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "36px 36px",
            color: "var(--border)",
          }}
        />

        <div className="container relative px-4 py-8 md:py-12">
          {/* Header */}
          <div className="mb-10 text-center sm:text-left">
            <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
            <p className="mt-2 text-muted-foreground text-sm">
              Review your items before proceeding to checkout
            </p>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {/** Example Item 1 */}
              <div className="text-card-foreground flex flex-col gap-6 rounded-2xl bg-background/70 backdrop-blur border border-border/40 shadow-sm overflow-hidden transition-shadow hover:shadow-md py-6">
                <div className="p-4 md:p-6 flex flex-col sm:flex-row gap-6">
                  <div className="h-24 w-24 rounded-2xl border bg-white shadow-sm overflow-hidden shrink-0 mx-auto sm:mx-0">
                    <img
                      src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&h=400&auto=format&fit=crop"
                      alt="Paracetamol 500mg"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-lg leading-tight">
                          Paracetamol 500mg
                        </h3>
                        <p className="text-xs text-primary font-medium uppercase tracking-wider">
                          HealthCare
                        </p>
                      </div>
                      <span className="font-bold text-lg">$11.98</span>
                    </div>

                    <div className="mt-auto flex items-center justify-center sm:justify-start gap-4 pt-4">
                      <div className="flex items-center border rounded-full p-1 bg-background shadow-sm">
                        <button className="inline-flex items-center justify-center h-7 w-7 rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                          {/* Minus Icon */}
                        </button>
                        <span className="w-8 text-center font-bold text-sm">
                          2
                        </span>
                        <button className="inline-flex items-center justify-center h-7 w-7 rounded-full text-sm font-medium hover:bg-accent hover:text-accent-foreground">
                          {/* Plus Icon */}
                        </button>
                      </div>
                      <button className="inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium text-muted-foreground hover:text-destructive transition-colors">
                        {/* Trash Icon */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/** Example Item 2 */}
              <div className="text-card-foreground flex flex-col gap-6 rounded-2xl bg-background/70 backdrop-blur border border-border/40 shadow-sm overflow-hidden transition-shadow hover:shadow-md py-6">
                <div className="p-4 md:p-6 flex flex-col sm:flex-row gap-6">
                  <div className="h-24 w-24 rounded-2xl border bg-white shadow-sm overflow-hidden shrink-0 mx-auto sm:mx-0">
                    <img
                      src="https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=400&h=400&auto=format&fit=crop"
                      alt="Amoxicillin 250mg"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-1 text-center sm:text-left">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-lg leading-tight">
                          Amoxicillin 250mg
                        </h3>
                        <p className="text-xs text-primary font-medium uppercase tracking-wider">
                          PharmaMed
                        </p>
                      </div>
                      <span className="font-bold text-lg">$12.50</span>
                    </div>

                    <div className="mt-2 flex items-center justify-center sm:justify-start gap-2">
                      <span className="inline-flex items-center justify-center rounded-md px-2 py-0.5 text-[10px] font-medium bg-secondary/20 text-secondary">
                        Rx Required
                      </span>
                    </div>

                    <div className="mt-auto flex items-center justify-center sm:justify-start gap-4 pt-4">
                      <div className="flex items-center border rounded-full p-1 bg-background shadow-sm">
                        <button className="h-7 w-7 rounded-full">-</button>
                        <span className="w-8 text-center font-bold text-sm">
                          1
                        </span>
                        <button className="h-7 w-7 rounded-full">+</button>
                      </div>
                      <button className="rounded-md text-sm font-medium text-muted-foreground hover:text-destructive">
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Safe & Secure Banner */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-primary/20 bg-primary/5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {/* Shield Icon */}
                    <Shield className="text-sm font-bold" />
                  </div>
                  <div>
                    Safe & Secure
                    <p className="text-xs text-muted-foreground">
                      100% Genuine Medicines
                    </p>
                  </div>
                </div>
                <Link href="/">
                  <Button className="h-8 rounded-md px-3  hover:bg-primary/5 hover:text-teal-700 text-amber-50">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="text-card-foreground flex flex-col gap-6 border border-border/40 bg-background/80 backdrop-blur rounded-3xl shadow-lg sticky top-24 py-6">
                <div className="px-6 flex flex-col gap-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">$24.48</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">$5.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (8%)</span>
                    <span className="font-medium">$1.96</span>
                  </div>

                  <div className="h-px w-full my-2 bg-muted-foreground/20"></div>

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-primary text-xl">$31.44</span>
                  </div>

                  <div className="flex flex-col gap-2 mt-4">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
                      Promo Code
                    </p>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter code"
                        className="flex-1 rounded-md border px-3 py-1 bg-background border-input text-base shadow-xs focus:ring-2 focus:ring-primary h-10"
                      />
                      <button className="rounded-md px-4 py-2 bg-background border shadow-xs hover:bg-accent hover:text-accent-foreground h-10">
                        Apply
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 px-6 pt-4">
                  <a href="/checkout">
                    <button className="w-full h-12 rounded-full bg-primary text-primary-foreground text-lg flex items-center justify-center gap-2 group relative overflow-hidden">
                      Checkout
                      <svg className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1">
                        {/* Arrow Icon */}
                      </svg>
                    </button>
                  </a>
                  <p className="text-[10px] text-center text-muted-foreground px-4">
                    By clicking checkout, you agree to our Terms of Service and
                    Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
