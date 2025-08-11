import { CategoryParamsProps, ItemsProps } from "@/app/lib/definitions";
import { fetchItemsByLevel3 } from "@/app/lib/data";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import Category from "@/app/ui/category";
import { capitalizeFirstLetter, deHyphenate } from "@/app/lib/utils";
// import styles from "@/app/css/page.module.css";

export default async function Page({
  params: { urlLevel3 }, // urlVariety optional passed as array
}: CategoryParamsProps) {
  console.log(urlLevel3);

  if (urlLevel3) {
    const query = deHyphenate(urlLevel3);
    if (query) {
      const promise: Promise<ItemsProps[] | undefined> = fetchItemsByLevel3(
        capitalizeFirstLetter(query)
      );

      return (
        <Suspense fallback={<Loading />}>
          <h1>urlLevel3</h1>
          <Category promise={promise} />
        </Suspense>
      );
    }
  }

  return <h1>Error</h1>;
}
