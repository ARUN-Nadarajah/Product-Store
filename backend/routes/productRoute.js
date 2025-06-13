import express from "express";
import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/productController.js";

const router = express.Router();

router.put(":id",updateProduct);
router.get("/",getProducts);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);

export default router;