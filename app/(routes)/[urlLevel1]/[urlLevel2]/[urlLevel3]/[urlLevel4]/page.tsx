import { CategoryParamsProps } from "@/app/lib/definitions";
import { fetchItemsByLevel4 } from "@/app/lib/data";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import Category from "@/app/ui/category";
import { capitalizeFirstLetter, deHyphenate } from "@/app/lib/utils";
// import styles from "@/app/css/page.module.css";

export default async function Page({
  params: { urlLevel4 }, // urlVariety optional passed as array
}: CategoryParamsProps) {
  // console.log(urlLevel4);

  if (urlLevel4) {
    const query = deHyphenate(urlLevel4);
    if (query) {
      // const promise: Promise<ItemsProps[] | undefined> = fetchItemsByLevel4(
      //   capitalizeFirstLetter(query)
      // );

      const promise = fetchItemsByLevel4(capitalizeFirstLetter(query));

      return (
        <Suspense fallback={<Loading />}>
          <h1>Level 4</h1>
          <Category promise={promise} />
        </Suspense>
      );
    }
  }
  return <h1>Error</h1>;
}
