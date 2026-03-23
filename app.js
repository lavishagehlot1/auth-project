import express from "express";
import productRouter from "./src/routes/productRoute.js";

const app = express();

console.log("Express app created");

app.use(express.json());

app.use("/api/product", productRouter)

export default app;