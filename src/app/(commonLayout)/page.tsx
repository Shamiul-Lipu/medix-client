import Categories from "@/components/module/Home/Categories";
import Hero from "@/components/module/Home/Hero";
import Products from "@/components/module/Home/Products";

export default async function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Products />
    </>
  );
}
