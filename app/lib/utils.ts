import {
  CartItemProps,
  CartProps,
  ItemsProps,
  SubLevelProps,
} from "./definitions";
import {} from "@/app/lib/data";

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const capitalizeFirstLetter = (string: string) => {
  // string can be multiple words
  const wordsArr = string
    .split(" ")
    .map((val) => val.charAt(0).toUpperCase() + val.slice(1));
  return wordsArr.join(" ");
};

const hyphenate = (str: string) => str.toLowerCase().replace(/ /gi, "-");

const deHyphenate = (str: string) => str.toLowerCase().replace(/-/gi, " ");

const camelise = (product: ItemsProps) => {
  // convert keys names in object from underscore to camel case (from db to React friendly)
  const camelCased = Object.entries(product).reduce((acc, val) => {
    const value = val[1];
    const key = val[0].replace(/_([a-z])/g, (str) => {
      return str[1].toUpperCase();
    });
    acc = { ...acc, [key]: value };
    return acc as ItemsProps;
  }, {});
  return camelCased;
};

const cameliseArr = (products: ItemsProps[]) =>
  products.map((val) => camelise(val));

const deCamelise = (s: string) => {
  const result = s.replace(/([A-Z])/g, " $1"); // note: space before $
  return result.charAt(0).toUpperCase() + result.slice(1);
};

const getSubLevels = (data: ItemsProps[], level: string, url: string) => {
  // get sub levels from data (eg: get level4 subcategories if level3 data - womens dresses (level3) >> womens mini/maxi/midi dresses (level4))
  const levels = data?.reduce((acc, val) => {
    const levelValue = val[level] as string;
    const lvlItem = levelValue;

    if (lvlItem && !acc[lvlItem]) {
      acc[lvlItem] = {
        link: `${url}/${lvlItem}`,
        image: val.image,
      };
    }
    return acc;
  }, {} as SubLevelProps);
  return levels;
};

const calculateDays = (dt) => {
  const now = new Date();
  const productAdded = new Date(dt);
  const timeDifference = now - productAdded;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return daysDifference;
};

const storeCart = (cart: CartProps) =>
  sessionStorage.setItem("AKmart", JSON.stringify(cart));

const getCart = () => {
  const cart = sessionStorage.getItem("AKmart");
  return cart ? JSON.parse(cart) : null;
};

const addToCart = (
  cart: CartProps,
  id: number,
  itemName: string,
  colour: string,
  image: string,
  cost: number,
  size: number,
  qty: number
) => {
  console.log(cart, id, itemName, colour, image, cost, size, qty);
  let cartObj = {} as CartProps;
  // let cart = getCart() || {};
  // let cart = stateCart;
  const cartId = `${id}_${size}`;
  console.log(cart);
  console.log("cartId: " + cartId);

  if (cart[cartId] && cart[cartId].size === size) {
    // item exists, need to check size for exact match
    cart[cartId].qty += 1;
  } else {
    // new cart item
    cartObj = {
      [cartId]: {
        id,
        itemName,
        colour,
        image,
        cost,
        size,
        qty,
      },
    };
  }

  cart = { ...cart, ...cartObj };

  // storeCart(cart);
  return cart;
};

// const totalCart = (cart: CartProps) =>
//   Object.values(cart as CartProps).reduce((acc, { cost, qty }) => {
//     acc += cost * qty;
//     return acc;
//   }, 0);

const cartPriceQty = (cart: CartProps) =>
  // returns total price of all cart items/counts all cart items
  Object.values(cart as CartProps).reduce(
    (acc, { cost, qty }) => {
      acc.total += cost * qty; // total price
      acc.items += qty; // total items
      return acc;
    },
    { total: 0, items: 0 }
  );

export {
  capitalizeFirstLetter,
  hyphenate,
  deHyphenate,
  camelise,
  cameliseArr,
  deCamelise,
  getSubLevels,
  calculateDays,
  storeCart,
  getCart,
  addToCart,
  // totalCart,
  cartPriceQty,
};
