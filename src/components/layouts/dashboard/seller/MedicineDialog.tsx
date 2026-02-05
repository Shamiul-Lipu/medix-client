"use client";

import { z } from "zod";
import { useEffect, useState } from "react";
import { useForm } from "@tanstack/react-form";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { toast } from "sonner";

import { getCategories } from "@/actions/category.action";
import { Medicine } from "@/service/medicine.service";

export interface MedicineFormValues {
  name: string;
  manufacturer: string;
  categoryId: string;
  price: number;
  stock: number;
  dosageForm: string;
  strength: string;
  isActive: boolean;
}

export interface MedicineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: MedicineFormValues) => Promise<void>;
  medicine?: Medicine | null;
}

const medicineSchema = z.object({
  name: z.string().min(1, "Medicine name is required"),
  manufacturer: z.string().min(1, "Manufacturer is required"),
  categoryId: z.string().min(1, "Category is required"),
  price: z.number().min(0, "Price must be 0 or greater"),
  stock: z.number().int().min(0, "Stock must be 0 or greater"),
  dosageForm: z.string(),
  strength: z.string(),
  isActive: z.boolean(),
});

export default function MedicineDialog({
  open,
  onOpenChange,
  onSubmit,
  medicine,
}: MedicineDialogProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      manufacturer: "",
      categoryId: "",
      price: 0,
      stock: 0,
      dosageForm: "",
      strength: "",
      isActive: true,
    },
    validators: {
      onSubmit: medicineSchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    [],
  );
  const [loadingCategories, setLoadingCategories] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await getCategories(1, 1000);
        if (res.error) throw new Error(res.error.message);
        setCategories(res.data);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Failed to load categories";
        toast.error(message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!open) return;

    if (medicine) {
      form.reset({
        name: medicine.name,
        manufacturer: medicine?.manufacturer,
        categoryId: medicine.category.id,
        price: Number(medicine.price),
        stock: medicine.stock,
        dosageForm: medicine.dosageForm ?? "",
        strength: medicine.strength ?? "",
        isActive: medicine.isActive,
      });
    } else {
      form.reset({
        name: "",
        manufacturer: "",
        categoryId: "",
        price: 0,
        stock: 0,
        dosageForm: "",
        strength: "",
        isActive: true,
      });
    }
  }, [open, medicine, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {medicine ? "Edit Medicine" : "Add New Medicine"}
          </DialogTitle>
          <DialogDescription>
            {medicine
              ? "Update the medicine details below."
              : "Fill in the details to add a new medicine."}
          </DialogDescription>
        </DialogHeader>

        <form
          id="medicine-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Name */}
            <form.Field name="name">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Medicine name</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Manufacturer</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Category */}
            <form.Field name="categoryId">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Category</Label>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                    disabled={loadingCategories}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {field.state.meta.isTouched && !field.state.meta.isValid && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              )}
            </form.Field>

            {/* Price */}
            <form.Field name="price">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Price</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            {/* Stock */}
            <form.Field name="stock">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Stock</Label>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                  />
                </div>
              )}
            </form.Field>

            {/* Dosage Form */}
            <form.Field name="dosageForm">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Dosage form</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            {/* Strength */}
            <form.Field name="strength">
              {(field) => (
                <div className="space-y-1.5">
                  <Label>Strength</Label>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>

          {/* Active */}
          <form.Field name="isActive">
            {(field) => (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <Checkbox
                  checked={field.state.value}
                  onCheckedChange={(v) => field.handleChange(Boolean(v))}
                />
                <Label className="cursor-pointer">Active</Label>
              </div>
            )}
          </form.Field>
        </form>

        <DialogFooter>
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="medicine-form">
            {medicine ? "Update" : "Add"} medicine
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
