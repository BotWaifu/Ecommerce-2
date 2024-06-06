import { Router } from "express";
import passport from "passport";
import { passportCall } from "../utils/authUtil.js";
import { loginJWT, gitHubCallBackJWT, handleRegister, handleLogin, getCurrentUser, logOutSession } from "../controllers/sessionController.js";
import { logOut } from "../controllers/viewsController.js";

const router = Router();

// GitHub authentication routes
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    failureRedirect: "/login?failLogin=true",
    failureMessage: true,
  }),
  gitHubCallBackJWT
);

// Registration route
router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/register?failRegister=true",
    failureMessage: true,
  }),
  handleRegister
);

// Login route
router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/login?failLogin=true",
    failureMessage: true,
  }),
  handleLogin,
  loginJWT
);

// Get current user
router.get("/current", passportCall("jwt"), getCurrentUser);

// Logout route
router.post("/logout", passportCall("jwt"), logOut, logOutSession);

export default router;
