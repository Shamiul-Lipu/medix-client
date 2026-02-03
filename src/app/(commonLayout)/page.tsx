import { BentoGrid } from "@/components/module/Home/Bento";
import Categories from "@/components/module/Home/Categories";
import ExpertAdvices from "@/components/module/Home/ExpertAdvices";
import Hero from "@/components/module/Home/Hero";
import { NewsletterSection } from "@/components/module/Home/Newsletter";
import Products from "@/components/module/Home/Products";
import { TestimonialsSection } from "@/components/module/Home/Testimonials";

export default async function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <BentoGrid />
      <Products />
      <ExpertAdvices />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}
