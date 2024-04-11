import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sellers',
        required: true
    },
    seller_name: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        data: Buffer,
        contentType: String,
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    shipping: {
        type: String,
        default:"In Stock",
        required: true
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});
const Product = mongoose.model('Products', productSchema);

export default Product;
