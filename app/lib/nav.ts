import { NavDataProps, NavLevel } from "./definitions";
import { hyphenate } from "./utils";

export const buildNav = (data: NavDataProps[]|undefined) => {
  const navObj: NavLevel = {};

  data?.forEach((val: NavDataProps) => {
    const { level1, level2, level3, level4 } = val;
    if (level1 && !navObj[level1]) {
      navObj[level1] = {
        [level1]: hyphenate(level1.toLowerCase()) as string,
      };
    }

    if (
      level1 &&
      level2 &&
      typeof navObj[level1] === "object" &&
      !navObj[level1][level2]
    ) {
      (navObj[level1] as NavLevel)[level2] = {
        [level2]: hyphenate(
          "/" + level1.toLowerCase() + "/" + level2.toLowerCase()
        ) as string,
      };
    }

    if (
      level1 &&
      level2 &&
      level3 &&
      typeof navObj[level1] === "object" &&
      typeof navObj[level1][level2] === "object" &&
      !navObj[level1][level2][level3]
    ) {
      (navObj[level1][level2] as NavLevel)[level3] = {
        [level3]: hyphenate(
          "/" +
            level1.toLowerCase() +
            "/" +
            level2.toLowerCase() +
            "/" +
            level3.toLowerCase()
        ) as string,
      } as NavLevel;
    }

    if (
      level1 &&
      level2 &&
      level3 &&
      level4 &&
      typeof navObj[level1] === "object" &&
      typeof navObj[level1][level2] === "object" &&
      typeof navObj[level1][level2][level3] === "object" &&
      !navObj[level1][level2][level3][level4]
    ) {
      (navObj[level1][level2][level3] as NavLevel)[level4] = {
        [level4]: hyphenate(
          "/" +
            level1.toLowerCase() +
            "/" +
            level2.toLowerCase() +
            "/" +
            level3.toLowerCase() +
            "/" +
            level4.toLowerCase()
        ) as string,
      };
    }
  });
  return navObj;
};
