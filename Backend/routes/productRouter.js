import express from "express";
// import ProductModel from '../models/ProductModel.js';
// import data from '../data/data.js'
import Product from "../models/ProductModel.js";

const productRouter = express.Router();

// productRouter.get('/products', async(req, res) => {
//     res.send(data.products);
// })

productRouter.get('/products', async(req, res)=>{
    const products = await Product.find();
    res.send(products);
})

// productRouter.get('/product/:slug', async(req, res)=>{
//     const product = data.products.find((x)=>x.slug === req.params.slug);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not found'})
//     }
// })

productRouter.get('/product/:slug', async(req, res)=>{
    const product = await Product.findOne({slug:req.params.slug});
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

// productRouter.get('/products/:id', (req, res)=>{
//     const product = data.products.find((x)=>x._id === req.params.id);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not found'})
//     }
// })

productRouter.get('/products/:id', async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

productRouter.post('/product', (req, res) => {
    const product = new Product({
        slug: req.body.slug,
        artistName: req.body.artistName,
        productName: req.body.productName,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock
   
    })
    product.save()
    .then(data => {
        res.json(data)
    })
    .catch(error => {
        console.log(error)
        res.json({message: 'Sorry Product Not added, try again'})
    })

})

export default productRouter;