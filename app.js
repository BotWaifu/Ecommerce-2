import express from 'express';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import productsRouter from './src/routes/products.router.js';
import cartsRouter from './src/routes/carts.router.js';
import sessionsRouter from './src/routes/sessions.router.js';
import viewsRouter from './src/routes/views.router.js';
import loggerRouter from './src/routes/logger.router.js';
import mailRouter from "./src/routes/mail.router.js";
import usersRouter from "./src/routes/users.router.js";
import mockingRouter from './src/routes/mocking.router.js';
import handlebars from 'express-handlebars';
import __dirname from './src/utils/constantsUtil.js';
import { Server } from 'socket.io';
import Sockets from './sockets.js';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './src/config/passport.config.js';
import cookieParser from 'cookie-parser';
import config from './src/config/config.js';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from 'swagger-ui-express';
import { addLogger } from './src/utils/logger.js'; // Importa el middleware de logging

const app = express();
const port = config.PORT;
const uri = config.NODE_ENV === "test" ? config.MONGO_TEST_URL : config.MONGO_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// Agrega el middleware addLogger antes de las rutas
app.use(addLogger);

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: uri,
      ttl: 60, // 60 minutos
    }),
    secret: config.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 }, // 60 minutos en milisegundos
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocking", mockingRouter);
app.use("/loggerTest", loggerRouter);
app.use("/mail", mailRouter);
app.use("/api/users", usersRouter);

const swaggerOptions = {
  definition: {
    openapi: '3.0.1',
    info: {
      title: 'Documentacion sistema AdoptMe',
      description: 'Esta documentacion cubre toda la API habilitada para AdoptMe',
    },
  },
  apis: [`${__dirname}/../docs/**/*.yaml`],
};

const specs = swaggerJSDoc(swaggerOptions);
app.use('/api/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/../views");

// Mongoose
mongoose
  .connect(uri, { dbName: "ecommerce" })
  .then(() => {
    console.log("Conexión exitosa a la base de datos");
    const server = app.listen(port, () => console.log(`Servidor corriendo en http://localhost:${port}`));

    // WebSocket
    const io = new Server(server);
    Sockets(io);
  })
  .catch((error) => {
    console.log("No se puede conectar con la DB: " + error);
    process.exit(1);
  });

export default app;
