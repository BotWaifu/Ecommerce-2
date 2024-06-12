import express from "express";
import {
  getAllCarts,
  getCartById,
  createCart,
  addProductByID,
  deleteProductInCart,
  updateCart,
  updateProductQuantity,
  clearCart,
  purchase,
} from "../controllers/cartController.js";
import authorize from "../middlewares/auth.js"; // Asegúrate de importar el middleware de autorización

const router = express.Router();

router.get("/", authorize('user'), getAllCarts);
router.get("/:cid", authorize('user'), getCartById);
router.post("/", authorize('user'), createCart);
router.post("/:cid/product/:pid", authorize('user'), addProductByID);
router.delete("/:cid/product/:pid", authorize('user'), deleteProductInCart);
router.put("/:cid", authorize('user'), updateCart);
router.put("/:cid/product/:pid", authorize('user'), updateProductQuantity);
router.delete("/:cid", authorize('user'), clearCart);
router.get("/:cid/purchase", authorize('user'), purchase);

export default router;
