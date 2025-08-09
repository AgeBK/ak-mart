import { ItemsProps } from "@/app/lib/definitions";
import { fetchItems } from "@/app/lib/data";
import { Suspense, use } from "react";
import Loading from "@/app/ui/loading";
import Category from "@/app/ui/category";
import styles from "@/app/css/page.module.css";

export default function Page({
  params,
}: {
  params: Promise<{
    urlCategory: string;
  }>;
}) {
  const { urlCategory } = use(params);
  console.log(urlCategory);

  const promise: Promise<ItemsProps[] | undefined> = fetchItems();
  console.log(promise);

  return (
    <Suspense fallback={<Loading />}>
      <Category promise={promise} />
    </Suspense>
  );
}
