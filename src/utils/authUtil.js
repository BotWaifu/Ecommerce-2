import passport from 'passport';

export const passportCall = (strategy) => {
  return (req, res, next) => {
    passport.authenticate(strategy, (err, user, info) => {
      if (err) return next(err);
      if (!user) {
        return res.redirect('/login');
      }
      req.session.user = user; // Almacenar el usuario en la sesión
      next();
    })(req, res, next);
  };
};

export const authorization = (role) => {
  return (req, res, next) => {
    if (!req.session.user) return res.status(401).json({ error: "Unauthorized" });
    if (req.session.user.role !== role) return res.status(403).json({ error: "Forbidden" });
    next();
  };
};
