import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authUserRoute from "./routes/user/authUserRoute.js";
import authSellerRoute from "./routes/seller/authSellerRoute.js";
import authAdminRoute from "./routes/admin/authAdminRoute.js";
import authProductRoute from "./routes/Product/productRoutes.js";
import authOrderRoute from "./routes/Order/orderRoutes.js";
import authWishListRoute from "./routes/wishlist/wishRoute.js";
import cors from "cors";

// load env variables
dotenv.config();

// connect to database
connectDB();

//rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes for user
app.use("/api/v1/userauth", authUserRoute);

// routes for seller
app.use("/api/v1/sellerauth", authSellerRoute);

// routes for admin
app.use("/api/v1/adminauth", authAdminRoute);

// routes for product
app.use("/api/v1/product", authProductRoute);

// route for order
app.use("/api/v1/order", authOrderRoute);

// route for wishlist
app.use("/api/v1/wishlist", authWishListRoute);

// rest api
app.get("/", (req, res) => {
  res.send("<h1> Wellcome to My Ecommerce Website</h1>");
});

// set port, listen for requests
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.DEV_MODE} on port ${PORT}`);
});
