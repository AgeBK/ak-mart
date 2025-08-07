import { writeFile, removeImgPrefix, imageExists } from "../../../lib/fileSys";
// import data from "../../../data/all/allBoys8to16.json";
import all from "../../../data/all/all.json";
import test from "../../../data/all/test.json";
// import styles from "../../../page.module.css";

export default function Category() {
  // console.log(data);

  const path = `/img/`;
  // const mainImg = `${path}${image}`;

  // const doubleCheck: number[] = [];
  // const uniqueArr = data.filter(({ apn }) => {
  //   if (doubleCheck.indexOf(apn) === -1) {
  //     doubleCheck.push(apn);
  //     return true;
  //   }
  //   return false;
  // });

  // console.log(all);
  // console.log(test);
  // console.log(data);
  // console.log(uniqueArr);

  // console.log(test.length);
  // if (test.length === 0) writeFile(uniqueArr, "test.json", "all");
  // const missingImgs: string[] = [];
  // data.forEach((val) => {
  //   const { image, altImages } = val;
  //   if (!imageExists(image)) {
  //     missingImgs.push(image);
  //   }
  //   altImages.forEach((img) => {
  //     if (!imageExists(img)) {
  //       missingImgs.push(img);
  //     }
  //   });
  // });

  // console.log(missingImgs);

  // removeImgPrefix();

  return (
    <div className={styles.container}>
      <h1>Category</h1>
      <div>
        {data.map((val, i) => {
          const { image, altImages, apn } = val;
          const mainImg = `${path}${image}`;
          //  const { imageK: mainImg, altImagesK: altImages, apn } = val;

          return (
            <div className={styles.imgList} key={apn}>
              <div>
                <b>{i + 1}: </b>
                {apn}
              </div>
              <div className={styles.img} key={mainImg}>
                <img
                  key={mainImg}
                  src={mainImg}
                  alt={mainImg}
                  height="50px"
                  width="50px"
                />
              </div>
              {altImages &&
                altImages.map((val: string) => {
                  const altImg = `${path}${val}`;
                  return (
                    <span key={altImg}>
                      <img
                        key={altImg}
                        src={altImg}
                        alt={val}
                        height="50px"
                        width="50px"
                      />
                    </span>
                  );
                })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
