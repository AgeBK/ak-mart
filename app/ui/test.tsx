import React from "react";
// import styles from "@/app/css/Test.module.css";

export default function Test() {
  return (
    <div>
      {mi.map((val: string) => (
        <div className={styles.img} key={val}>
          <img key={val} src={val} alt={val} height="50px" width="50px" />
        </div>
      ))}
    </div>
  );
}
