import express from "express";
import ProductModel from '../models/ProductModel.js';

const productRoute = express.Router();

productRoute.post('/product', (req, res) => {
    const product = new ProductModel({
        artist_name: req.body.artist_name,
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        reviews: req.body.rating,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock,
        comment: req.body.comment,
        user: req.body.user
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

export default productRoute;