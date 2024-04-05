import express from "express";
import {userRegisterController,userLoginController,testcontroller,userForgotPasswordController} from "../../controllers/user/authUserController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing

// Register user
router.post("/userregister", userRegisterController);


// login user
router.post("/userlogin", userLoginController);

// testing route
router.get("/test",authMiddleware, testcontroller);

// forgot password
router.post("/userforgotpassword", userForgotPasswordController);

// Protected route
router.get("/user-auth",authMiddleware, (req, res) => {
  res.status(200).send({ok: true});
});

export default router;