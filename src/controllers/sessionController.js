import sessionService from "../services/sessionService.js";
import userDTO from "../dto/userDTO.js";

export const loginJWT = (req, res) => {
  const token = sessionService.generateJWT(req.user);
  sessionService.setTokenCookie(res, token);

  if (req.user) {
    return res.redirect("/home");
  }
  res.redirect("/login");
};

export const gitHubCallBackJWT = (req, res) => {
  const token = sessionService.generateJWT(req.user);
  sessionService.setTokenCookie(res, token);
  req.session.user = req.user;
  res.redirect("/home");
};

export const handleRegister = (req, res) => {
  res.redirect('/login');
};

export const handleLogin = (req, res, next) => {
  console.log('User Cart ID during login:', req.user.cart);
  req.session.user = {
    first_name: req.user.first_name,
    last_name: req.user.last_name,
    email: req.user.email,
    age: req.user.age,
    role: req.user.role,
    cart: req.user.cart,
  };
  next();
};

export const getCurrentUser = (req, res) => {
  const user = new userDTO(req.user);
  res.send({ status: "success", payload: user });
};

export const logOutSession = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al destruir la sesión:", err);
      res.status(500).json({ error: "Error interno del servidor" });
    } else {
      res.clearCookie("coderCookieToken");
      res.redirect("/login");
    }
  });
};
