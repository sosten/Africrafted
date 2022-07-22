import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

const categoryRouter = express.Router();

//CREATE CATEGORY

categoryRouter.post('/category', expressAsyncHandler(async(req, res) => {
    const newCategory = new Category ({category: req.body.category});
    const category =  newCategory.save()
    res.send(
        {
            _id : category._id,
            category: category.category
        }
    );
}));

//GET ALL CATEGORIES

categoryRouter.get('/product_categories', expressAsyncHandler(async(req, res) => {
    const category = await Category.find();
    res.send(category);
}));

export default categoryRouter;