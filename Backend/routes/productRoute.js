import express from "express";
// import ProductModel from '../models/ProductModel.js';
// import data from '../data/data.js'
import Product from "../models/ProductModel.js";

const productRoute = express.Router();

// productRoute.get('/products', async(req, res) => {
//     res.send(data.products);
// })

productRoute.get('/products', async(req, res)=>{
    const products = await Product.find();
    res.send(products);
})

// productRoute.get('/product/:slug', async(req, res)=>{
//     const product = data.products.find((x)=>x.slug === req.params.slug);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not found'})
//     }
// })

productRoute.get('/product/:slug', async(req, res)=>{
    const product = await Product.findOne({slug:req.params.slug});
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

// productRoute.get('/products/:id', (req, res)=>{
//     const product = data.products.find((x)=>x._id === req.params.id);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not found'})
//     }
// })

productRoute.get('/products/:id', async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
})

// productRoute.post('/product', (req, res) => {
//     const product = new ProductModel({
//         artist_name: req.body.artist_name,
//         name: req.body.name,
//         description: req.body.description,
//         image: req.body.image,
//         price: req.body.price,
//         category: req.body.category,
//         rating: req.body.rating,
//         reviews: req.body.rating,
//         numReviews: req.body.numReviews,
//         countInStock: req.body.countInStock,
//         comment: req.body.comment,
//         user: req.body.user
//     })
//     product.save()
//     .then(data => {
//         res.json(data)
//     })
//     .catch(error => {
//         console.log(error)
//         res.json({message: 'Sorry Product Not added, try again'})
//     })

// })

export default productRoute;