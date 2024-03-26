import express from "express";
import {userRegisterController,userLoginController,testcontroller} from "../../controllers/user/authUserController.js";
import {authUserMiddleware} from "../../middlewares/User/authUserMiddleware.js";
// router object
const router = express.Router();

// routing

// Register user
router.post("/userregister", userRegisterController);


// login user
router.post("/userlogin", userLoginController);

// testing route
router.get("/test",authUserMiddleware, testcontroller);

export default router;