import express from "express";
import { adminLoginController } from "../../controllers/admin/authAdminController.js";
import {authMiddleware} from "../../middlewares/authMiddleware.js";
// router object
const router = express.Router();

// routing

// login user
router.post("/adminlogin", adminLoginController);

// protected route
router.get("/admin-auth",authMiddleware, (req, res) => {
  res.status(200).send({ok: true});
});

export default router;