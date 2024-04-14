import express from "express";
import {sellerRegisterController,sellerLoginController,testcontroller,sellerForgotPasswordController,sellerUpdateController,sellerDeleteController,getAllSellersController,getSellerByIdController,getUnverifiedSellerController,verifySellerController,sellerVerificationController} from "../../controllers/seller/authSellerController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

// router object
const router = express.Router();

// routing

// Register seller
router.post("/sellerregister", sellerRegisterController);

// login seller
router.post("/sellerlogin", sellerLoginController);

// unverified seller
router.get("/unverifiedsellers",getUnverifiedSellerController);

// verification status of seller by id
router.get("/sellercheck/:id",sellerVerificationController);

// verify seller
router.put("/verifyseller/:id",verifySellerController);

// testing route
router.get("/test",authMiddleware, testcontroller);

// forgot password
router.post("/sellerforgotpassword", sellerForgotPasswordController);


// update seller
router.put("/sellerupdatedetails/:id",sellerUpdateController);

// get seller details
router.get("/allsellers",getAllSellersController);

// get seller details by id
router.get("/seller/:id",getSellerByIdController);

// delete seller
router.delete("/sellerdelete/:id",sellerDeleteController);

//  Protected route
router.get("/seller-auth",authMiddleware, (req, res) => {
  res.status(200).send({ok: true});
});


export default router;