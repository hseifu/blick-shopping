import { create } from "zustand";

export interface ShoppingItem {
  _id: string;
  name: string;
  bought: boolean;
  createdAt: Date;
}

interface ShoppingStore {
  items: ShoppingItem[];
  isLoading: boolean;
  error: string | null;
  fetchItems: () => Promise<void>;
  addItem: (name: string) => Promise<void>;
  toggleBought: (id: string, bought: boolean) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
}

const API_URL = import.meta.env.VITE_API_URL;

export const useShoppingStore = create<ShoppingStore>((set, get) => ({
  items: [],
  isLoading: false,
  error: null,

  fetchItems: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await fetch(`${API_URL}/items`);
      if (!response.ok)
        throw new Error(`Failed to fetch items ${response.statusText}`);
      const data = await response.json();
      set({ items: data, isLoading: false });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  addItem: async (name: string) => {
    set({ error: null });
    try {
      const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to add item");
      }

      const newItem = await response.json();
      set({ items: [newItem, ...get().items] });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    }
  },

  toggleBought: async (id: string, bought: boolean) => {
    set({ error: null });
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bought }),
      });

      if (!response.ok) throw new Error("Failed to update item");

      const updatedItem = await response.json();
      set({
        items: get().items.map((item) =>
          item._id === id ? updatedItem : item
        ),
      });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  deleteItem: async (id: string) => {
    set({ error: null });
    try {
      const response = await fetch(`${API_URL}/items/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete item");

      set({ items: get().items.filter((item) => item._id !== id) });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
