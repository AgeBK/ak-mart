import { CategoryParamsProps, ItemsProps } from "@/app/lib/definitions";
import { fetchItems } from "@/app/lib/data";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import Category from "@/app/ui/category";
import styles from "@/app/css/page.module.css";

export default async function Page({
  params: { urlLevel1 }, // urlVariety optional passed as array
} : CategoryParamsProps) {
  console.log(urlLevel1);

  // const { urlLevel1, urlLevel2, urlLevel3 } = use(params);
  // console.log(urlLevel1);
  // console.log(urlLevel2);
  // console.log(urlLevel3);

  const promise: Promise<ItemsProps[] | undefined> = fetchItems();
  console.log(promise);

  return (
    <Suspense fallback={<Loading />}>
      <h1>URL level 1</h1>
      <Category promise={promise} />
    </Suspense>
  );
}
