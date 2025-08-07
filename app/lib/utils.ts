import { ItemsProps } from "./definitions";
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

const hyphenate = (str: string | undefined) =>
  typeof str === "string" ? str.toLowerCase().replace(/ /gi, "-") : undefined;

const deHyphenate = (str: string) =>
  typeof str === "string" ? str.toLowerCase().replace(/-/gi, " ") : undefined;

const uploadImg = async (file: Blob, productId: string) => {
  const fileName: string = `${productId}.webp`;
  const formData = new FormData();
  formData.append("file", file, fileName);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (result.success) {
    return true;
  } else {
    console.log("ManageUpload image FAILED");
    return false;
  }
};

const camelise = (product: ItemsProps) => {
  // convert keys names in object from underscore to camel case (from db to React friendly)
  const camelCased = Object.entries(product).reduce((acc, val) => {
    const value = val[1];
    const key = val[0].replace(/_([a-z])/g, (str) => {
      return str[1].toUpperCase();
    });
    acc = { ...acc, [key]: value };
    return acc;
  }, {});
  return camelCased;
};

const cameliseArr = (products: ItemsProps[]) =>
  products.map((val) => camelise(val));

const deCamelise = (s: string) => {
  const result = s.replace(/([A-Z])/g, " $1"); // note: space before $
  return result.charAt(0).toUpperCase() + result.slice(1);
};

export {
  capitalizeFirstLetter,
  hyphenate,
  deHyphenate,
  uploadImg,
  camelise,
  cameliseArr,
  deCamelise,
};
