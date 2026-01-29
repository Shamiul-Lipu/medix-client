import MedicineCard from "@/components/layouts/commonLayouts/MedicineCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Medicine } from "@/constants/medicine";
import { medicineService } from "@/service/medicine.service";
import { ArrowRight, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

const Products = async () => {
  const [featuredRes, bestSellerRes, newArrivalRes] = await Promise.all([
    medicineService.getMedicines({
      limit: "4",
      sortBy: "createdAt",
      sortOrder: "desc",
    }),
    medicineService.getMedicines({
      limit: "4",
      sortBy: "stock",
      sortOrder: "desc",
    }),
    medicineService.getMedicines({
      limit: "4",
      sortBy: "createdAt",
      sortOrder: "asc",
    }),
  ]);
  // console.log(featuredRes, bestSellerRes, newArrivalRes);
  const tabData: Record<string, Medicine[]> = {
    featured: featuredRes.data?.data?.data || [],
    bestsellers: bestSellerRes.data?.data?.data || [],
    newArrivals: newArrivalRes.data?.data?.data || [],
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container-wide">
        {/* Header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">
              Our <span className="text-primary">Products</span>{" "}
            </h2>
            <p className="mt-2 text-muted-foreground">
              Quality medicines and healthcare products at the best prices
            </p>
          </div>

          <Link href="/shop">
            <Button variant="outline" className="gap-2">
              View All Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="featured" className="w-full">
          <TabsList className="mb-10 justify-start bg-muted/20 rounded-full p-1 h-11">
            <TabsTrigger value="featured" className="px-6 rounded-full">
              Featured
            </TabsTrigger>
            <TabsTrigger value="bestsellers" className="px-6 rounded-full">
              Best Sellers
            </TabsTrigger>
            <TabsTrigger value="newArrivals" className="px-6 rounded-full">
              New Arrivals
            </TabsTrigger>
          </TabsList>

          {["featured", "bestsellers", "newArrivals"].map((tab) => (
            <TabsContent key={tab} value={tab}>
              {tabData[tab]?.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {tabData[tab].map((medicine) => (
                    <MedicineCard key={medicine.id} medicine={medicine} />
                  ))}
                </div>
              ) : (
                <p className="text-center col-span-4 text-muted-foreground">
                  No products found
                </p>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default Products;
