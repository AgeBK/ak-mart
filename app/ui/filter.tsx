"use client";

import React, { useState } from "react";
import Range from "./range";
import FilterList from "./filter-list";
import { ItemsProps, KeyNumberProps } from "../lib/definitions";
import styles from "@/app/css/Filter.module.css";

interface FilterProps {
  data: ItemsProps[];
  setFilters: (filters: any) => void; // Define the type of filters if known
}

export default function Filter({ data, setFilters }: FilterProps) {
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

      if (acc.price.max < price) acc.price.max = price;

      return acc;
    },
    { colours: {}, sizes: {}, price: { min: 0, max: 0 } }
  );
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
          <FilterList
            data={filterOptions.colours}
            filter="colour"
            setFilters={setFilters}
          />
          <FilterList
            data={filterOptions.sizes}
            filter="size"
            setFilters={setFilters}
          />
          <Range data={filterOptions.price} setFilters={setFilters} />
        </div>
      </div>
    </div>
  ) : (
    <button className={styles.btn} onClick={handleFilter}>
      Filter
    </button>
  );
}
