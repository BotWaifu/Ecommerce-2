import express from 'express';
import cartsRouter from './src/routes/cartsrouter.js';
import productsRouter from './src/routes/productsrouter.js';
import viewsRouter from './src/routes/viewrouter.js';
import handlebars from 'express-handlebars';
import __dirname from "./src/utils/constantsUtil.js";
import { Server } from 'socket.io';
import Sockets from "./sockets.js";
import mongoose from "mongoose";
import usersRouter from "./src/routes/usersrouter.js";
import mongoStore from "connect-mongo";
import session from "express-session";


const app = express();
const port = 8080;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
//pequeño mod para que me lea las imagenes de public, despues ver si se puede mejorar

// Routes
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/", viewsRouter);

// Set up Handlebars
// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/../views");

const uri = "mongodb+srv://maria16leon17:aries0404@cluster0.klbhxor.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
app.use(
  session({
    store: mongoStore.create({ mongoUrl: uri, ttl: 200 }),
    secret: 'secretPhrase',
    resave: true,
    saveUninitialized: true
  })
);
// Error handling for session saving

// User Router
app.use('/api/sessions', usersRouter);

// Mongoose Connection


mongoose.connect(uri, { dbName: "ecommerce" })
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