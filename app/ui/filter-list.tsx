"use client";

import React, { useState } from "react";
import Range from "./range";
import FilterItems from "./filter-items";
import { ItemsProps, KeyNumberProps } from "../lib/definitions";
import styles from "@/app/css/Filter.module.css";

interface FilterProps {
  data: ItemsProps[];
  filters: any;
  setFilters: (filters: any) => void; // Define the type of filters if known
}

export default function FilterList({ data, filters, setFilters }: FilterProps) {
  const [toggle, setToggle] = useState(false);
  console.log(data);

  // const filterOptions: { [key: string]: KeyNumberProps } = data.reduce(
  const filterOptions = data.reduce(
    (acc, { colour, price, stock }) => {
      acc.colours[colour] = (acc.colours[colour] || 0) + 1;

      stock.forEach((val: KeyNumberProps) => {
        const { size, amount } = val;
        if (amount) {
          acc.sizes[size] = (acc.sizes[size] || 0) + 1;
        }
      });

      if (acc.prices.max < price) acc.prices.max = price;

      return acc;
    },
    { colours: {}, sizes: {}, prices: { min: 0, max: 0 } }
  );
  console.log("filterOptions");
  console.log(filterOptions);

  const handleFilter = () => {
    setToggle(!toggle);
  };

  const handleClick = () => setToggle(!toggle);

  const handlePropagation = (e) => e.stopPropagation();

  return toggle ? (
    <div className={styles.filters}>
      <div className={styles.filtersInner} onClick={handlePropagation}>
        <div className={styles.head}>
          <h2 className={styles.hdr}>Filter</h2>
          <span className={styles.close} onClick={handleClick}>
            &times;
          </span>
        </div>
        <div className={styles.filterCont}>
          <FilterItems
            data={filterOptions.colours}
            filter="colour"
            filters={filters}
            setFilters={setFilters}
          />
          <FilterItems
            data={filterOptions.sizes}
            filter="size"
            filters={filters}
            setFilters={setFilters}
          />
          {/* <FilterItems
            data={filterOptions.sizes}
            filter="size"
            setFilters={setFilters}
          /> */}
          <Range priceData={filterOptions.prices} setFilters={setFilters} />
        </div>
      </div>
    </div>
  ) : (
    <button className={styles.btn} onClick={handleFilter}>
      Filter
    </button>
  );
}
