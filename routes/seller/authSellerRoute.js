import express from "express";
import {sellerRegisterController,sellerLoginController,testcontroller} from "../../controllers/seller/authSellerController.js";
import {authSellerMiddleware} from "../../middlewares/Seller/authSellerMiddleware.js";

// router object
const router = express.Router();

// routing

// Register seller
router.post("/sellerregister", sellerRegisterController);

// login seller
router.post("/sellerlogin", sellerLoginController);

// testing route
router.get("/test",authSellerMiddleware, testcontroller);

//  Protected route
router.get("/seller-auth",authSellerMiddleware, (req, res) => {
  res.status(200).send({ok: true});
});


export default router;