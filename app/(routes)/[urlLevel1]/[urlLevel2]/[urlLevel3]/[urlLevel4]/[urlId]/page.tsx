import { CategoryParamsProps } from "@/app/lib/definitions";
import { fetchItemById, fetchItemsByLevel4 } from "@/app/lib/data";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import Category from "@/app/ui/category";
import { capitalizeFirstLetter, deHyphenate } from "@/app/lib/utils";
import Product from "@/app/ui/product";
// import styles from "@/app/css/page.module.css";

export default async function Page({
  params: { urlId }, // urlVariety optional passed as array
}: CategoryParamsProps) {
  // console.log(urlId);

  if (urlId) {
    const query = deHyphenate(urlId);
    if (query) {
      // const promise: Promise<ItemsProps[] | undefined> = fetchItemsByLevel4(
      //   capitalizeFirstLetter(query)
      // );

      const promise = fetchItemById(Number(urlId));

      return (
        <Suspense fallback={<Loading />}>
          <h1>Level 4</h1>
          <Product promise={promise} />
        </Suspense>
      );
    }
  }
  return <h1>Error</h1>;
}
