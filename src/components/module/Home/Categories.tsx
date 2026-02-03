"use client";

import {
  Baby,
  Eye,
  Heart,
  Pill,
  Sparkles,
  Stethoscope,
  Syringe,
  Thermometer,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const CATEGORIES = [
  { name: "Pain Relief", icon: Pill, count: 245 },
  { name: "Cold & Flu", icon: Thermometer, count: 189 },
  { name: "Baby Care", icon: Baby, count: 312 },
  { name: "Heart Health", icon: Heart, count: 156 },
  { name: "Skin Care", icon: Sparkles, count: 423 },
  { name: "Vitamins", icon: Syringe, count: 267 },
  { name: "Eye Care", icon: Eye, count: 134 },
  { name: "Medical Devices", icon: Stethoscope, count: 89 },
];

export default function Categories() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -240 : 240,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative py-18 md:py-22 overflow-hidden">
      <div className="absolute inset-0 -z-10" />

      <div className="mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold md:text-3xl">
              Shop by <span className="text-primary">Category</span>
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground max-w-xl">
              Browse healthcare essentials by category and find what you need
              faster.
            </p>
          </div>

          {/* Arrow controls */}
          <div className="hidden md:flex items-center gap-2">
            <button
              aria-label="Scroll left"
              onClick={() => scroll("left")}
              className="
                rounded-full border bg-background p-2
                transition hover:bg-muted
              "
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              aria-label="Scroll right"
              onClick={() => scroll("right")}
              className="
                rounded-full border bg-background p-2
                transition hover:bg-muted
              "
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Category rail */}
        <div
          ref={scrollRef}
          className="
            flex gap-4
            overflow-x-auto
            scroll-smooth
            snap-x snap-mandatory
            pb-3
            scrollbar-none
          "
        >
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href="/shop"
                className="
                  snap-start shrink-0
                  flex items-center gap-4
                  rounded-2xl border
                  bg-background/95
                  px-5 py-4
                  transition-all duration-300
                  hover:border-primary/40
                  hover:-translate-y-0.5
                  hover:shadow-sm
                "
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div className="leading-tight">
                  <p className="text-sm md:text-base font-medium">{cat.name}</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    {cat.count} products
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
