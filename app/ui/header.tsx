import Link from "next/link";
import Nav from "./nav";
import Img from "./image";
import { fetchNavLevels } from "../lib/data";
import styles from "@/app/css/Header.module.css";

export default async function Header() {
  const promise = fetchNavLevels();

  return (
    <header className={styles.header}>
      <div className={styles.headerRow}>
        <div className={styles.logo}>
          <Link href="/">
            <Img
              imgSrc={"logos/AK.webp"}
              imgAlt="AK Mart"
              imgWidth={50}
              imgHeight={50}
              imgPriority={true}
            />
          </Link>
        </div>
        <h1 className={styles.hdr}>
          <span>-Mart</span>
        </h1>
        <Nav promise={promise} />
      </div>
    </header>
  );
}
