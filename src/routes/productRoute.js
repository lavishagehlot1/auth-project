import express from "express";
import { addProduct, getProducts } from "../controller/productController.js";
import { middleware } from "../middleware/middleware.js";
const productRouter = express.Router();


productRouter.post('/add', middleware, addProduct);
productRouter.get('/products', middleware, getProducts);

export default productRouter;