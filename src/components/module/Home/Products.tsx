import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Heart, ShoppingCart, Star } from "lucide-react";
import Link from "next/link";

const PRODUCTS = [
  {
    id: 1,
    name: "Paracetamol 500mg Tablets",
    brand: "HealthPlus",
    category: "Pain Relief",
    price: 8.99,
    oldPrice: 12.99,
    rating: 4,
    reviews: 234,
    discount: "31% OFF",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop",
  },
  {
    id: 2,
    name: "Vitamin D3 1000IU Softgels",
    brand: "VitaLife",
    category: "Vitamins",
    price: 15.99,
    rating: 4,
    reviews: 567,
    image:
      "https://images.unsplash.com/photo-1550572017-edd951aa8f72?w=400&h=400&fit=crop",
  },
  {
    id: 3,
    name: "Digital Blood Pressure Monitor",
    brand: "MediTech",
    category: "Medical Devices",
    price: 49.99,
    oldPrice: 69.99,
    rating: 4,
    reviews: 189,
    discount: "29% OFF",
    image:
      "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=400&h=400&fit=crop",
  },
  {
    id: 4,
    name: "Omega-3 Fish Oil Capsules",
    brand: "NatureCare",
    category: "Supplements",
    price: 24.99,
    rating: 4,
    reviews: 423,
    image:
      "https://images.unsplash.com/photo-1577401239170-897942555fb3?w=400&h=400&fit=crop",
  },
];

const Products = () => {
  return (
    <>
      {/* Products Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container-wide">
          {/* Header */}
          <div className="mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Our Products</h2>
              <p className="mt-2 text-muted-foreground">
                Quality medicines and healthcare products at the best prices
              </p>
            </div>

            <Link href="/products">
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

            {/* Featured Products */}
            <TabsContent value="featured">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {PRODUCTS.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-border/40 bg-card shadow hover:shadow-lg transition-shadow duration-300"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-t-2xl bg-muted/10">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />

                      {product.discount && (
                        <Badge
                          variant="destructive"
                          className="absolute left-2 top-2 text-[10px] px-2 py-0.5"
                        >
                          {product.discount}
                        </Badge>
                      )}

                      <Button
                        variant="secondary"
                        size="icon"
                        className="absolute right-2 top-2 h-8 w-8 rounded-full opacity-0 shadow-md backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>

                    <CardContent className="p-4 flex flex-col gap-2">
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>{product.category}</span>
                        <span className="text-primary font-medium">
                          {product.brand}
                        </span>
                      </div>

                      <h3 className="font-semibold line-clamp-2 text-foreground">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3.5 w-3.5 ${i < product.rating ? "fill-warning text-warning" : "fill-muted text-muted"}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-muted-foreground">
                          ({product.reviews})
                        </span>
                      </div>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-bold text-foreground">
                          ${product.price}
                        </span>
                        {product.oldPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ${product.oldPrice}
                          </span>
                        )}
                      </div>

                      <Button className="w-full mt-2 gap-2" size="sm">
                        <ShoppingCart className="h-4 w-4" />
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Best Sellers */}
            <TabsContent value="bestsellers">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* You can map a different list of bestsellers here */}
              </div>
            </TabsContent>

            {/* New Arrivals */}
            <TabsContent value="newArrivals">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {/* You can map a different list of new arrivals here */}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
};

export default Products;
