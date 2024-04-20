import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    buyer_name: {
      type: String,
      required: true,
    },
    orderItems: [
      {
        seler: { type: mongoose.Schema.Types.ObjectId, ref: "sellers" },
        seller_name: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
      },
    ],
    quantity: {
      type: Number,
      required: true,
    },
    total_price: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    order_status: {
      type: String,
      default: "Processing",
      required: true,
      Enumerate: ["Not Process","Processing", "Order Confirmed", "Shipped", "Delivered","Cancelled"],
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("orders", orderSchema);

export default orderModel;
