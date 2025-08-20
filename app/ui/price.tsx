import React from "react";
import styles from "@/app/css/Price.module.css";
import { calculateDays } from "../lib/utils";

export default function Price({ price, priceSale, created }) {
  const sale = price !== priceSale;

  //   console.log(created);
  const productAge = calculateDays(created);
  console.log(productAge);

  return (
    <div className={styles.priceContainer}>
      {sale ? (
        <>
          <div className={styles.price}>
            <span className={styles.currency}>$</span>
            {priceSale}
            <span className={styles.priceWas}>was ${price}</span>
          </div>
        </>
      ) : (
        <div className={styles.price}>${price}</div>
      )}
      {sale && <div className={styles.clearance}>Clearance</div>}
      {productAge < 40 && <div className={styles.new}>Just landed</div>}
    </div>
  );
}
