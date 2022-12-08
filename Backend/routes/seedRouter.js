import express from "express";
import data from "../data/data.js";
import Product from "../models/ProductModel.js";

const seedRouter = express.Router();

seedRouter.get('/seed', async(req, res)=>{
    await Product.remove({});
    const createProduct = await Product.insertMany(data.products);
    res.send({ createProduct });
});

export default seedRouter;