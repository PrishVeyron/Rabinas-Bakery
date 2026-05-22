import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, productsTable, ordersTable } from "@workspace/db";
import {
  CreateOrderBody,
  GetOrderParams,
  UpdateOrderStatusParams,
  UpdateOrderStatusBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

const WHATSAPP_PHONE = "9779864099823";

function buildWhatsAppMessage(order: {
  id: number;
  customerName: string;
  customerPhone: string;
  customerEmail?: string | null;
  deliveryAddress?: string | null;
  items: Array<{ productName: string; quantity: number; unitPrice: number; subtotal: number }>;
  totalAmount: string | number;
  paymentMethod: string;
  notes?: string | null;
}): string {
  const itemLines = order.items
    .map(i => `  - ${i.productName} x${i.quantity} = NPR ${Number(i.subtotal).toLocaleString()}`)
    .join("\n");

  const paymentLabel =
    order.paymentMethod === "qr_code"
      ? "QR Code"
      : order.paymentMethod === "credit_card"
      ? "Credit Card"
      : "Cash on Delivery";

  return (
    `*New Order #${order.id} - Rabina's Bakery*\n\n` +
    `*Customer:* ${order.customerName}\n` +
    `*Phone:* ${order.customerPhone}\n` +
    (order.customerEmail ? `*Email:* ${order.customerEmail}\n` : "") +
    (order.deliveryAddress ? `*Delivery Address:* ${order.deliveryAddress}\n` : "") +
    `\n*Items:*\n${itemLines}\n\n` +
    `*Total:* NPR ${Number(order.totalAmount).toLocaleString()}\n` +
    `*Payment:* ${paymentLabel}\n` +
    (order.notes ? `*Notes:* ${order.notes}\n` : "") +
    `\nPlease confirm this order. Thank you!`
  );
}

router.get("/orders", async (_req, res): Promise<void> => {
  const orders = await db.select().from(ordersTable).orderBy(ordersTable.createdAt);
  res.json(orders.map(o => ({
    ...o,
    totalAmount: parseFloat(o.totalAmount),
    items: o.items as Array<{ productId: number; productName: string; quantity: number; unitPrice: number; subtotal: number }>,
  })));
});

router.post("/orders", async (req, res): Promise<void> => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { items: inputItems, ...orderData } = parsed.data;

  const productIds = inputItems.map(i => i.productId);
  const products = await db.select().from(productsTable);
  const productMap = new Map(products.map(p => [p.id, p]));

  let totalAmount = 0;
  const orderItems: Array<{
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
    subtotal: number;
  }> = [];

  for (const item of inputItems) {
    const product = productMap.get(item.productId);
    if (!product) {
      res.status(400).json({ error: `Product ${item.productId} not found` });
      return;
    }
    const unitPrice = parseFloat(product.price);
    const subtotal = unitPrice * item.quantity;
    totalAmount += subtotal;
    orderItems.push({
      productId: item.productId,
      productName: product.name,
      quantity: item.quantity,
      unitPrice,
      subtotal,
    });
  }

  const [order] = await db
    .insert(ordersTable)
    .values({
      ...orderData,
      items: orderItems,
      totalAmount: totalAmount.toFixed(2),
      status: "pending",
      whatsappSent: false,
    })
    .returning();

  const message = buildWhatsAppMessage({
    ...order,
    totalAmount: order.totalAmount,
    items: order.items as typeof orderItems,
  });

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;

  req.log.info({ orderId: order.id, whatsappUrl }, "Order created, WhatsApp URL generated");

  await db.update(ordersTable).set({ whatsappSent: true }).where(eq(ordersTable.id, order.id));

  res.status(201).json({
    ...order,
    totalAmount: parseFloat(order.totalAmount),
    items: order.items,
    whatsappSent: true,
    whatsappUrl,
  });
});

router.get("/orders/:id", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = GetOrderParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [order] = await db.select().from(ordersTable).where(eq(ordersTable.id, params.data.id));
  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json({
    ...order,
    totalAmount: parseFloat(order.totalAmount),
    items: order.items,
  });
});

router.patch("/orders/:id/status", async (req, res): Promise<void> => {
  const raw = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
  const params = UpdateOrderStatusParams.safeParse({ id: parseInt(raw, 10) });
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdateOrderStatusBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [order] = await db
    .update(ordersTable)
    .set({ status: body.data.status })
    .where(eq(ordersTable.id, params.data.id))
    .returning();

  if (!order) {
    res.status(404).json({ error: "Order not found" });
    return;
  }

  res.json({
    ...order,
    totalAmount: parseFloat(order.totalAmount),
    items: order.items,
  });
});

export default router;
