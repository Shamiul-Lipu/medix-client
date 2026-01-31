"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { getSession } from "@/actions/user.action";
import { createOrder } from "@/actions/order.actions";

interface OrderSheetProps {
  cartItems: {
    medicineId: string;
    quantity: number;
  }[];
}

export default function OrderSheet({ cartItems }: OrderSheetProps) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      shippingName: "",
      shippingPhone: "",
      shippingAddress: "",
      notes: "",
    },
    // validators: {
    //   onSubmit: orderSchema,
    // },
    onSubmit: async ({ value }) => {
      if (cartItems.length === 0) {
        toast.error("Your cart is empty");
        return;
      }

      const toastId = toast.loading("Placing order...");

      try {
        const { data } = await getSession();
        const user = data.user;

        if (!user?.id) {
          throw new Error("Unauthorized");
        }

        await createOrder({
          items: cartItems,
          shippingName: value.shippingName,
          shippingPhone: value.shippingPhone,
          shippingAddress: value.shippingAddress,
          notes: value.notes || undefined,
        });

        toast.success("Order placed successfully", { id: toastId });

        setOpen(false);
        form.reset();
      } catch (err: any) {
        toast.error(err?.message || "Failed to place order", {
          id: toastId,
        });
      }
    },
  });

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="w-full h-12 text-lg font-semibold">
          Checkout
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetHeader>
        <SheetTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5" />
          Shipping Information
        </SheetTitle>

        <SheetDescription>
          Enter your delivery details to place the order.
        </SheetDescription>
      </SheetHeader>

      <SheetContent className="sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shipping Information
          </SheetTitle>
        </SheetHeader>

        <form
          className="mt-6"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Full Name */}
            <form.Field name="shippingName">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Phone */}
            <form.Field name="shippingPhone">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Address */}
            <form.Field name="shippingAddress">
              {(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>
                      Shipping Address
                    </FieldLabel>
                    <Textarea
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            </form.Field>

            {/* Notes */}
            <form.Field name="notes">
              {(field) => (
                <Field>
                  <FieldLabel htmlFor={field.name}>Notes (optional)</FieldLabel>
                  <Textarea
                    id={field.name}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* Submit */}
            <Field>
              <Button
                type="submit"
                className="w-full h-12 text-lg"
                disabled={form.state.isSubmitting}
              >
                Confirm Order
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </SheetContent>
    </Sheet>
  );
}
