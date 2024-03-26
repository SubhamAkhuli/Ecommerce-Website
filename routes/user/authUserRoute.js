import express from "express";
import {userRegisterController} from "../../controllers/user/authUserController.js";

// router object
const router = express.Router();

// routing

// Register user
router.post("/userregister", userRegisterController);

export default router;