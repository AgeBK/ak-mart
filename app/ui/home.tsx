import React, { use } from "react";
import { SurveyCreatorProps } from "../lib/definitions";
import styles from "@/app/css/Home.module.css";

// TODO: MUI skeleton

export default function Home({ promise }: SurveyCreatorProps) {
  const data = use(promise);
  console.log(data);

  return <div>Home</div>;
}
