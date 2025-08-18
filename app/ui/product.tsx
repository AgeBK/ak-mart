import React, { use } from "react";
import styles from "@/app/css/Product.module.css";
import { fetchItemById } from "../lib/data";

export default function Product({ promise }) {
  const data = use(promise);
  console.log(data);

  const {
    id,
    descriptionId,
    apn,
    clearance,
    colour,
    colourOther,
    colourOther2,
    colourSecondary,
    image,
    imagesOther,
    itemGroup,
    itemName,
    level0,
    level1,
    level2,
    level3,
    level4,
    levels,
    parent,
    priceSale,
    price,
    relatedItems,
    sizes,
    stock,
    title,
    description,
    material,
    features,
    fit,
    care,
  } = data;

  return (
    <div>
      {id} - {itemName}
    </div>
  );
}
