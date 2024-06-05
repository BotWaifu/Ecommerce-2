import passport from "passport";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (error, user, info) {
      if (error) return next(error);
      if (!user) {
        return res.redirect('/login?failLogin=true');
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ status: "error", error: "No autenticado" });
    }
    if (req.user.role !== role) {
      return res.status(403).json({ status: "error", error: "No autorizado" });
    }
    next();
  };
};
