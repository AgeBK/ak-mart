import { sql } from "@vercel/postgres";
import { ItemsProps, NavDataProps } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import {
  camelise,
  cameliseArr,
  capitalizeFirstLetter,
  deHyphenate,
} from "./utils";

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
    return items ? (cameliseArr(items) as ItemsProps[]) : undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch items.");
  }
}

export async function fetchItemById(
  query: number
): Promise<ItemsProps | undefined> {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *    
      FROM items
      WHERE id=${query}
      `;

    const item = data.rows[0];
    return item ? (camelise(item) as ItemsProps) : undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch item by id.");
  }
}

export async function fetchItemsByLevel1(
  query: string
): Promise<ItemsProps[] | undefined> {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *    
      FROM items
      WHERE level1 = ${query}
      `;

    const items = data.rows;
    items.reverse();
    // return cameliseArr(items);
    return items ? (cameliseArr(items) as ItemsProps[]) : undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch item by level.");
  }
}

export async function fetchItemsByLevel2(
  query: string
): Promise<ItemsProps[] | undefined> {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *    
      FROM items
      WHERE level2 = ${query}
      `;

    const items = data.rows;
    items.reverse();
    // return cameliseArr(items);
    return items ? (cameliseArr(items) as ItemsProps[]) : undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch item by level.");
  }
}

export async function fetchItemsByLevel3(query: string) {
  noStore();

  // TODO: check Select Items

  try {
    const data = await sql<ItemsProps>`
      SELECT items.id, items.description_id, items.apn, items.clearance, items.colour, 
        items.image, items.images_other, items.item_group, items.item_name, items. level0, items.level1, items.level2,
        items.level3, items.level4, items.levels, items. parent, items.price_sale, items.price, items.created, items.stock,
        description.title, description.description, description.material, description.features, description.fit, description.care
      FROM items
      INNER JOIN description ON items.description_id = description.id
      WHERE items.level3 = ${capitalizeFirstLetter(deHyphenate(query))}
      ORDER BY items.created desc
      `;

    const items = cameliseArr(data.rows) as ItemsProps[]; // convert db column names to camel case (eg: price_sal to price)
    return items.length > 0 ? items : undefined;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch item by level 3.");
  }
}

export async function fetchItemsByLevel4(
  query: string
): Promise<ItemsProps[] | undefined> {
  noStore();

  try {
    const data = await sql<ItemsProps>`
      SELECT *    
      FROM items
      WHERE level4 = ${query}
      `;

    const items = data.rows;
    items.reverse();
    // return cameliseArr(items);
    return items ? (cameliseArr(items) as ItemsProps[]) : undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch item by level.");
  }
}

export async function fetchNavLevels(): Promise<NavDataProps[] | undefined> {
  noStore();

  try {
    const data = await sql<NavDataProps>`
      SELECT level1, level2, level3, level4
      from items
      `;

    // const data = await sql<NavDataProps>`
    //   SELECT DISTINCT ON (level4) level1, level2, level3, level4
    //   from items
    //   `;

    const items = data.rows;
    // return cameliseArr(items);
    return items || undefined; // convert db column names to camel case (eg: price_normal to priceNormal)
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch item by level.");
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
    throw new Error("Failed to fetch items priceSale drop.");
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
