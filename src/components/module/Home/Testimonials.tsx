import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const TESTIMONIALS = [
  {
    author: "Sarah Johnson",
    role: "Medix Customer",
    quote:
      "Medix has completely changed how I manage my health. Fast delivery and trusted products.",
    rating: 5,
  },
  {
    author: "Michael Lee",
    role: "Fitness Enthusiast",
    quote:
      "Reliable medicines and great support. I always recommend Medix to my family.",
    rating: 5,
  },
  {
    author: "Ayesha Khan",
    role: "Healthcare Professional",
    quote:
      "Medix provides authentic products with excellent service. Very impressed.",
    rating: 4,
  },
];

export function TestimonialsSection() {
  return (
    <section className="container-wide bg-background py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            What People Say About <span className="text-primary">Medix</span>
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Real experiences from people who trust Medix for their healthcare
            needs.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card
              key={item.author}
              className="relative overflow-hidden border-none shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <Quote className="absolute right-6 top-6 h-12 w-12 text-primary/10" />

              <CardContent className="p-8">
                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "fill-muted text-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="mb-6 text-lg italic leading-relaxed text-foreground/90">
                  “{item.quote}”
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 font-semibold text-primary">
                    {item.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <p className="font-semibold">{item.author}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
