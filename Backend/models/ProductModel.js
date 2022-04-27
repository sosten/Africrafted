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

const productShema = mongoose.Schema(
    {
        slug: { type: String, required: true },
        artistName: { type: String, required: true },
        ProductName: { type: String,required: true },
        category: { type: String, required: true },
        image: { type: String, required: true },
        description: { type: String, required: true},
        price: { type: Number, require: true, default: 0 },
        rating: { type: Number, default: 0 },
        numReviews: { type: Number, default: 0 },
        countInstock: { type: Number, require: true, default: 0 },
    },
    {
        timestamps: true
    }
);

const Product = mongoose.model("Product", productShema);

export default Product;