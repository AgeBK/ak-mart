"use client";

import React, { use } from "react";
import Link from "next/link";
import { SurveyCreatorProps } from "../lib/definitions";
import { hyphenate } from "../lib/utils";
import styles from "@/app/css/Category.module.css";

export default function Category({ promise }: SurveyCreatorProps) {
  const data = use(promise);
  console.log(data);
  const o: Record<string, any> = {};

  data?.forEach(
    (val: {
      level1?: string;
      level2?: string;
      level3?: string;
      level4?: string;
    }) => {
      const { level1, level2, level3, level4 } = val;
      if (level1 && !o[level1]) {
        o[level1] = { [level1]: hyphenate(level1.toLowerCase()) };
      }

      if (level1 && level2 && !o[level1][level2]) {
        o[level1][level2] = {
          [level2]: hyphenate(
            "/" + level1.toLowerCase() + "/" + level2.toLowerCase()
          ),
        };
      }

      if (level1 && level2 && level3 && !o[level1][level2][level3]) {
        o[level1][level2][level3] = {
          [level3]: hyphenate(
            "/" +
              level1.toLowerCase() +
              "/" +
              level2.toLowerCase() +
              "/" +
              level3.toLowerCase()
          ),
        };
      }

      if (
        level1 &&
        level2 &&
        level3 &&
        level4 &&
        !o[level1][level2][level3][level4]
      )
        o[level1][level2][level3][level4] = {
          [level3]: hyphenate(
            "/" +
              level1.toLowerCase() +
              "/" +
              level2.toLowerCase() +
              "/" +
              level3.toLowerCase() +
              "/" +
              level4.toLowerCase()
          ),
        };
    }
  );

  console.log(o);
  console.log(Object.keys(o));

  const recursive = (obj: object, ind?: number | undefined) => (
    <ul className={styles.navBarInner} key={`list${ind}`}>
      {Object.entries(obj).map(([key, val], i) => {
        console.log("key: " + key);
        console.log("val:");
        console.log(val);
        console.log(Object.values(val).length);
        console.log("================");
        console.log("val[key]: " + val[key]);

        return (
          <li key={`item-${i}`}>
            {typeof val === "object" &&
              typeof val[key] === "string" &&
              Object.values(val).length > 1 && (
                <Link href={hyphenate(val[key].toLowerCase())}>{key}::</Link>
              )}
            {typeof val === "object" && Object.values(val).length > 1
              ? recursive(val, i)
              : typeof val === "object" &&
                Object.values(val).length === 1 && (
                  <Link href={hyphenate(Object.values(val).toString())}>
                    {key}
                  </Link>
                )}
            {}
          </li>
        );
      })}
    </ul>
  );

  const elem = recursive(o);

  return (
    <div className={styles.container}>
      <h1>Category</h1>

      {/* <div>nav bar</div>
      <img src="/img/navObj.png" alt="nav object" />

      <nav> {elem}</nav> */}
    </div>
  );
}
