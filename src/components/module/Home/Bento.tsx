"use client";

import { Pill, Zap, Heart, Shield, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <div
    className={cn(
      "relative overflow-hidden rounded-2xl border",
      "bg-card/90 backdrop-blur-sm",
      "p-6 transition-all duration-300",
      "hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10",
      className,
    )}
  >
    {/* Card glow */}
    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
    {children}
  </div>
);

export function BentoGrid() {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 z-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        {/* Radial glow */}
        <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl md:h-[520px] md:w-[520px]" />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            color: "var(--border)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">
            Your trusted pharmacy,
            <span className="text-primary"> simplified</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Quality medicines & healthcare products, delivered fast.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Featured */}
          <Card className="md:col-span-6 min-h-[18rem] md:h-72 p-8">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-4 inline-flex rounded-xl bg-primary/15 p-3">
                  <Pill className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold">Fast Delivery</h3>
                <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                  Same-day delivery in select areas with real-time tracking.
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-fit">
                Learn more →
              </Button>
            </div>
          </Card>

          {/* Verified */}
          <Card className="md:col-span-3 min-h-[18rem] md:h-72">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-xl bg-emerald-500/15 p-3">
                  <Shield className="h-6 w-6 text-emerald-500" />
                </div>
                <h3 className="text-lg font-semibold">Verified Products</h3>
                <p className="text-sm text-muted-foreground">
                  100% authentic medicines
                </p>
              </div>
              <div className="text-3xl font-bold text-emerald-500">10K+</div>
            </div>
          </Card>

          {/* Advice */}
          <Card className="md:col-span-3 min-h-[18rem] md:h-72">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-xl bg-rose-500/15 p-3">
                  <Heart className="h-6 w-6 text-rose-500" />
                </div>
                <h3 className="text-lg font-semibold">Health Advice</h3>
                <p className="text-sm text-muted-foreground">
                  Talk to certified pharmacists
                </p>
              </div>
              <Button variant="secondary" size="sm" className="w-fit">
                Ask now
              </Button>
            </div>
          </Card>

          {/* Refills */}
          <Card className="md:col-span-4 min-h-[16rem] md:h-64">
            <div>
              <div className="mb-3 inline-flex rounded-xl bg-yellow-500/15 p-3">
                <Zap className="h-6 w-6 text-yellow-500" />
              </div>
              <h3 className="text-lg font-semibold">Quick Refills</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                One-click prescription refills that save time.
              </p>
            </div>
          </Card>

          {/* Pricing */}
          <Card className="md:col-span-4 min-h-[16rem] md:h-64">
            <div>
              <div className="mb-3 inline-flex rounded-xl bg-sky-500/15 p-3">
                <TrendingUp className="h-6 w-6 text-sky-500" />
              </div>
              <h3 className="text-lg font-semibold">Best Prices</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Compare prices across 5,000+ medicines.
              </p>
            </div>
          </Card>

          {/* Community */}
          <Card className="md:col-span-4 min-h-[16rem] md:h-64">
            <div className="flex h-full flex-col justify-between">
              <div>
                <div className="mb-3 inline-flex rounded-xl bg-violet-500/15 p-3">
                  <Users className="h-6 w-6 text-violet-500" />
                </div>
                <h3 className="text-lg font-semibold">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Trusted by thousands
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="h-7 w-7 rounded-full border bg-primary/30"
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  50K+ users
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
