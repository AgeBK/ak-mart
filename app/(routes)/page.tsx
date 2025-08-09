import {} from "../lib/fileSys";
import { ItemsProps } from "@/app/lib/definitions";
import all from "@/app/data/all.json";
// import desc from "@/app/data/description.json";
import desc2 from "@/app/data/description2.json";
import styles from "@/app/css/page.module.css";
import { fetchItems } from "../lib/data";
import Home from "../ui/home";
import { Suspense } from "react";
import Loading from "../ui/loading";

export default async function Page() {
  const promise: Promise<ItemsProps[] | undefined> = fetchItems();
  return (
    <Suspense fallback={<Loading />}>
      <Home promise={promise} />
    </Suspense>
  );
}
