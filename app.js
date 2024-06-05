import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars';
import initializePassport from './src/config/passport.config.js';
import cartsRouter from './src/routes/cartsrouter.js';
import productsRouter from './src/routes/productsrouter.js';
import viewsRouter from './src/routes/viewrouter.js';
import sessionsRouter from './src/routes/sessionsrouter.js';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 8080;
const uri = process.env.MONGO_URL;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: uri,
      ttl: 60, // 60 minutos
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 60 }, // 60 minutos en milisegundos
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views'));

// Mongoose
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Conexión exitosa a la base de datos");
}).catch((error) => {
  console.log("No se puede conectar con la DB: " + error);
  process.exit(1);
});

// Middleware para hacer disponible la información del usuario autenticado en las vistas
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/', viewsRouter);

// Rutas de autenticación de GitHub
app.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));

app.get('/api/sessions/githubcallback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  (req, res) => {
    // Autenticación exitosa, redirige a la página deseada
    res.redirect('/');
  }
);

// Ruta para el login
app.get('/login', (req, res) => {
  res.render('login');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

export default app;
