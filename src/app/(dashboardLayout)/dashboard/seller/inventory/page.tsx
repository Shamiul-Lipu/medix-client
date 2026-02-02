"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MedicinesTab from "@/components/layouts/dashboard/seller/MedicineTab";
import CategoriesTab from "@/components/layouts/dashboard/seller/CategoryTab";

export default function InventoryPage() {
  const [activeTab, setActiveTab] = useState("categories");

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 space-y-1">
          <h1 className="text-3xl font-semibold tracking-tight">Inventory</h1>
          <p className="text-sm text-muted-foreground">
            Manage your medicines and categories.
          </p>
        </div>

        {/* Tabs container */}
        <div className="rounded-xl border bg-card">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="categories"
          >
            {/* Tabs nav */}
            <TabsList className="w-full justify-start rounded-none border-b bg-transparent p-0">
              <TabsTrigger
                value="medicines"
                className="rounded-none  border-transparent px-6 py-3 data-[state=active]:bg-amber-50 cursor-pointer hover:bg-amber-50"
              >
                Medicines
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="rounded-none  border-transparent px-6 py-3 data-[state=active]:bg-amber-50 cursor-pointer hover:bg-amber-50"
              >
                Categories
              </TabsTrigger>
            </TabsList>

            {/* Content */}
            <TabsContent value="medicines" className="p-6">
              <MedicinesTab />
            </TabsContent>

            <TabsContent value="categories" className="p-6">
              <CategoriesTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
}
