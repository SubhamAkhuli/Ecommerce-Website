import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { getOrderByIdController, getOrdersController, paymentController, paymentTokenController } from "../../controllers/order/orderController.js";

const router = express.Router();
// payment gateway token
router.get("/braintree/token", paymentTokenController);

// payment gateway
router.post("/payment", authMiddleware, paymentController);

// Get orders by order id
router.get("/order/:id", authMiddleware, getOrderByIdController); 

// Get orders by user id
router.get("/userorders/:pid", authMiddleware, getOrdersController); // get all orders


export default router;