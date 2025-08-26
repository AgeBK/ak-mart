"use client";

import React, { useState } from "react";
import Img from "./image";
// import { CartItemProps, KeyNumberProps } from "../lib/definitions";
// import { getCart, storeCart } from "../lib/utils";
import useStore from "../store";
import styles from "@/app/css/Cart.module.css";
import { CartItemProps, CartProps } from "../lib/definitions";

export default function Cart() {
  console.log("Cart");

  const [toggleModal, setToggleModal] = useState(false);
  const [size, setSize] = useState(0);
  const { total, cart, incQty, decQty, deleteItem, cartItems, items } =
    useStore();

  console.log(cart);
  console.log(cartItems);
  console.log(total, items);

  const handleClick = (e) => setToggleModal(!toggleModal);

  const handlePropagation = (e) => e.stopPropagation();

  return toggleModal ? (
    <section className={styles.modal} onClick={handleClick}>
      <div className={styles.modalInner} onClick={handlePropagation}>
        <div className={styles.close} onClick={handleClick}>
          &times;
        </div>
        <h1 className={styles.hdr}>
          Your cart{" "}
          <span>
            ({items} {items === 1 ? "item" : "items"})
          </span>
        </h1>
        <div className={styles.cartCont}>
          {Object.entries(cart).map(
            ([key, { id, itemName, colour, image, cost, size, qty }]) => (
              <div key={id} className={styles.cartItem}>
                <div className={styles.imgCont}>
                  <Img
                    imgSrc={image}
                    imgAlt={itemName}
                    imgWidth={80}
                    imgHeight={80}
                    imgPriority={true}
                  />
                </div>
                <div className={styles.details}>
                  <h3 className={styles.itemName}>{itemName}</h3>
                  <div className={styles.close} onClick={handleClick}>
                    &times;
                  </div>
                  <div className={styles.colour}>
                    <b>Colour:</b>
                    {colour}
                  </div>
                  <div className={styles.size}>
                    <b>Size:</b>
                    {size}
                  </div>
                  <div className={styles.btns}>
                    <button
                      className={styles.cartMini}
                      onClick={() => decQty(key)}
                    >
                      -
                    </button>
                    <span className={styles.qty}>{qty}</span>
                    <button
                      className={styles.cartMini}
                      onClick={() => incQty(key)}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className={styles.priceCont}>
                  <div className={styles.price}>${cost}</div>
                  <button
                    className={styles.cartMini}
                    onClick={() => deleteItem(key)}
                  >
                    <Img
                      imgSrc="trash2.png"
                      imgAlt="delete"
                      imgWidth={30}
                      imgHeight={30}
                      // imgPriority={true}
                    />
                  </button>
                </div>
              </div>
            )
          )}
        </div>
        <div className={styles.total}>
          <span>Total:</span>
          <span>${total}</span>
        </div>
        <div className={styles.options}>
          <button className={styles.cartMini} onClick={handleClick}>
            Keep Shopping
          </button>
          <button className={styles.cartMini} onClick={handleClick}>
            Checkout
          </button>
        </div>
      </div>
    </section>
  ) : (
    <div className={styles.bagCont}>
      <button className={styles.cartMini} onClick={handleClick}>
        <div className={styles.itemCount}>{items}</div>
        <Img
          imgSrc={"bagEmpty.png"}
          imgAlt="cart"
          imgWidth={34}
          imgHeight={34}
          imgPriority={true}
        />
        <Img
          imgSrc={"bagNotEmpty.png"}
          imgAlt="cart"
          imgWidth={34}
          imgHeight={34}
          imgPriority={true}
        />
      </button>
    </div>
  );
}

//   const addToCart = () => {
//     const cost = priceSale || price;
//     const cartObj = {
//       id,
//       itemName,
//       image,
//       cost,
//       size,
//       qty: 1,
//     };
//     console.log(cartObj);

//     storeCart(cartObj);
//   };

// const handleCart = () => {
//   const cost = priceSale || price;
//   // addToCart(id, itemName, colour, image, cost, size, 1);
//   addItem({ id, itemName, colour, image, cost, size });
// };

//   const handleSize = (e, size: number) => {
//   e.stopPropagation();
//   console.log(size);
//   setSize(size);
// };
