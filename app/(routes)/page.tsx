// "use client";

import {
  writeFile,
  kImages,
  getImageName,
  removeImageSizing,
  getRandomNumber,
  getSavePriceNumber,
  propToString,
} from "../lib/fileSys";
import {
  ItemsProps,
  VariationDataProps,
  ProductDetailsProps,
  GroupProps,
  KeyStringProps,
  KeyNumberProps,
} from "@/app/lib/definitions";
import all from "@/app/data/all.json";
import subs from "@/app/data/subs.json";
// import desc from "@/app/data/description.json";
import desc2 from "@/app/data/description2.json";
import styles from "@/app/css/page.module.css";

export default async function Page() {
  return <div className={styles.container}>Home</div>;
}
