import Categories from "@/components/module/Home/Categories";
import ExpertAdvices from "@/components/module/Home/ExpertAdvices";
import Hero from "@/components/module/Home/Hero";
import Products from "@/components/module/Home/Products";

export default async function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
      <ExpertAdvices />
    </>
  );
}
