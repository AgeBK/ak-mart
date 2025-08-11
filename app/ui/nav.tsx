import React, { use } from "react";
import Link from "next/link";
import { NavPromiseProps } from "../lib/definitions";
import { buildNav } from "../lib/nav";
import styles from "@/app/css/Nav.module.css";

export default function Nav({ promise }: NavPromiseProps) {
  const data = use(promise);
  const navObj = buildNav(data);

  const recursive = (obj: object, ind?: number | undefined) => (
    <ul className={styles.navBarInner} key={`list${ind}`}>
      {Object.entries(obj).map(([key, val], i) => {
        // console.log("key: " + key);
        // console.log("val:");
        // console.log(val);
        // console.log(Object.values(val).length);
        // console.log("================");
        // console.log("val[key]: " + val[key]);

        return (
          <li key={`item-${i}`}>
            {typeof val === "object" &&
              typeof val[key] === "string" &&
              Object.values(val).length > 1 &&
              val[key] && (
                <Link href={(val[key] as string).toLowerCase()}>{key}</Link>
              )}
            {typeof val === "object" && Object.values(val).length > 1
              ? recursive(val, i)
              : typeof val === "object" &&
                Object.values(val).length === 1 &&
                typeof Object.values(val)[0] === "string" && (
                  <Link href={(Object.values(val)[0] as string).toLowerCase()}>
                    {key}
                  </Link>
                )}
            {}
          </li>
        );
      })}
    </ul>
  );

  const elem = recursive(navObj);

  return (
    <div className={styles.navBar}>
      <nav>{elem}</nav>
    </div>
  );
}
