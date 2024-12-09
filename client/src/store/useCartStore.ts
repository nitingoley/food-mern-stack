import { CarrtState } from "@/types/cartTypes";
import { MenuItem } from "@/types/resturantTypes";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useCartStore = create<CarrtState>()(
  persist(
    (set) => ({
      cart: [],
      addToCart: (Item: MenuItem) => {
        set((state) => {
          const existingItem = state.cart.find(
            (cartItem) => cartItem._id === Item._id
          );

          if (existingItem) {
            // here the item already added into the cart now incremnet the quantity of item
            return {
              cart: state?.cart.map((cartItem) =>
                cartItem._id === Item._id
                  ? { ...cartItem, quantity: cartItem.quantity + 1 }
                  : cartItem
              ),
            };
          } else {
            return {
              cart: [...state.cart, { ...Item, quantity: 1 }],
            };
          }
        });
      },
      clearCart: () => {
        set({ cart: [] });
      },
      removeFromTheCart: (id: string) => {
        set((state) => ({
          cart: state.cart.filter((item) => item._id !== id),
        }));
      },
      incrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id ? { ...item, quantity: item.quantity + 1 } : item
          ),
        }));
      },
      decrementQuantity: (id: string) => {
        set((state) => ({
          cart: state.cart.map((item) =>
            item._id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        }));
      },
    }),
    {
      name: "cart-name",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
