import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Truck, Star } from "lucide-react";
import React from "react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pharmacy-teal-light via-background to-pharmacy-coral-light">
      {/* Background blobs */}
      <div className="absolute -top-32 -right-32 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute -bottom-32 -left-32 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-3xl" />

      <div className="container-wide relative py-20 md:py-28">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/60 px-4 py-1.5 text-sm font-medium backdrop-blur">
              <ShieldCheck className="h-4 w-4 text-primary" />
              Licensed & verified pharmacy
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Smarter healthcare,
              <br />
              <span className="text-primary">delivered to you</span>
            </h1>

            <p className="mt-6 max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-muted-foreground">
              Order genuine medicines, wellness products, and prescriptions from
              a trusted pharmacy fast delivery, expert support, zero hassle.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="h-12 px-8 gap-2">
                Order Medicines
                <ArrowRight className="h-4 w-4" />
              </Button>

              <Button size="lg" variant="outline" className="h-12 px-8">
                Upload Prescription
              </Button>
            </div>

            {/* Trust stats */}
            <div className="mt-10 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
              <Stat
                icon={<Star className="h-5 w-5" />}
                title="4.9/5"
                subtitle="50k+ reviews"
              />
              <Stat
                icon={<Truck className="h-5 w-5" />}
                title="24–48h"
                subtitle="Fast delivery"
              />
              <Stat
                icon={<ShieldCheck className="h-5 w-5" />}
                title="100%"
                subtitle="Authentic meds"
              />
            </div>
          </div>

          {/* Right visual */}
          <div className="relative hidden lg:block">
            <div className="relative aspect-square overflow-hidden rounded-3xl">
              {/* Soft base gradient */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/10 to-transparent" />

              {/* Radial glow */}
              <div className="absolute inset-0">
                <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
              </div>

              {/* Subtle grid texture */}
              <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  color: "var(--primary)",
                }}
              />

              {/* Floating pills (decorative) */}
              <div className="absolute left-16 top-20 h-14 w-28 rotate-12 rounded-full bg-primary/30 blur-sm" />
              <div className="absolute right-20 top-40 h-12 w-24 -rotate-12 rounded-full bg-secondary/30 blur-sm" />
              <div className="absolute bottom-24 left-1/2 h-10 w-20 -translate-x-1/2 rotate-6 rounded-full bg-primary/20 blur-sm" />

              {/* Feature cards */}
              <FeatureCard
                className="top-10 left-10"
                emoji="💊"
                title="10,000+ Products"
                desc="Medicines & wellness"
              />

              <FeatureCard
                className="top-1/2 right-8"
                emoji="👨‍⚕️"
                title="24/7 Pharmacists"
                desc="Expert guidance"
              />

              <FeatureCard
                className="bottom-12 left-1/3"
                emoji="🚚"
                title="Free Delivery"
                desc="On eligible orders"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

const Stat = ({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) => (
  <div className="rounded-xl bg-background/70 backdrop-blur border p-4 text-center">
    <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
      {icon}
    </div>
    <p className="text-sm font-semibold">{title}</p>
    <p className="text-xs text-muted-foreground">{subtitle}</p>
  </div>
);

const FeatureCard = ({
  emoji,
  title,
  desc,
  className,
}: {
  emoji: string;
  title: string;
  desc: string;
  className?: string;
}) => (
  <div
    className={`absolute ${className} w-56 rounded-2xl bg-background p-4 shadow-soft animate-in fade-in slide-in-from-bottom-4 duration-700`}
  >
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-xl">
        {emoji}
      </div>
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
    </div>
  </div>
);
