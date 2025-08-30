"use client";

import React, { use, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  CategoryProps,
  SelectedImgProps,
  KeyStringArrProps,
  SubLevelProps,
  KeyNumberProps,
  ItemsProps,
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
import FilterList from "./filter-list";
import Pills from "./pills";

export default function Category({ promise, level, subLevel }: CategoryProps) {
  const [selectedImg, setSelectedImg] = useState<SelectedImgProps>({});
  const [filters, setFilters] = useState<{
    colour: string;
    size: number;
    price: KeyNumberProps;
  }>({ colour: "", size: 0, price: {} });
  let data = use(promise);
  data = data.slice(0, 10);
  const filteredRef = useRef<ItemsProps[]>([]);
  const firstLoad = useRef<boolean>(true);

  const pathname = usePathname();
  console.log("Category");
  console.log(filters);

  // TODO: not all levels have a description??
  // TODO: low stock? carousel low items

  if (data) {
    if (firstLoad.current) {
      firstLoad.current = false;
      filteredRef.current = data;
    }

    let subLevelObj: SubLevelProps | undefined = {};
    if (subLevel) {
      subLevelObj = getSubLevels(data, subLevel, pathname);
    }
    console.log(filters);

    Object.entries(filters).filter(([key, val]) => {
      console.log("FILTER");
      console.log(filters);

      console.log(key);
      console.log(val);

      // applies any selected filters to data

      const length = Object.keys(val).length;
      let filtered = filteredRef.current;

      if (key === "price" && length) {
        const { minValue, maxValue } = val;
        filteredRef.current = filtered.filter(({ price }) => {
          if (typeof minValue === "number" && typeof maxValue === "number")
            return price >= minValue && price <= maxValue;
        });
      }
      // if (key !== "price" && length) {
      if (key === "colour" && val) {
        if (key === "colour") console.log("key", key);

        filteredRef.current = filtered.filter((item) => {
          console.log("***colour***");
          return item[key] === val; // colour not size (stock)
        });
        console.log(filteredRef.current);
      }

      if (key === "size" && val) {
        // if (key === "size" && val > 0) debugger;

        filteredRef.current = filtered.filter((item) => {
          if (key === "size") console.log("key", key);

          console.log("***size***");
          const isTrue = item.stock.some(
            (s: KeyNumberProps) => s.size === Number(val) && s.amount > 0
          );
          return isTrue;
        });
      }
      console.log(filteredRef.current);

      // filteredRef.current = filtered;
    });

    console.log(data);

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
    // console.log(colourVariations);

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
        <div className={styles.optionsCont}>
          <span className={styles.itemCount}>
            ({filteredRef.current.length}) Available
          </span>
          <div className={styles.options}>
            <div className={styles.filterCont}>
              <FilterList
                data={filteredRef.current}
                //  data={data}
                filters={filters}
                setFilters={setFilters}
              />
              {/* <Pills filters={filters} setFilters={setFilters} /> */}
            </div>
          </div>
        </div>

        <div className={styles.items}>
          {filteredRef.current.map((val) => {
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
