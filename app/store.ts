import { create } from "zustand";
import { storeCart, getCart, addToCart, cartPriceQty } from "./lib/utils";
import { CartItemProps, CartProps, CartStateProps } from "./lib/definitions";

const useCartStore = create<{
  cart: CartProps;
  addItem: (item: CartItemProps) => void;
  get: () => void;
  total: number;
  items: number;
  incQty: (id: number) => void;
  decQty: (id: number) => void;
  deleteItem: (id: number) => void;
}>((set) => ({
  cart: {},
  total: 0,
  items: 0,
  addItem: (item: CartItemProps): void => {
    set((state) => {
      const { id, itemName, colour, image, cost, size } = item;
      const cart = addToCart(
        state.cart,
        id,
        itemName,
        colour,
        image,
        cost,
        size,
        1
      );
      const { total, items } = cartPriceQty(cart);
      return { cart, total, items };
    });
  },
  get: (): void => {},
  incQty: (id: number) =>
    set(({ cart }) => {
      cart[id].qty += 1;
      const { total, items } = cartPriceQty(cart);
      return { cart, total, items };
    }),
  decQty: (id: number) =>
    set(({ cart }) => {
      cart[id].qty -= 1;
      const { total, items } = cartPriceQty(cart);
      return { cart, total, items };
    }),
  deleteItem: (id: number) =>
    set(({ cart }) => {
      delete cart[id];
      const { total, items } = cartPriceQty(cart);
      return { cart, total, items };
    }),
}));

export default useCartStore;
