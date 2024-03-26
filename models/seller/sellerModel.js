import mongoose from "mongoose";

const sellorSchema = mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone:{
        type: Number,
        required: true,
    },
    address:{
        type: String,
        required: true,
    }
    },
    {timestamps: true},);

const Seller = mongoose.model("sellers", sellorSchema);

export default Seller;