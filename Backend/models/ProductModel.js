import mongoose from "mongoose";

const reviewsSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    slug: { type: String, required: true },
    artistName: { type: String, required: true },
    productName: { type: String, required: true },
    category: { type: String, require: true },
    image: { type: String, required: false },
    images: [String],
    description: { type: String, required: true },
    price: { type: Number, default: 0, required: true },
    countInStock: { type: Number, default: 0, required: true },
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: [reviewsSchema],
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
