import { Router } from "express";
import {
  renderLogin,
  renderRegister,
  renderHome,
  renderRealTimeProducts,
  renderChat,
  renderCart,
  renderProductDetails,
  goHome,
  getProducts,
} from "../controllers/views.controller.js";
import { passportCall, authorization } from "../utils/authUtil.js";

const router = Router();

router.get("/", goHome);
router.get("/home", passportCall("jwt"), renderHome);
router.get("/login", renderLogin);  // Simplificar login y eliminar redirección
router.get("/register", renderRegister);  // Simplificar registro y eliminar redirección
router.get("/products", passportCall("jwt"), getProducts);
router.get("/realtimeproducts", passportCall("jwt"), authorization("admin"), renderRealTimeProducts);
router.get("/chat", passportCall("jwt"), renderChat);
router.get("/cart/:cid", passportCall("jwt"), renderCart);
router.get("/products/item/:pid", passportCall("jwt"), renderProductDetails);

export default router;
