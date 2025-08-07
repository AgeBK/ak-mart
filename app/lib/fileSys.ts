import * as fs from "fs";
import { ItemsProps } from "./definitions";

const writeFile = (data: ItemsProps[], fileName: string, path: string) => {
  const strData = JSON.stringify(data);

  try {
    // if (!fs.existsSync(path)) fs.mkdirSync(path);
    // fs.writeFileSync(`${path}${fileName}`, strData);
    const dataPath = "./app/";
    // console.log(`${dataPath}${path}/${fileName}`);
    fs.writeFileSync(`${dataPath}${path}/${fileName}`, strData);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const renameFiles = () => {
  const path = "../ak-mart/app/data/all/";
  fs.readdir(path, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      if (file.endsWith(".json")) {
        console.log(file);
        const newName = file.replace("Boys1to7", "Boys8to16");
        fs.rename(`${path}${file}`, `${path}${newName}`, (err) => {
          if (err) throw err;
          console.log(`${file} was renamed to ${newName}`);
        });
      }
    });
  });
};

export { writeFile, renameFiles };
