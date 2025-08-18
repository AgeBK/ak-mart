import Image from "next/image";
import data from "@/app/lib/appData.json";
import { ImgResponsiveProps} from "../lib/definitions";
import styles from "@/app/css/Image.module.css";

// Created this because product images are all different sizes (doesn't look good with set height/width)
export default function ImgResponsive({
  imgSrc,
  imgAlt,
  imgStyle,
  imgPriority,
}: ImgResponsiveProps) {
  const { imgPath } = data;
  return (
    <div className={styles[imgStyle]}>
      <Image
        src={`${imgPath}${imgSrc}`}
        alt={imgAlt}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        priority={imgPriority || false}
      />
      {/* <Image
        width={0}
        height={0}
        src={"/img/bd008098-8129-4a6e-9a21-481166779b4b.webp"}
        alt="Responsive Image"
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      /> */}
    </div>
  );
}
