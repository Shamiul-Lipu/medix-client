import Image from "next/image";
import { Star, ShieldCheck, Package } from "lucide-react";

import { medicineService } from "@/service/medicine.service";
import { Medicine } from "@/constants/medicine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export async function generateStaticParams() {
  const { data } = await medicineService.getMedicines();

  return data?.data?.data?.map((medicine: Medicine) => ({
    id: medicine.id,
  }));
}

const SingleProductPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await medicineService.getMedicineById(id);
  const medicine = data?.data;

  // console.log(medicine);

  const reviews = medicine?.reviews ?? [];
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((a: number, b: { rating: number }) => a + b.rating, 0) /
        reviews.length
      : 0;

  return (
    <div className="container-wide relative px-1 py-12">
      {/* Top */}
      <div className="grid gap-10 lg:grid-cols-2">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden rounded-xl border bg-muted">
          <Image
            src={medicine?.imageUrl}
            alt={medicine?.name}
            fill
            className="object-contain p-6"
            priority
          />
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <Badge variant="secondary">{medicine?.category?.name}</Badge>
            <h1 className="mt-2 text-3xl font-semibold">{medicine?.name}</h1>
            <p className="text-sm text-muted-foreground">
              Manufactured by {medicine.manufacturer}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(averageRating)
                      ? "fill-primary text-primary"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {reviews.length ? `${reviews.length} reviews` : "No reviews yet"}
            </span>
          </div>

          {/* Price */}
          <p className="text-2xl font-bold">৳ {medicine.price}</p>

          {/* Key facts */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Strength</p>
              <p className="font-medium">{medicine.strength}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Form</p>
              <p className="font-medium capitalize">{medicine.dosageForm}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Stock</p>
              <p
                className={`font-medium ${
                  medicine.stock > 0 ? "text-green-600" : "text-destructive"
                }`}
              >
                {medicine.stock > 0
                  ? `${medicine.stock} available`
                  : "Out of stock"}
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="flex gap-4">
            <Button size="lg" disabled={medicine.stock === 0}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline">
              Buy Now
            </Button>
          </div>

          {/* Trust */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <ShieldCheck className="h-4 w-4" />
            Licensed & verified medicine
          </div>

          {/* Details */}
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="usage">Usage</TabsTrigger>
              <TabsTrigger value="side-effects">Side Effects</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <p className="text-muted-foreground leading-relaxed">
                {medicine.description}
              </p>
            </TabsContent>

            <TabsContent value="usage" className="mt-6">
              <p className="text-muted-foreground leading-relaxed">
                {medicine.usageInstructions}
              </p>
            </TabsContent>

            <TabsContent value="side-effects" className="mt-6">
              <p className="text-muted-foreground leading-relaxed">
                {medicine.sideEffects}
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Separator className="my-12" />

      {/* Reviews */}
      <div className="container-wide relative space-y-6">
        <h2 className="text-2xl font-semibold">Customer Reviews</h2>

        {reviews?.length === 0 ? (
          <div className="rounded-lg border p-6 text-center text-muted-foreground">
            No reviews yet. Be the first to review this medicine.
          </div>
        ) : (
          <div className="space-y-4">
            {reviews?.map(
              (review: { id: string; rating: number; comment?: string }) => (
                <div key={review.id} className="rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review?.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>

                  {review?.comment && (
                    <p className="mt-2 text-sm text-muted-foreground">
                      {review?.comment}
                    </p>
                  )}
                </div>
              ),
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProductPage;
