import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import session from 'express-session';
import mongoStore from 'connect-mongo';
import passport from 'passport';
import cookieParser from "cookie-parser";
import handlebars from 'express-handlebars';
import initializatePassport from './src/config/passport.config.js';
import { uploader } from './src/utils/multer.js';
import cartsRouter from './src/routes/cartsrouter.js';
import productsRouter from './src/routes/productsrouter.js';
import viewsRouter from './src/routes/viewrouter.js';
import sessionsRouter from './src/routes/sessionsrouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 8080;
const uri = "mongodb+srv://maria16leon17:aries0404@cluster0.klbhxor.mongodb.net/ecommerce?retryWrites=true&w=majority";

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
    secret: "secretPhrase",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 1000 * 60 }, // 60 minutos en milisegundos
  })
);

initializatePassport();
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'src/views')); // Ajuste de la ruta a la carpeta de vistas

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

// Modelo de producto
const productSchema = new mongoose.Schema({
  title: String,
  price: Number,
  thumbnail: String
});

const Product = mongoose.model('Product', productSchema);

// Ruta para obtener productos
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    console.log(products); // Agrega este registro para verificar los datos enviados al cliente
    res.json(products);
  } catch (err) {
    res.status(500).send('Error al obtener los productos');
  }
});

// Ruta para subir imágenes
app.post('/upload', uploader.single('imagen'), (req, res) => {
  const nuevaImagen = new Product({
    title: req.body.title,
    price: req.body.price,
    thumbnail: `/img/${req.file.filename}`,
  });

  nuevaImagen.save()
    .then(() => res.send('Imagen subida y guardada en la BD'))
    .catch(err => res.status(500).send('Error al guardar la imagen en la BD'));
});

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);
app.use('/api/sessions', sessionsRouter);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

export default app;
