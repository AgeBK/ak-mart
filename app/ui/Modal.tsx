"use client";

import React, { useState } from "react";
import Img from "./image";
import {
  CartItemProps,
  KeyNumberProps,
  PurchaseItemProps,
} from "../lib/definitions";
// import { addToCart, getCart, storeCart } from "../lib/utils";
import useCartStore from "../store"; // Adjust path if needed
import styles from "@/app/css/Modal.module.css";

export default function Modal({
  id,
  itemName,
  colour,
  image,
  price,
  priceSale,
  stock,
}: PurchaseItemProps) {
  const [toggleModal, setToggleModal] = useState(false);
  const [size, setSize] = useState(0);
  const { cart, addItem } = useCartStore();


  const handleAddItem = () => {
    setToggleModal(!toggleModal);
    setSize(0);
  };

  const handleSize = (e, size: number) => {
    console.log(size);
    setSize(size);
  };

  const handlePropagation = (e) => e.stopPropagation();

  const handleCart = (e) => {
    setToggleModal(!toggleModal);
    const cost = priceSale || price;
    console.log(typeof cost);

    addItem({ id, itemName, colour, image, cost, size });
  };

  return toggleModal ? (
    <section className={styles.modal} onClick={handleAddItem}>
      <div className={styles.modalInner} onClick={handlePropagation}>
        <div className={styles.imgCont}>
          <Img
            imgSrc={image}
            imgAlt={itemName}
            imgWidth={150}
            imgHeight={150}
            imgPriority={true}
          />
        </div>
        <div className={styles.details}>
          <h3 className={styles.itemName}>{itemName}</h3>
          <div className={styles.close} onClick={handleAddItem}>
            &times;
          </div>
          <div className={styles.price}>${priceSale || price}</div>
          <h4 className={styles.sizes}>Sizes</h4>
          {stock.map(({ size: s, amount }: KeyNumberProps) => (
            <button
              className={`${styles.add} ${amount === 0 && styles.noStock} ${
                size === s && styles.selected
              }`}
              disabled={amount === 0}
              onClick={(e) => handleSize(e, s)}
              key={s}
            >
              {s}
            </button>
          ))}
          <div className={styles.cart}>
            <button
              onClick={handleCart}
              className={size > 0 ? styles.notEmpty : styles.empty}
              disabled={!size}
            >
              {size === 0 ? "Select size" : "Add to cart"}
            </button>
          </div>
        </div>
      </div>
    </section>
  ) : (
    <button className={styles.cartMini} onClick={handleAddItem}>
      <Img
        imgSrc={"cartMini.png"}
        imgAlt="AK Mart"
        imgWidth={24}
        imgHeight={24}
        imgPriority={true}
      />
    </button>
  );
}
