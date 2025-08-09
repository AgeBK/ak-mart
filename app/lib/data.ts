import { sql } from "@vercel/postgres";
import { ItemsProps } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { camelise, cameliseArr } from "./utils";

export async function fetchItems(): Promise<ItemsProps[] | undefined> {
  // noStore() prevents the response from being cached. (good for dev) TODO
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *        
      FROM items
      `;

    const items = data.rows;
    items.reverse();
    // return cameliseArr(items);
    return items ? cameliseArr(items) : undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch items.");
  }
}

export async function fetchItemById(query: number) {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *    
      FROM items
      WHERE id=${query}
      `;

    const item = data.rows[0];
    return item ? camelise(item) : undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch item by id.");
  }
}

export async function fetchItemsByCategory(query: string) {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *        
      FROM items
      WHERE category=${query}
      `;

    const items = data.rows;
    return cameliseArr(items); // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch items by category.");
  }
}

export async function fetchItemsByCategoryAndVariety(
  category: string,
  variety: string
) {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *        
      FROM items
      WHERE category=${category} AND variety=${variety}
      `;

    const items = data.rows;
    return cameliseArr(items); // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch items by category and variety.");
  }
}

export async function fetchItemsOnSpecial() {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *        
      FROM items
      WHERE price_current < price_normal
      `;

    const items = data.rows;
    return cameliseArr(items);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch items on special.");
  }
}

export async function fetchItemsBySearchTerm(query: string) {
  noStore();

  try {
    const data = await sql<ItemsProps>`
    SELECT *       
    FROM items
    WHERE name ILIKE ${`%${query}%`}
    `;

    const items = data.rows;
    return cameliseArr(items);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch items by search term.");
  }
}

export async function fetchItemsPriceDrop() {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *        
      FROM items
      WHERE price_current < price_normal
      `;

    const items = data.rows;
    return cameliseArr(items);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch items price drop.");
  }
}

export async function fetchCarouselItems() {
  noStore();

  // fetch 12 random items that are on sale
  try {
    const data = await sql<ItemsProps>`
      SELECT * FROM items 
      WHERE price_current != price_normal 
      ORDER BY RANDOM()
      LIMIT 12
      `;

    const items = data.rows;
    return cameliseArr(items);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch carousel items.");
  }
}

export async function fetchCarouselItemsByVariety(query: string) {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT * FROM items 
      WHERE variety=${query}
      LIMIT 12
      `;

    const items = data.rows;
    return cameliseArr(items);
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch carousel items by variety.");
  }
}
