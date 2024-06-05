import { Router } from "express";
import passport from "passport";
import { loginJWT, gitHubCallBackJWT, handleRegister, handleLogin, getCurrentUser, logOutSession } from "../controllers/sessionController.js";
import { logOut } from "../controllers/views.controller.js";

const router = Router();

router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));

router.get(
  "/githubcallback",
  passport.authenticate("github", {
    session: false,
    failureRedirect: "/login?failLogin=true",
  }),
  gitHubCallBackJWT
);

router.post(
  "/register",
  passport.authenticate("register", {
    failureRedirect: "/register?failRegister=true",
  }),
  handleRegister
);

router.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/login?failLogin=true",
  }),
  handleLogin,
  loginJWT
);

router.get("/current", passport.authenticate("jwt", { session: false }), getCurrentUser);
router.post("/logout", passport.authenticate("jwt", { session: false }), logOutSession);

export default router;
