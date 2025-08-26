import { CategoryParamsProps, ItemsProps } from "@/app/lib/definitions";
import { fetchItemsByLevel3 } from "@/app/lib/data";
import { Suspense } from "react";
import Loading from "@/app/ui/loading";
import Category from "@/app/ui/category";
// import styles from "@/app/css/page.module.css";

export default async function Page({ params }: CategoryParamsProps) {
  const { urlLevel3 } = await params; // TODO: ??
  console.log(urlLevel3);

  if (urlLevel3) {
    const promise: Promise<ItemsProps[] | undefined> =
      fetchItemsByLevel3(urlLevel3);

    return (
      <Suspense fallback={<Loading />}>
        <Category promise={promise} level={urlLevel3} subLevel="level4" />
      </Suspense>
    );
  }

  return <h1>Error</h1>;
}
