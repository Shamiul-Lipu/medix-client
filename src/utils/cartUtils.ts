import { CartItem } from "@/constants/cartTypes";

const CART_STORAGE_KEY = "pharma_cart";

/**
 * Generate a storage key per user
 */
export const getStorageKey = (userId?: string): string | null => {
  if (!userId) return null;
  return `${CART_STORAGE_KEY}_${userId}`;
};

/**
 * Load cart from localStorage
 */
export const loadFromLocalStorage = (userId: string): CartItem[] => {
  try {
    const key = getStorageKey(userId);
    if (!key) return [];
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error("Failed to load cart from localStorage:", err);
    return [];
  }
};

/**
 * Save cart to localStorage
 */
export const saveToLocalStorage = (items: CartItem[], userId?: string) => {
  try {
    const key = getStorageKey(userId);
    if (!key) return;
    localStorage.setItem(key, JSON.stringify(items));
  } catch (err) {
    console.error("Failed to save cart to localStorage:", err);
  }
};

/**
 * Clear cart from localStorage
 */
export const clearLocalStorage = (userId?: string) => {
  try {
    const key = getStorageKey(userId);
    if (!key) return;
    localStorage.removeItem(key);
  } catch (err) {
    console.error("Failed to clear cart from localStorage:", err);
  }
};

/**
 * Merge local cart and server cart
 * Local quantities take precedence
 */
export const mergeCartItems = (
  local: CartItem[],
  server: CartItem[],
): CartItem[] => {
  const localArray = Array.isArray(local) ? local : [];
  const serverArray = Array.isArray(server) ? server : [];

  const merged: CartItem[] = [...serverArray];

  localArray.forEach((localItem) => {
    const existing = merged.find((i) => i.medicineId === localItem.medicineId);
    if (existing) {
      // Local quantity takes precedence
      existing.quantity = localItem.quantity;
    } else {
      merged.push(localItem);
    }
  });

  return merged;
};
