import express from "express";
import {userRegisterController,userLoginController,testcontroller,userForgotPasswordController,userUpdateController,userDeleteController,userGetAllController,userGetByIdController} from "../../controllers/user/authUserController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing

// Register user
router.post("/userregister", userRegisterController);


// login user
router.post("/userlogin", userLoginController);

// user get by id
router.get("/userdetail/:id",userGetByIdController);

// testing route
router.get("/test",authMiddleware, testcontroller);

// forgot password
router.post("/userforgotpassword", userForgotPasswordController);

// update details
router.patch("/userupdatedetails/:id",userUpdateController);

// get user details
router.get("/alluserdetails",userGetAllController);

// delete user
router.delete("/userdelete/:id",userDeleteController);



// Protected route
router.get("/user-auth",authMiddleware, (req, res) => {
  res.status(200).send({ok: true});
});

export default router;