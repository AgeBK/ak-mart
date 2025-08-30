import React, { useEffect, useRef, useState } from "react";
import MultiRangeSlider, { ChangeResult } from "multi-range-slider-react";
import styles from "@/app/css/Range.module.css";

export default function Range({ priceData, setFilters }) {
  console.log("Range");

  const { min, max } = priceData;
  const [ceilPrice, setCeilPrice] = useState(0);
  const [prices, setPrices] = useState({ min, max });
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(max);
  const firstLoad = useRef<boolean>(true);

  console.log(minValue, maxValue);

  if (prices.min !== minValue || prices.max !== maxValue) {
    setPrices({ min: minValue, max: maxValue });
    setFilters({ price: { minValue, maxValue } });
  }

  useEffect(() => {
    console.log("UEs");
    if (firstLoad.current) {
      setCeilPrice(Math.ceil(max / 5) * 5);
      firstLoad.current = false;
    }
  }, [max]);

  return (
    <div className={styles.container}>
      <details>
        <div className={styles.prices}>
          <span className={styles.min}>
            <b>Min</b>
            <br />${minValue}
          </span>
          <span className={styles.max}>
            <b>Max</b>
            <br />${maxValue}
          </span>
        </div>

        <summary>Price</summary>
        <MultiRangeSlider
          min={0}
          max={ceilPrice}
          step={5}
          stepOnly={true}
          minValue={minValue}
          maxValue={maxValue}
          ruler="false"
          onInput={(e: ChangeResult) => {
            setMinValue(e.minValue);
            setMaxValue(e.maxValue);
          }}
          style={{ border: 0, boxShadow: "none" }}
          // labels={[
          //   "0",
          //   "10",
          //   "20",
          //   "30",
          //   "40",
          //   "50",
          //   "60",
          //   "70",
          //   "80",
          //   "90",
          //   "100",
          // ]}
        />
      </details>
    </div>
  );
}
