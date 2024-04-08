import express from "express";
import {sellerRegisterController,sellerLoginController,testcontroller,sellerForgotPasswordController,sellerUpdateController,sellerDeleteController} from "../../controllers/seller/authSellerController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing

// Register seller
router.post("/sellerregister", sellerRegisterController);

// login seller
router.post("/sellerlogin", sellerLoginController);

// testing route
router.get("/test",authMiddleware, testcontroller);

// forgot password
router.post("/sellerforgotpassword", sellerForgotPasswordController);


// update seller
router.put("/sellerupdatedetails/:id",sellerUpdateController);

// delete seller
router.delete("/sellerdelete/:id",sellerDeleteController);

//  Protected route
router.get("/seller-auth",authMiddleware, (req, res) => {
  res.status(200).send({ok: true});
});


export default router;