"use client";

import React, { use, useState } from "react";
import { usePathname } from "next/navigation";

import Link from "next/link";
import {
  CategoryProps,
  SelectedImgProps,
  KeyStringArrProps,
  SubLevelProps,
} from "../lib/definitions";
import {
  capitalizeFirstLetter,
  deHyphenate,
  getSubLevels,
  hyphenate,
} from "../lib/utils";
import ImgFill from "./image-responsive";
import Img from "./image";
import Carousel from "./carousel";
import styles from "@/app/css/Category.module.css";
import Price from "./price";
import Breadcrumb from "./breadcrumb";
import Modal from "./Modal";

export default function Category({ promise, level, subLevel }: CategoryProps) {
  const [selectedImg, setSelectedImg] = useState<SelectedImgProps>({});
  const data = use(promise);
  const pathname = usePathname();

  // TODO: not all levels have a description??
  // TODO: low stock? carousel low items

  if (data) {
    console.log(data);
    let subLevelObj: SubLevelProps | undefined = {};
    console.log(typeof window);

    if (subLevel) {
      subLevelObj = getSubLevels(data, subLevel, pathname);
    }

    const colourVariations = data.reduce((acc, val) => {
      const { itemName, image } = val;
      // group same items/different colours
      if (!acc[itemName]) {
        acc[itemName] = [image];
      } else {
        acc[itemName].push(image);
      }
      return acc;
    }, {} as KeyStringArrProps);
    console.log(colourVariations);

    const handleSelected = (apn: number, ind: number, val: string) => {
      const newObj = { ...selectedImg };
      newObj[apn] = { ind, val };
      setSelectedImg(newObj);
    };

    const checkSelected = (apn: number, index: number) => {
      const item = selectedImg[apn];
      if (item) {
        const { ind } = item;
        if (index === ind) {
          return true;
        }
      } else if (!item && index === 0) {
        // Onload select first item
        return true;
      }
      return false;
    };

    return (
      <div className={styles.container}>
        <Breadcrumb pathname={pathname} />
        <h1>{capitalizeFirstLetter(deHyphenate(level))}</h1>
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
              created,
              title,
              description,
              material,
              features,
              fit,
              care,
            } = val;

            // console.log(stock);

            // there's not always a level4
            const link = hyphenate(
              `/${level1}/${level2}/${level3}/${
                level4 ? `${level4}/${id}` : id
              }`
            );

            return (
              <div className={styles.item} key={apn}>
                <div className={styles.imgCont}>
                  <Link href={link}>
                    <ImgFill
                      imgSrc={
                        (selectedImg[apn] && selectedImg[apn].val) || image
                      }
                      imgAlt={itemName}
                      imgStyle="category"
                    />
                  </Link>
                  <Modal
                    id={id}
                    itemName={itemName}
                    colour={colour}
                    image={image}
                    price={price}
                    priceSale={priceSale}
                    stock={stock}
                  />
                </div>
                <Link href={link}>
                  <div className={styles.itemName}>{itemName}</div>
                  <Price
                    price={price}
                    priceSale={priceSale}
                    created={created.toString()}
                  />
                </Link>
                <div className={styles.others}>
                  {imagesOther.slice(0, 3).map((val, i) => {
                    return (
                      <span
                        className={`${styles.other} ${
                          checkSelected(apn, i) && styles.selected
                        }`}
                        key={val}
                        onClick={() => handleSelected(apn, i, val)}
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
