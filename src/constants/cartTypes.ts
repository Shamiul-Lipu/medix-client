export interface CartItem {
  customerId?: string;
  medicineId: string;
  name: string;
  manufacturer: string;
  price: number;
  quantity: number;
  imageUrl: string;
  maxQuantity: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addToCart: (
    item: Omit<CartItem, "id" | "quantity"> & { quantity?: number },
  ) => void;
  updateQuantity: (medicineId: string, quantity: number) => void;
  removeFromCart: (medicineId: string) => void;
  clearCart: () => void;
  isLoading: boolean;
}
