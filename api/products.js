import express from "express";
import requireUser from "#middleware/requireUser";
import { getProducts, getProductById } from "#db/products";
import { getOrdersByProductId } from "#db/orders";

const router = express.Router();
export default router;

router.get("/", async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await getProductById(req.params.id);
  if (!product) return res.status(404).send("Product not found.");
  res.send(product);
});

router.get("/:id/orders", async (req, res) => {
  const product = await getProductById(req.params.id);
  if (!product) return res.status(404).send("Product not found.");
  if (!req.user) return res.status(401).send("Unauthorized");

  const orders = await getOrdersByProductId(product.id);
  res.send(orders);
});
