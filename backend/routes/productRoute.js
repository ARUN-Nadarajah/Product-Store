import express from "express";
import {
  createProduct,
  deleteProduct,
  getProducts,
  updateProduct,
  getProductById,  // ✅ import this
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);    // ✅ add this
router.post("/", createProduct);
router.put("/:id", updateProduct);     // ✅ fixed
router.delete("/:id", deleteProduct);

export default router;