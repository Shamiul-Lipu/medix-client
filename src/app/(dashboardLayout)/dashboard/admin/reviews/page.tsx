import { OrdersSection } from "@/components/layouts/dashboard/admin/OrdersSection";
import { ReviewsSection } from "@/components/layouts/dashboard/admin/ReviewsSection";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, MessageSquare } from "lucide-react";

export default function ReviewsAndOrders() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-semibold text-gray-900">
            Manage orders and reviews
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage orders and reviews
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Reviews
            </TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <OrdersSection />
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <ReviewsSection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
