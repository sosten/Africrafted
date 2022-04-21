import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema({
    name: {
        type: String
    },

    comment: {
        type: String
    },

    rating: {
        type: Number
    },

    numReviews: {
        type: Number,
        default: 0
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    }
})

const productShema = mongoose.Schema({
    artist_name: {
        type: String,
        require: true
    },

    name: {
        type: String,
        require: true
    },

    image: {
        type: String,
    },

    description: {
        type: String
    },

    comment: {
        type: String
    },

    price: {
        type: Number,
        require: true,
        default: 0
    },

    reviews: [reviewsSchema],

    numReviews: {
        type: Number,
        default: 0
    },

    rating: {
        type: Number,
        default: 0
    },

    countInstock: {
        type: Number,
        require: true,
        default: 0
    },
    
    date: {
        type: Date,
        default: new Date()
    }
        
})

const Product = mongoose.model("Product", productShema);

export default Product;