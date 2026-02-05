import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="container-wide py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-primary to-primary/80 p-8 md:p-12 lg:p-16">
          {/* Decorative blobs */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10" />
          <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-white/5" />

          <div className="relative mx-auto max-w-2xl text-center text-primary-foreground">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/20">
              <Mail className="h-6 w-6" />
            </div>

            <h2 className="mb-4 text-3xl font-bold md:text-4xl">
              Stay Healthy with Medix
            </h2>

            <p className="mb-8 text-primary-foreground/80">
              Get health tips, exclusive offers, and updates from Medix. No
              spam—just care.
            </p>

            <form className="flex flex-col gap-3 sm:flex-row">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                className="h-12 flex-1 border-white/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/60 focus-visible:ring-white/30"
              />
              <Button
                size="lg"
                className="h-12 bg-secondary px-8 text-secondary-foreground hover:bg-secondary/80"
              >
                Subscribe
              </Button>
            </form>

            <p className="mt-4 text-xs text-primary-foreground/60">
              You can unsubscribe anytime. Privacy respected.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
