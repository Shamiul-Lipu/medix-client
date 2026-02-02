"use client";

import { z } from "zod";
import { useEffect } from "react";
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface CategoryPayload {
  name: string;
  description?: string;
  isActive: boolean;
}

export interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (payload: CategoryPayload) => Promise<void>;
  category?: CategoryPayload | null;
}

const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string(),
  isActive: z.boolean(),
});

export default function CategoryDialog({
  open,
  onOpenChange,
  onSubmit,
  category,
}: CategoryDialogProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      isActive: true,
    },
    validators: {
      onSubmit: categorySchema,
    },
    onSubmit: async ({ value }) => {
      await onSubmit(value);
    },
  });

  useEffect(() => {
    if (!open) return;

    if (category) {
      form.reset({
        name: category.name,
        description: category.description ?? "",
        isActive: category.isActive,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        isActive: true,
      });
    }
  }, [category, open, form]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-lg font-semibold">
            {category ? "Edit Category" : "Add New Category"}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            {category
              ? "Update the category details below."
              : "Create a new category to organize your products."}
          </DialogDescription>
        </DialogHeader>

        {/* Form */}
        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="px-6 py-4 space-y-6"
        >
          {/* Name */}
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;

              return (
                <div className="space-y-1.5">
                  <Label htmlFor={field.name}>Category name</Label>
                  <Input
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Pain Relief"
                  />
                  {isInvalid && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]?.message}
                    </p>
                  )}
                </div>
              );
            }}
          />

          {/* Description */}
          <form.Field
            name="description"
            children={(field) => (
              <div className="space-y-1.5">
                <Label htmlFor={field.name}>Description</Label>
                <Textarea
                  id={field.name}
                  value={field.state.value ?? ""}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Short description for internal use..."
                  className="resize-none"
                  rows={4}
                />
                <p className="text-xs text-muted-foreground">
                  Optional. Helps admins understand the category.
                </p>
              </div>
            )}
          />

          {/* Active */}
          <form.Field
            name="isActive"
            children={(field) => (
              <div className="flex items-center gap-3 rounded-lg border p-3">
                <input
                  type="checkbox"
                  checked={field.state.value}
                  onChange={(e) => field.handleChange(e.target.checked)}
                  className="h-4 w-4"
                />
                <div className="space-y-0.5">
                  <Label className="cursor-pointer">Active category</Label>
                  <p className="text-xs text-muted-foreground">
                    Inactive categories won’t appear in selection lists.
                  </p>
                </div>
              </div>
            )}
          />
        </form>

        {/* Footer */}
        <DialogFooter className="px-6 py-4 border-t bg-muted/50">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="category-form">
            {category ? "Update" : "Create"} category
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
