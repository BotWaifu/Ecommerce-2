import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import initializePassport from "./src/config/passport.config.js";
import config from "./src/config/config.js";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUiExpress from "swagger-ui-express";
import handlebars from "express-handlebars";
import __dirname from "./src/utils/constantsUtil.js";
import { Server } from "socket.io";
import Sockets from "./sockets.js";
import productsRouter from "./src/routes/products.router.js";
import cartsRouter from "./src/routes/carts.router.js";
import sessionsRouter from "./src/routes/sessions.router.js";
import viewsRouter from "./src/routes/views.router.js";
import mockingRouter from "./src/routes/mocking.router.js";
import loggerRouter from "./src/routes/logger.router.js";
import mailRouter from "./src/routes/mail.router.js";
import usersRouter from "./src/routes/users.router.js";
import cookieParser from "cookie-parser";
import { addLogger } from "./src/utils/logger.js";

const app = express();
const port = config.PORT;
const uri = config.NODE_ENV === "test" ? config.MONGO_TEST_URL : config.MONGO_URL;

const swaggerOptions = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentacion JIF Style Ecommerce",
      description: "API pensada para aplicacion de un Marketplace",
    },
  },
  apis: [`${__dirname}/../docs/**/*.yaml`],
};

const specs = swaggerJsdoc(swaggerOptions);
app.use("/api/docs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../../public`));

initializePassport();
app.use(passport.initialize());
app.use(cookieParser());
app.use(addLogger);

// Routes
app.use("/", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);
app.use("/api/sessions", sessionsRouter);
app.use("/api/mocking", mockingRouter);
app.use("/loggerTest", loggerRouter);
app.use("/mail", mailRouter);
app.use("/api/users", usersRouter);

// Handlebars
app.engine("handlebars", handlebars.engine());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/../views");

// Mongoose
mongoose
  .connect(uri, { dbName: config.NODE_ENV === "test" ? "test" : "ecommerce" })
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