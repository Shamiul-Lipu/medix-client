import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Truck,
  ShieldCheck,
  CreditCard,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import MainLogo from "@/components/ui/mainLogo";

export function Footer() {
  return (
    <footer className="border-t bg-muted/20">
      {/* Features */}
      <div className="border-b">
        <div className="container-wide mx-auto py-10">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Truck, title: "Free Shipping", desc: "Orders over $50" },
              { icon: ShieldCheck, title: "Secure", desc: "100% protected" },
              {
                icon: CreditCard,
                title: "Easy Returns",
                desc: "30-day policy",
              },
              { icon: Phone, title: "24/7 Support", desc: "Here to help" },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="container-wide mx-auto py-14">
        <div className="grid gap-10 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center">
              <MainLogo />
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Trusted online pharmacy delivering quality medicines and
              healthcare products — licensed, certified, and reliable.
            </p>

            {/* Newsletter */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Newsletter</p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="h-10 bg-background"
                />
                <Button size="sm">Subscribe</Button>
              </div>
              <p className="text-xs text-muted-foreground">
                No spam. Just offers & health tips.
              </p>
            </div>

            {/* Contact */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>1-800-Medix</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>help@medix.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Medical City, USA</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Shop",
              links: [
                ["All Products", "/products"],
                ["Prescription", "/products?prescription=true"],
                ["Vitamins", "/products?category=vitamins"],
                ["Personal Care", "/products?category=personal-care"],
                ["Devices", "/products?category=devices"],
              ],
            },
            {
              title: "Support",
              links: [
                ["Help Center", "/help"],
                ["Contact", "/contact"],
                ["FAQs", "/faq"],
                ["Shipping", "/shipping"],
                ["Returns", "/returns"],
              ],
            },
            {
              title: "Company",
              links: [
                ["About", "/about"],
                ["Careers", "/careers"],
                ["Blog", "/blog"],
                ["Press", "/press"],
                ["Partners", "/partners"],
              ],
            },
            {
              title: "Legal",
              links: [
                ["Privacy", "/privacy"],
                ["Terms", "/terms"],
                ["Cookies", "/cookies"],
                ["License", "/license"],
              ],
            },
          ].map((group) => (
            <div key={group.title} className="lg:justify-self-center text-left">
              <h4 className="mb-4 text-sm font-medium uppercase tracking-wide">
                {group.title}
              </h4>
              <ul className="space-y-2">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Bottom */}
      <div className="container-wide mx-auto py-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Medix
          </p>

          <div className="flex items-center gap-4">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <Link
                key={i}
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon className="h-5 w-5" />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Payments:</span>
            {["Visa", "Mastercard", "PayPal", "Amex"].map((p) => (
              <span key={p} className="rounded-md border px-2 py-1 text-[11px]">
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
