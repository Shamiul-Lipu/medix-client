import {
  Baby,
  Eye,
  Heart,
  Pill,
  Sparkles,
  Stethoscope,
  Syringe,
  Thermometer,
} from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  {
    name: "Pain Relief",
    icon: <Pill className="h-8 w-8" />,
    desc: "Headaches, body pain & more",
    count: 245,
    color: "bg-primary/10 text-primary hover:bg-primary/20",
  },
  {
    name: "Cold & Flu",
    icon: <Thermometer className="h-8 w-8" />,
    desc: "Cough, cold & fever",
    count: 189,
    color: "bg-info/10 text-info hover:bg-info/20",
  },
  {
    name: "Baby Care",
    icon: <Baby className="h-8 w-8" />,
    desc: "For your little ones",
    count: 312,
    color: "bg-secondary/10 text-secondary hover:bg-secondary/20",
  },
  {
    name: "Heart Health",
    icon: <Heart className="h-8 w-8" />,
    desc: "Cardiovascular care",
    count: 156,
    color: "bg-success/10 text-success hover:bg-success/20",
  },
  {
    name: "Skin Care",
    icon: <Sparkles className="h-8 w-8" />,
    desc: "Healthy & glowing skin",
    count: 423,
    color: "bg-purple-100 text-purple-600 hover:bg-purple-200",
  },
  {
    name: "Vitamins",
    icon: <Syringe className="h-8 w-8" />,
    desc: "Daily supplements",
    count: 267,
    color: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  {
    name: "Eye Care",
    icon: <Eye className="h-8 w-8" />,
    desc: "Vision & eye health",
    count: 134,
    color: "bg-info/10 text-info hover:bg-info/20",
  },
  {
    name: "Medical Devices",
    icon: <Stethoscope className="h-8 w-8" />,
    desc: "Home health equipment",
    count: 89,
    color: "bg-primary/10 text-primary hover:bg-primary/20",
  },
];

const Categories = () => {
  return (
    <>
      {/* Categories Section */}
      <section className="relative overflow-hidden py-16 md:py-24">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

        {/* Radial glow */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-3xl" />

        {/* Subtle grid texture */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)",
            backgroundSize: "32px 32px",
            color: "var(--border)",
          }}
        />

        <div className="container-wide relative">
          {/* Header */}
          <div className="mb-14 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Shop by <span className="text-primary">Category</span>
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Browse our wide range of healthcare products organized by
              category. Find exactly what you need for your health and wellness.
            </p>
          </div>

          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/shop`}
                className={`group relative flex flex-col items-center rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${cat.color}`}
              >
                {/* Hover glow */}
                <span className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-gradient-to-br from-white/30 via-transparent to-transparent" />

                {/* Icon */}
                <div className="relative mb-4 rounded-xl bg-background/80 p-4 backdrop-blur shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                  {cat.icon}
                </div>

                <h3 className="mb-1 font-semibold">{cat.name}</h3>
                <p className="mb-2 text-xs text-muted-foreground">{cat.desc}</p>
                <span className="text-xs text-muted-foreground/70">
                  {cat.count} products
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Categories;
