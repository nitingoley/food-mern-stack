import { MenuItem } from "./resturantTypes";

export interface CartItem extends MenuItem {
  quantity: number;
}

export type CarrtState = {
  cart: CartItem[];
  addToCart: (item: MenuItem) => void;
  clearCart: () => void;
  removeFromTheCart: (id: string) => void;
  incrementQuantity: (id: string) => void;
  decrementQuantity: (id: string) => void;
};
