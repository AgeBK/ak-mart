"use client";

import React, { use } from "react";
import Link from "next/link";
import Carousel from "./carousel";
import { CategoryProps, ItemsProps, SubLevelProps } from "../lib/definitions";
import { getSubLevels, hyphenate } from "../lib/utils";
import styles from "@/app/css/Category.module.css";
import ImgFill from "./image-responsive";

export default function Category({ promise, level, subLevel }: CategoryProps) {
  const data = use(promise);

  if (data) {
    console.log(data);
    let subLevelObj: SubLevelProps | undefined = {};
    if (subLevel) {
      subLevelObj = getSubLevels(data, subLevel, location.pathname);
    }
    console.log(subLevelObj);

    return (
      <div className={styles.container}>
        <h1>{level}</h1>
        <Carousel data={subLevelObj} />
        <div className={styles.items}>
          {data?.map((val) => {
            const {
              id,
              descriptionId,
              apn,
              clearance,
              colour,
              colourOther,
              colourOther2,
              colourSecondary,
              image,
              imagesOther,
              itemGroup,
              itemName,
              level0,
              level1,
              level2,
              level3,
              level4,
              levels,
              parent,
              price,
              priceSale,
              relatedItems,
              sizes,
              stock,
              title,
              description,
              material,
              features,
              fit,
              care,
            } = val;

            console.log(description);

            const link = `/${level1}/${level2}/${level3}/${level4}/${id}`;
            return (
              <div className={styles.item} key={apn}>
                <Link href={link}>
                  <ImgFill
                    imgSrc={image}
                    imgAlt={itemName}
                    imgStyle="category"
                  />
                  <div>{itemName}</div>{" "}
                  {priceSale ? (
                    <div className={styles.price}>{priceSale}</div>
                  ) : (
                    <div className={styles.priceWas}>was{price}</div>
                  )}
                  <div className={styles.price}>{price}</div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <h1>No items found for {level}.</h1>; // TODO: Improve this error message
  }
}

// {subLevelObj && Object.keys(subLevelObj).length > 0 && (
//   <div className={styles.subLevels}>
//     {Object.entries(subLevelObj).map(([key, value]) => (
//       <div className={styles.subLevelItem} key={key}>
//         <div className={styles.subLevelInner}>
//           <Link href={value.link}>
//             <ImgFill
//               imgSrc={value.image}
//               imgAlt={key}
//               imgStyle="categorySub"
//             />
//             <span>{key}</span>
//           </Link>
//         </div>
//       </div>
//     ))}
//   </div>
// )}
