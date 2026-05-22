import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, productsTable } from "@workspace/db";

const router: IRouter = Router();

router.get("/menu/categories", async (_req, res): Promise<void> => {
  const products = await db.select().from(productsTable);
  const categoryMap = new Map<string, number>();
  for (const p of products) {
    categoryMap.set(p.category, (categoryMap.get(p.category) ?? 0) + 1);
  }

  const categories = [
    { name: "Cookies", description: "Handcrafted cookies baked fresh with natural coconut oil" },
    { name: "Cakes", description: "Custom cakes for every occasion, made with love" },
    { name: "Specials", description: "Limited edition seasonal treats and bestsellers" },
  ];

  const result = categories.map(c => ({
    name: c.name,
    description: c.description,
    productCount: categoryMap.get(c.name) ?? 0,
  }));

  res.json(result);
});

router.get("/menu/featured", async (_req, res): Promise<void> => {
  const featured = await db.select().from(productsTable).where(eq(productsTable.isFeatured, true));
  res.json(featured.map(p => ({ ...p, price: parseFloat(p.price) })));
});

export default router;
