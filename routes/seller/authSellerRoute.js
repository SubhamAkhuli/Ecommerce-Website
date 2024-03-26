import express from "express";
import {sellerRegisterController,sellerLoginController} from "../../controllers/seller/authSellerController.js";

// router object
const router = express.Router();

// routing

// Register seller
router.post("/sellerregister", sellerRegisterController);

// login seller
router.post("/sellerlogin", sellerLoginController);

export default router;