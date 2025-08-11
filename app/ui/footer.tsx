import Link from "next/link";
import data from "@/app/lib/appData.json";
import Img from "@/app/ui/image";
import styles from "@/app/css/Footer.module.css";

export default function Footer() {
  const yr = new Date().getFullYear();
  const { paymentArr, paymentImgWidths } = data;

  return (
    <footer className={styles.container}>
      <div className={styles.ak}>
        © {yr}
        <a
          href="https://github.com/AgeBK/ak-mart?tab=readme-ov-file#about"
          target="_blank"
        >
          AK Mart
        </a>
        All rights reserved.
      </div>
      <ul className={styles.list}>
        {paymentArr.map((val, ind) => (
          <li key={ind}>
            <Img
              imgSrc={`payment/${val}.webp`}
              imgAlt={val}
              imgWidth={paymentImgWidths[ind]}
              imgHeight={44}
            />
          </li>
        ))}
      </ul>
    </footer>
  );
}
