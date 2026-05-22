import { Router, type IRouter } from "express";
import healthRouter from "./health";
import productsRouter from "./products";
import menuRouter from "./menu";
import ordersRouter from "./orders";

const router: IRouter = Router();

router.use(healthRouter);
router.use(productsRouter);
router.use(menuRouter);
router.use(ordersRouter);

export default router;
