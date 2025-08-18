"use client";

import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  CategoryProps,
  ItemsProps,
  KeyNumberProps,
  SubLevelProps,
} from "../lib/definitions";
import { getSubLevels, hyphenate } from "../lib/utils";
import ImgFill from "./image-responsive";
import Img from "./image";
import Carousel from "./carousel";
import styles from "@/app/css/Category.module.css";

export default function Category({ promise, level, subLevel }: CategoryProps) {
  const [selectedImg, setSelectedImg] = useState<KeyNumberProps>({});
  const data = use(promise);

  if (data) {
    console.log(data);
    let subLevelObj: SubLevelProps | undefined = {};
    if (subLevel) {
      subLevelObj = getSubLevels(data, subLevel, location.pathname);
    }

    const handleSelected = (id: number, index: number) => {
      const newObj = { ...selectedImg };
      newObj[id] = index;
      setSelectedImg(newObj);
    };

    const checkSelected = (id: number, index: number) => {
      if (selectedImg[id]) {
        if (selectedImg[id] === index) {
          return true;
        }
      } else if (!selectedImg[id] && index === 0) {
        return true;
      }

      return false;
    };

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
              priceSale,
              price,
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
            const link = hyphenate(
              `/${level1}/${level2}/${level3}/${level4}/${id}`
            );

            return (
              <div className={styles.item} key={apn}>
                <Link href={link}>
                  <ImgFill
                    imgSrc={image}
                    imgAlt={itemName}
                    imgStyle="category"
                  />
                  <div className={styles.itemName}>{itemName}</div>
                  {price !== priceSale ? (
                    <>
                      <div className={styles.clearance}>Clearance</div>
                      <div className={styles.price}>
                        <span className={styles.currency}>$</span>
                        {priceSale}
                        <span className={styles.priceWas}>was ${price}</span>
                      </div>
                    </>
                  ) : (
                    <div className={styles.price}>${price}</div>
                  )}
                </Link>
                <div className={styles.others}>
                  {imagesOther.slice(0, 3).map((val, i) => {
                    return (
                      <span
                        className={`${styles.other} ${
                          checkSelected(i, id) && styles.selected
                        }`}
                        key={val}
                        onClick={() => handleSelected(id, i)}
                      >
                        <Img
                          imgSrc={val}
                          imgAlt={val}
                          imgWidth={40}
                          imgHeight={40}
                          // imgPriority={true}
                        />
                      </span>
                    );
                  })}
                  {imagesOther.length > 3 && (
                    <span className={styles.more}>
                      <span className={styles.num}>
                        + {imagesOther.length - 3}
                      </span>
                    </span>
                  )}
                </div>
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
