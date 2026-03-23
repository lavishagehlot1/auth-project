import mongoose from "mongoose";

const productSchema = mongoose.Schema({

    productName: {
        type: String,
        required: [true, "Product name is required!"]
    },
    brandName: {
        type: String,
        required: [true, "Brand name is required!"]
    },
    price: {
        type: Number,
        required: [true, "Price is required!"]
    },
    description: {
        type: String,
        required: [true, "Description is required!"]
    }
}, 
{ timestamps: true });

const Product =  mongoose.model("Product", productSchema);
export default Product;