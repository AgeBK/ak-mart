import React from "react";
import Link from "next/link";
import Img from "./image";
import { capitalizeFirstLetter, deHyphenate } from "../lib/utils";
import styles from "@/app/css/Breadcrumb.module.css";

export default function Breadcrumb({ pathname }: { pathname: string }) {
  const path = pathname.split("/");
  let link = "";
  const bcLink = (val: string) => (link = `${link}/${val}`);

  const homeLink = (
    <Link href="/">
      <Img
        imgSrc={"home.png"}
        imgAlt="home"
        imgWidth={14}
        imgHeight={14}
        imgPriority={true}
      />
    </Link>
  );

  return (
    <div className={styles.container}>
      <ul className={styles.breadcrumb}>
        {path.map((val, i) => {
          // first link is home, last value is just the name (no link)
          const pathVal = capitalizeFirstLetter(deHyphenate(val));

          return (
            <li key={val}>
              {i === 0 ? (
                homeLink
              ) : (
                <span>
                  <i className={styles.arrow}></i>
                  {i === path.length - 1 ? (
                    <span>{pathVal}</span>
                  ) : (
                    <Link href={bcLink(val)}>{pathVal}</Link>
                  )}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
