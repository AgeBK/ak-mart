import React from "react";
import Link from "next/link";
import { SubLevelProps } from "../lib/definitions";
import ImgResponsive from "./image-responsive";
import styles from "@/app/css/Carousel.module.css";

export default function Carousel({ data }: SubLevelProps) {
  const length = Object.keys(data).length;
  return (
    length > 0 && (
      <ul className={length > 3 ? styles.carousel : styles.noBtns}>
        {Object.entries(data).map(([key, value]) => (
          <li key={key}>
            <div className={styles.carouselItem}>
              <Link href={value.link}>
                <ImgResponsive
                  imgSrc={value.image}
                  imgAlt={key}
                  imgStyle="categorySub"
                />
              </Link>
            </div>
            <div className={styles.title}>{key}</div>
          </li>
        ))}
      </ul>
    )
  );
}
