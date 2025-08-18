import { ItemsProps, SubLevelProps } from "./definitions";
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

export {
  capitalizeFirstLetter,
  hyphenate,
  deHyphenate,
  camelise,
  cameliseArr,
  deCamelise,
  getSubLevels,
};
