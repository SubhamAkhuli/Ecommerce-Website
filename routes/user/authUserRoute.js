import express from "express";
import {userRegisterController,userLoginController} from "../../controllers/user/authUserController.js";

// router object
const router = express.Router();

// routing

// Register user
router.post("/userregister", userRegisterController);


// login user
router.post("/userlogin", userLoginController);

export default router;