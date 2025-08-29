"use client";

import React, { ChangeEvent } from "react";
import { FilterListProps } from "../lib/definitions";
import { capitalizeFirstLetter } from "../lib/utils";
import styles from "@/app/css/Filter.module.css";

export default function FilterList({
  data,
  filter,
  setFilters,
}: FilterListProps) {
  console.log("FilterList");
  console.log(data);
  console.log(filter);

  const updateFilter = ({
    target: { id, value },
  }: ChangeEvent<HTMLInputElement>) => {
    setFilters({ [id]: value });
  };

  return (
    <details>
      <summary>{capitalizeFirstLetter(filter)}</summary>
      <ul className={styles.list}>
        {Object.entries(data).map(([key, val]: [string, number]) => (
          <li key={key}>
            <input
              type="radio"
              id={filter}
              name={filter}
              value={key}
              onChange={updateFilter}
            />
            <label htmlFor={filter}>
              <span>{key}</span> <span>({val})</span>
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
}

// const filterOpts = data.reduce(
//   (acc, val) => {
//     const { colour, price, sizes } = val;

//     if (acc.colours.indexOf(colour) === -1) {
//       acc.colours.push(colour);
//       acc.coloursNumbers.push({ [colour]: 1 });
//     }

//     if (acc.colours.indexOf(colour) > -1) {
//       acc.coloursNumbers[colour] += 1;
//     }
//     return acc;
//   },
//   { colours: [], coloursNumbers: [] }
// );
// console.log(filterOpts);
