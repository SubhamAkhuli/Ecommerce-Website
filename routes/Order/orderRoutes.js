import express from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { acceptOrderController, getOrderByIdController, getOrdersController, getSellerOrdersController, orderStatusUpdateController, paymentController, paymentTokenController, rejectOrderController } from "../../controllers/order/orderController.js";

const router = express.Router();
// payment gateway token
router.get("/braintree/token", paymentTokenController);

// payment gateway
router.post("/payment", authMiddleware, paymentController);

// Get orders by order id
router.get("/getone-order/:id", authMiddleware, getOrderByIdController); 

// Get orders by user id
router.get("/userorders/:pid", authMiddleware, getOrdersController); // get all orders

// Get orders by seller id
router.get("/seller-orders/:sid", authMiddleware, getSellerOrdersController); // get all orders

// accept order by seller
router.put("/accept-order/:id", authMiddleware, acceptOrderController);

// reject order by seller
router.put("/reject-order/:id", authMiddleware, rejectOrderController);

// order status update by seller
router.put("/order-status-update/:id", authMiddleware, orderStatusUpdateController);

export default router;