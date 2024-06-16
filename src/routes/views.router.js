import { Router } from "express";
import { passportCall, authorization } from "../utils/authUtil.js";
import {
  renderLogin,
  redirectIfLoggedIn,
  isAdmin,
  populateCart,
  getProducts,
  goHome,
  renderHome,
  renderRegister,
  renderRealTimeProducts,
  renderChat,
  renderCart,
  renderProductDetails,
  verifyUserSession,
  purchaseView,
  logOut,
} from "../controllers/viewsController.js";

const router = Router();

router.get("/", goHome);
router.get("/home", passportCall("jwt"), isAdmin, populateCart, renderHome);
router.get("/login", redirectIfLoggedIn, renderLogin);
router.get("/register", redirectIfLoggedIn, renderRegister);
router.get("/products", passportCall("jwt"), isAdmin, populateCart, getProducts);
router.get("/realtimeproducts", passportCall("jwt"), authorization("admin"), isAdmin, populateCart, renderRealTimeProducts);
router.get("/chat", passportCall("jwt"), isAdmin, populateCart, verifyUserSession, renderChat);
router.get("/cart/:cid", passportCall("jwt"), isAdmin, populateCart, verifyUserSession, renderCart);
router.get("/products/item/:pid", passportCall("jwt"), isAdmin, populateCart, verifyUserSession, renderProductDetails);
router.get("/cart/:cid/purchase", passportCall("jwt"), purchaseView);
router.get("/logout", logOut);

export default router;