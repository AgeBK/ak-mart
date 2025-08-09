import React, { use } from "react";
import { SurveyCreatorProps } from "../lib/definitions";
import styles from "@/app/css/Category.module.css";

export default function Category({ promise }: SurveyCreatorProps) {
  const data = use(promise);
  console.log(data);

  return <div>Category</div>;
}
