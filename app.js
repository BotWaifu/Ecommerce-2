import express from 'express';
import cartsRouter from './src/routes/cartsrouter.js';
import productsRouter from './src/routes/productsrouter.js';
import viewsRouter from './src/routes/viewrouter.js';
import handlebars from 'express-handlebars';
import __dirname from "./src/utils/constantsUtil.js";
import { Server } from 'socket.io';
import Sockets from "./sockets.js";
import mongoose from "mongoose";
import sessionsRouter from "./src/routes/sessionsrouter.js";
import mongoStore from "connect-mongo";
import session from "express-session";
import passport from 'passport';
import initializatePassport from './src/config/passport.config.js';
import cookieParser from "cookie-parser";

const app = express();
const port = 8080;
const uri = "mongodb+srv://maria16leon17:aries0404@cluster0.klbhxor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    store: mongoStore.create({
      mongoUrl: uri,
      ttl: 60, // 60 minutos
    }),
    secret: "secretPhrase",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 60 }, // 60 minutos en milisegundos
  })
);

initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);
app.use("/api/sessions", sessionsRouter);

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/../views");

// Mongoose
mongoose
  .connect(uri, { dbName: "ecommerce" })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    const server = app.listen(port, () =>
      console.log(`Servidor corriendo en http://localhost:${port}`)
    );

    // Set up WebSocket server
    const io = new Server(server);
    Sockets(io);
  })
  .catch((error) => {
    console.log("No se puede conectar con la DB: " + error);
    process.exit(1);
  });