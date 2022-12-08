import express, { query } from "express";
// import ProductModel from '../models/ProductModel.js';
// import data from '../data/data.js'
import Product from "../models/ProductModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth, isAdmin } from "../utils.js";

const productRouter = express.Router();

// productRouter.get('/products', async(req, res) => {
//     res.send(data.products);
// })

//GET ALL THE PRODUCTS
productRouter.get("/products", async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//GET ALL THE PRODUCTS FOR THE HOME

productRouter.get("/products/home", async (req, res) => {
  const products = await Product.find().limit(5);
  res.send(products);
});

//ADMIN PAGES
const PAGE_SIZE = 10;

productRouter.get(
  "/products/admin",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const products = await Product.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await Product.countDocuments();
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

//PRODUCTS PAGES

productRouter.get(
  "/search",
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const price = query.price || "";
    const brand = query.brand || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};

    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter =
      rating && rating !== "all"
        ? {
            $gte: Number(rating),
          }
        : {};
    2;

    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

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
    });

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  })
);

// productRouter.get('/product/:slug', async(req, res)=>{
//     const product = data.products.find((x)=>x.slug === req.params.slug);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not found'})
//     }
// })

// GET SINGLE PRODUCT

productRouter.get("/product/:slug", async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

//GET CATEGORIES OF PRODUCTS

productRouter.get(
  "/products/categories",
  expressAsyncHandler(async (req, res) => {
    const categories = await Product.find().distinct("category");
    res.send(categories);
  })
);

//GET PRODUCTS BASED ON CATEGORY

// productRouter.get(
//   "/carving",
//   expressAsyncHandler(async (res, req, next) => {
//     const carvings = await Product.find({
//       category: { $elemMatch: "Carvings & Sculptures" },
//     });
//     res.send(carvings);
//   })
// );

//UPDATE PRODUCT

// productRouter.put('/update_product/', async(req, res)=> {
//     const product = await Product.findById(req.product._id);
//     if(product){
//         product.slug = req.body.slug || product.slug;
//         product.artistName = req.body.artistName || product.artistName;
//         product.productName = req.body.productName || product.productName;
//         product.category = req.body.category || product.category;

//         product.description = req.body.description || product.description;
//         product.price = req.body.price || product.price;
//         product.rating = req.body.rating || product.rating;
//         product.numReviews = req.body.numReviews || product.numReviews;
//         product.countInStock = req.body.countInStock || product.countInStock;

//         const updateProduct = await product.save();
//         res.send({
//             _id: updateProduct._id,
//             slug: updateProduct.slug,
//             artistName: updateProduct.artistName,
//             category: updateProduct.category,
//             image: updateProduct.image,
//             description: updateProduct.description,
//             price: updateProduct.price,
//             rating: updateProduct.rating,
//             numReviews: updateProduct.numReviews,
//             countInStock: updateProduct.countInStock
//         });
//     } else{
//         res.status(404).send({message: 'Product Not Found'})
//     }
// });

//DELETE PRODUCT

productRouter.delete(
  "/products/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.remove();
      res.send({ message: "Product Deleted" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

// productRouter.get('/products/:id', (req, res)=>{
//     const product = data.products.find((x)=>x._id === req.params.id);
//     if(product){
//         res.send(product)
//     }else{
//         res.status(404).send({message: 'Product not found'})
//     }
// })

//PRODUCT TO BE ADDED TO CART

productRouter.get("/products/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product not found" });
  }
});

// CREATE PRODUCT
productRouter.post(
  "/products",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newProduct = new Product({
      slug: req.body.slug,
      artistName: req.body.artistName,
      productName: req.body.productName,
      description: req.body.description,
      image: req.body.image,
      images: req.body.images,
      price: req.body.price,
      category: req.body.category,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      countInStock: req.body.countInStock,
    });

    const product = newProduct.save();
    res.send({
      _id: product._id,
      slug: product.slug,
      artistName: product.artistName,
      productName: product.productName,
      description: product.description,
      image: product.image,
      images: product.images,
      price: product.price,
      category: product.category,
      rating: product.rating,
      numReviews: product.numReviews,
      countInStock: product.countInStock,
    });
  })
);

// UPDATE PRODUCT

productRouter.put(
  "/products/:id",
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      product.artistName = req.body.artistName;
      product.productName = req.body.productName;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.images = req.body.images;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      await product.save();
      res.send({ message: "Product Updated" });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

//CREATE REVIEW
productRouter.post(
  "/products/:id/reviews",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    if (product) {
      if (product.reviews.find((x) => x.name === req.user.firstName)) {
        return res
          .status(400)
          .send({ message: "You already submitted a review" });
      }
      const review = {
        name: req.user.firstName,
        rating: Number(req.body.rating),
        comment: req.body.comment,
      };
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((a, c) => c.rating + a, 0) /
        product.reviews.length;
      const updatedProduct = await product.save();
      res.status(201).send({
        message: "Review Created",
        review: updatedProduct.reviews[updatedProduct.reviews.length - 1],
        numReviews: product.numReviews,
        rating: product.rating,
      });
    } else {
      res.status(404).send({ message: "Product Not Found" });
    }
  })
);

export default productRouter;
