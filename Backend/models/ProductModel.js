import mongoose from "mongoose";

// const reviewsSchema = mongoose.Schema({
//     name: {
//         type: String
//     },

//     comment: {
//         type: String
//     },

//     rating: {
//         type: Number
//     },

//     numReviews: {
//         type: Number,
//         default: 0
//     },

//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         require: true,
//         ref: "User"
//     }
// })

const productSchema = mongoose.Schema(
    {
        slug: { type: String, required: true },
        artistName: { type: String, required: true },
        productName: { type: String,required: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: "Category"
        },
        image: { type: String, required: false },
        description: { type: String, required: true},
        price: { type: Number, required: true, default: 0 },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        countInStock: { type: Number, default: 0, required: true }
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productSchema);

export default Product;