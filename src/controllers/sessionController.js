import sessionService from "../services/sessionService.js";
import userDTO from "../dto/userDTO.js";

export const loginJWT = (req, res) => {
  const token = sessionService.generateJWT(req.user);
  sessionService.setTokenCookie(res, token);
  req.session.user = req.user; // Asegúrate de almacenar el usuario en la sesión

  if (req.session.user) {
    return res.redirect("/home");
  }
  res.redirect("/login");
};

export const gitHubCallBackJWT = (req, res) => {
  const token = sessionService.generateJWT(req.user);
  sessionService.setTokenCookie(res, token);
  req.session.user = req.user; // Asegúrate de almacenar el usuario en la sesión
  res.redirect("/home");
};

export const handleRegister = (req, res) => {
  res.redirect('/login');
};

export const handleLogin = (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error("User not found in request");
    }

    req.session.user = {
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
      age: req.user.age,
      role: req.user.role,
      cart: req.user.cart || null, // Asegúrate de que cart esté definido
    };
    console.log('User Cart ID during login:', req.session.user.cart); // Usar req.session.user
    next();
  } catch (error) {
    console.error('Error during handleLogin:', error);
    res.status(500).send({
      status: "error",
      message: error.message,
    });
  }
};

export const getCurrentUser = (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ status: "error", message: "No user session found" });
  }
  const user = new userDTO(req.session.user); // Usar req.session.user
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
