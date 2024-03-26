import mongoose from "mongoose";

const sellorSchema = mongoose.Schema({
    type: {
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
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true,
        default: "sellor",
    }
    },
    {timestamps: true},);

const Seller = mongoose.model("sellers", sellorSchema);

export default Seller;