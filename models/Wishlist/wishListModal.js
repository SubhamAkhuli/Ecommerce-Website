import mongoose from "mongoose";

const wishListSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      seller: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
      seller_name: { type: String, required: true },
      name: { type: String, required: true },
      brand:{type: String,required: true},
      description:{type: String, required: true },
      price: { type: Number, required: true },
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
    },
  },
  { timestamps: true }
);

const WishList = mongoose.model("WishList", wishListSchema);

export default WishList;
