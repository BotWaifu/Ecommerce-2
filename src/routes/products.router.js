import express from "express";
import { uploader } from "../utils/multer.js";
import { getPaginateProducts, getProductByID, createProduct, updateProduct, deleteProduct } from "../controllers/productController.js";
import { passportCall, authorization } from "../utils/authUtil.js";

const router = express.Router();

// Ruta para obtener productos paginados, asegurándose de que el usuario esté autenticado
router.get("/", passportCall('jwt'), getPaginateProducts);

// Ruta para obtener un producto por su ID, asegurándose de que el usuario esté autenticado
router.get("/:pid", passportCall('jwt'), getProductByID);

// Ruta para crear un producto, asegurándose de que el usuario esté autenticado y sea admin
router.post("/", passportCall('jwt'), authorization('admin'), uploader.array("thumbnails"), createProduct);

// Ruta para actualizar un producto, asegurándose de que el usuario esté autenticado y sea admin
router.put("/:pid", passportCall('jwt'), authorization('admin'), uploader.array("thumbnails"), updateProduct);

// Ruta para eliminar un producto, asegurándose de que el usuario esté autenticado y sea admin
router.delete("/:pid", passportCall('jwt'), authorization('admin'), deleteProduct);

export default router;
