import express, { query } from "express";
// import ProductModel from '../models/ProductModel.js';
// import data from '../data/data.js'
import Product from "../models/ProductModel.js";
import expressAsyncHandler from 'express-async-handler';
import multer from 'multer';

const productRouter = express.Router();

// productRouter.get('/products', async(req, res) => {
//     res.send(data.products);
// })

//GET ALL THE PRODUCTS
productRouter.get('/products', async(req, res)=>{
    const products = await Product.find();
    res.send(products);
});

//GET ALL THE PRODUCTS FOR THE HOME

productRouter.get('/products/home', async(req, res) => {
    const products = await Product.find().limit(5)
    res.send(products)
})

const PAGE_SIZE = 3;
productRouter.get('/search', expressAsyncHandler(async(req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';
    const price = query.price || '';
    const brand = query.brand || '';
    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter = 
    searchQuery && searchQuery !== 'all' ? {
        name: {
            $regex: searchQuery,
            $options: 'i'
        }
    } : {};

    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter = 
    rating && rating !== 'all' ? {
        $gte: Number(rating)
    } : {};

    const priceFilter = 
    price && price !== 'all' ? {
        price: {
            $gte: Number(price.split('-')[0]),
            $lte: Number(price.split('-')[1]) 
        }, 
    } : {};

    const sortOrder = 
    order === 'featured'
        ? { featured: -1 }
        : order === 'lowest'
        ? { price: 1 }
        : order === 'highest'
        ? { price: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 }

const products = await Product.find({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
})  
    .sort(sortOrder)
    .skip(pageSize * (page - 1))
    .limit(pageSize);

const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...ratingFilter,
})

    res.send({
        products,
        countProducts,
        page,
        pages: Math.ceil(countProducts / pageSize)
    });
}))

// productRouter.get('/product/:slug', async(req, res)=>{
//     const product = data.products.find((x)=>x.slug === req.params.slug);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not found'})
//     }
// })

// GET SINGLE PRODUCT

productRouter.get('/product/:slug', async(req, res)=>{
    const product = await Product.findOne({slug:req.params.slug});
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'});
    }
});

//GET CATEGORIES OF PRODUCTS

productRouter.get('/products/categories', expressAsyncHandler(async(req, res)=>{
    const categories = await Product.find().distinct('category');
    res.send(categories);
}));

//GET PRODUCTS BASED ON CATEGORY

productRouter.get('/carving', expressAsyncHandler(async( res, req, next)=>{
    const carvings = await Product.find({category:{ $elemMatch: 'Carvings & Sculptures'}});
    res.send(carvings);
    
}));

//UPDATE PRODUCT

productRouter.put('/update_product/', async(req, res)=> {
    const product = await Product.findById(req.product._id);
    if(product){
        product.slug = req.body.slug || product.slug; 
        product.artistName = req.body.artistName || product.artistName;
        product.productName = req.body.productName || product.productName;
        product.category = req.body.category || product.category;
        
        product.description = req.body.description || product.description;
        product.price = req.body.price || product.price;
        product.rating = req.body.rating || product.rating;
        product.numReviews = req.body.numReviews || product.numReviews;
        product.countInStock = req.body.countInStock || product.countInStock;

        const updateProduct = await product.save();
        res.send({
            _id: updateProduct._id,
            slug: updateProduct.slug,
            artistName: updateProduct.artistName,
            category: updateProduct.category,
            image: updateProduct.image,
            description: updateProduct.description,
            price: updateProduct.price,
            rating: updateProduct.rating,
            numReviews: updateProduct.numReviews,
            countInStock: updateProduct.countInStock
        });
    } else{
        res.status(404).send({message: 'Product Not Found'})
    }
});

//DELETE PRODUCT

productRouter.delete('/:id', expressAsyncHandler(async(req, res)=> {
    const product = await Product.findById(req.params.id);
    if(product) {
        product.remove()
    }else {
        res.status(404).send({message: 'Product Not Found'});
    }
}));

// productRouter.get('/products/:id', (req, res)=>{
//     const product = data.products.find((x)=>x._id === req.params.id);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not found'})
//     }
// })

//PRODUCT TO BE ADDED TO CART

productRouter.get('/products/:id', async(req, res)=>{
    const product = await Product.findById(req.params.id);
    if(product){
        res.send(product)
    }else{
        res.status(404).send({message: 'Product not found'})
    }
});

const multerStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        console.log(req.file)
        cb(null, './frontend/public/uploads')
    },
    filename: function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
}

const upload = multer({storage: multerStorage, fileFilter: multerFilter});
upload.single("myFile"),

// CREATE PRODUCT
productRouter.post('/product',  expressAsyncHandler(async(req, res) => {
        console.log(req.file)
        const newProduct = new Product({
        slug: req.body.slug,
        artistName: req.body.artistName,
        productName: req.body.productName,
        description: req.body.description,
        image: req.file.filename,
        price: req.body.price,
        category: req.body.category,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        countInStock: req.body.countInStock
    });

    const product = newProduct.save();
    res.send({
        _id: product._id,
        slug: product.slug,
        artistName: product.artistName,
        productName: product.productName,
        description: product.description,
        image: product.filename,
        price: product.price,
        category: product.category,
        rating: product.rating,
        numReviews: product.numReviews,
        countInStock: product.countInStock
    });
        
    // .then(data => {
    //     res.json(data)
    // })
    // .catch(error => {
    //     console.log(error)
    //     res.json({message: 'Sorry Product Not added, try again'})
    // })

}));

export default productRouter;