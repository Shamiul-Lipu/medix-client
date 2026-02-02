"use client";

import React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface Medicine {
  id: string;
  name: string;
  manufacturer: string;
  category: string;
  price: number;
  stock: number;
  dosageForm: string;
  strength: string;
  isActive: boolean;
}

interface MedicineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (medicine: Medicine) => void;
  medicine?: Medicine | null;
  categories: string[];
}

export default function MedicineDialog({
  open,
  onOpenChange,
  onSubmit,
  medicine,
  categories,
}: MedicineDialogProps) {
  const [formData, setFormData] = useState<Medicine>({
    id: "",
    name: "",
    manufacturer: "",
    category: "",
    price: 0,
    stock: 0,
    dosageForm: "",
    strength: "",
    isActive: true,
  });

  useEffect(() => {
    if (medicine) {
      setFormData(medicine);
    } else {
      setFormData({
        id: "",
        name: "",
        manufacturer: "",
        category: "",
        price: 0,
        stock: 0,
        dosageForm: "",
        strength: "",
        isActive: true,
      });
    }
  }, [medicine, open]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [name]:
        type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckChange = (checked: boolean) => {
    setFormData({ ...formData, isActive: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.manufacturer || !formData.category) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {medicine ? "Edit Medicine" : "Add New Medicine"}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            {medicine
              ? "Update the medicine details below."
              : "Fill in the details to add a new medicine to your inventory."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-slate-300">
                Medicine Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Aspirin"
                className="bg-slate-700/50 border-slate-600 text-white"
                required
              />
            </div>

            {/* Manufacturer */}
            <div className="space-y-2">
              <Label htmlFor="manufacturer" className="text-slate-300">
                Manufacturer *
              </Label>
              <Input
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                placeholder="e.g., Bayer"
                className="bg-slate-700/50 border-slate-600 text-white"
                required
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category" className="text-slate-300">
                Category *
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleSelectChange("category", value)}
              >
                <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price */}
            <div className="space-y-2">
              <Label htmlFor="price" className="text-slate-300">
                Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>

            {/* Stock */}
            <div className="space-y-2">
              <Label htmlFor="stock" className="text-slate-300">
                Stock Quantity
              </Label>
              <Input
                id="stock"
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>

            {/* Dosage Form */}
            <div className="space-y-2">
              <Label htmlFor="dosageForm" className="text-slate-300">
                Dosage Form
              </Label>
              <Input
                id="dosageForm"
                name="dosageForm"
                value={formData.dosageForm}
                onChange={handleChange}
                placeholder="e.g., Tablet"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>

            {/* Strength */}
            <div className="space-y-2">
              <Label htmlFor="strength" className="text-slate-300">
                Strength
              </Label>
              <Input
                id="strength"
                name="strength"
                value={formData.strength}
                onChange={handleChange}
                placeholder="e.g., 500mg"
                className="bg-slate-700/50 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* Active Status */}
          <div className="flex items-center gap-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                handleCheckChange(checked as boolean)
              }
              className="border-slate-600"
            />
            <Label htmlFor="isActive" className="text-slate-300 cursor-pointer">
              Active
            </Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="bg-slate-700/50 border-slate-600 text-white hover:bg-slate-600"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              {medicine ? "Update" : "Add"} Medicine
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
