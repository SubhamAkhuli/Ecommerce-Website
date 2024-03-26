import express from "express";
import {sellerRegisterController} from "../../controllers/seller/authSellerController.js";

// router object
const router = express.Router();

// routing

// Register seller
router.post("/sellerregister", sellerRegisterController);

export default router;