import { Router } from "express";
import ProductManagerDB from "../dao/ProductManagerDB.js";
const router = Router();
const pm = new ProductManagerDB();

router.get("/", async (req, res) => { 
    res.render(
        "realTimeProducts",
        {
            title: "Productos a tiempo real",
            style: "index.css",
            products: await pm.getAllProducts()
        }
    )
});

export default router;