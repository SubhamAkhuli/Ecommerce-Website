import orderModel from "../../models/order/orderModel.js";
import productModel from "../../models/product/productModel.js";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();
// Braintree gateway
const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Payment gateway token
export const paymentTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, (err, response) => {
      if (err) {
        return res.status(500).send({
          success: false,
          message: "Error in Payment Gateway",
          error: err,
        });
      }
      res.status(200).send({
        success: true,
        message: "Payment Gateway Token",
        token: response.clientToken,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Payment Gateway Token",
      error,
    });
  }
};


// Payment controller
export const paymentController = async (req, res) => {
  try {
    // Destructure request body to get relevant fields
    const {
      buyer,
      buyer_name,
      shippingAddress,
      email,
      total_price,
      quantity,
      cart,
      nonce,
    } = req.body;
    
    // Validate the input data
    if (!buyer || !buyer_name || !shippingAddress || !email || !total_price || !quantity || !cart || !nonce) {
      return res.status(400).send({
        success: false,
        message: "Missing required fields",
      });
    }

    // Calculate total amount from the cart
    let amount = total_price;

    // Initiate the transaction using Braintree
    gateway.transaction.sale(
      {
        amount: amount,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async (error, result) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: "Payment failed",
            error,
          });
        }

        // Helper function to generate order data
        function generateOrderData(cart, transaction) { 

          // Initialize order items
          let orderItems = [];
          // Populate order items from the cart
          cart.forEach((item) => {
            // Check if item contains required fields
            if (item.seller && item.seller_name && item.name && item.price && item.product && item.quantity) {
              orderItems.push({
                seller: item.seller,
                seller_name: item.seller_name,
                name: item.name,
                price: item.price,
                product: item.product,
                quantity: item.quantity,
              });
              
            } else {
              // If the item does not contain required fields, log an error
              console.error("Cart item missing required fields:", item);
              return res.status(400).send({
                success: false,
                message: "Cart item missing required fields",
              });
            }
          });

          // Return the generated order data
          return {
            buyer,
            buyer_name,
            orderItems,
            quantity,
            total_price,
            shippingAddress,
            paymentResult: {
              id: transaction.transaction.id,
              status: transaction.transaction.status,
              update_time: transaction.transaction.updatedAt,
              email_address: email,
            },
          };
        }
        // Check if the result is successful
        if (result.success) {
          // Generate order data using a helper function
          const orderData = generateOrderData(cart, result);
      
          const order = new orderModel(orderData);

          try {
            // Save the order to the database
            const data = await order.save();
            res.status(200).send({
              success: true,
              message: "Payment and order success",
              data,
            });
          } catch (err) {
            console.error("Error saving order:", err);
            return res.status(400).send({
              success: false,
              message: "Error in saving order",
              error: err,
            });
          }
        } else {
          // Handle payment failure
          console.error("Payment failure:", error, result);
          return res.status(400).send({
            success: false,
            message: "Payment failed",
            error: result.message,
          });
        }
      }
    );
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error:", error);
    res.status(500).send({
      success: false,
      message: "Error in payment controller",
      error,
    });
  }
};


// get orders by order id
export const getOrderByIdController = async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id).sort({ createdAt: -1 });
    // console.log(order);
    res.status(200).send(order);

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// get orders by user id
export const getOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ buyer: req.params.pid }).sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};


// get orders by seller id
export const getSellerOrdersController = async (req, res) => {
  try {
    const orders = await orderModel.find({ "orderItems.seller": req.params.sid }).sort({ createdAt: -1 });
    res.status(200).send(orders);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// accept order by seller

export const acceptOrderController = async (req, res) => {
  try {
    const orderId = req.params.id;

    // Check if order ID is provided
    if (!orderId) {
      return res.status(400).send({ error: 'Order ID is required' });
    }

    // Find the order by ID
    const order = await orderModel.findById(orderId);

    // Check if order exists
    if (!order) {
      return res.status(404).send({ error: 'Order not found' });
    }

    // Iterate over each item in the order
    for (const item of order.orderItems) {
      const { product, quantity } = item;

      // Find the corresponding product in the database
      const productdata = await productModel.findById(product);

      // Check if product exists
      if (!productdata) {
        console.error(`Product with ID ${product} not found`);
        continue; // Skip to the next item
      }

      // Subtract the ordered quantity from the original quantity
      const updatedQuantity = productdata.quantity - quantity;

      if(updatedQuantity < 0) {
        return res.status(200).send({
          success: false,
          message:"Product Quantity is low, please update the product quantity"
        })
      }
      else{
        // Update the product's original quantity in the database
      await productModel.findByIdAndUpdate(product, { quantity: updatedQuantity });
      } 
    }

    // Update the order status to "Order Confirmed"
    const updatedOrder = await orderModel.findByIdAndUpdate(
      orderId,
      { order_status: 'Order Confirmed' },
      { new: true }
    );

    // Send the updated order as response
    res.status(200).send({
      updatedOrder,
      success: true,
      message:"Order Confirmed Successfully"
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    res.status(500).send({ error: error.message });
  }
};



// reject order by seller

export const rejectOrderController = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, { order_status: "Not Process" }, { new: true });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// order status update by seller
export const orderStatusUpdateController = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, { order_status: req.body.order_status }, { new: true });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// cancel order by buyer
export const cancelOrderController = async (req, res) => {
  try {
    const order = await orderModel.findByIdAndUpdate(req.params.id, { order_status: "Cancelled" }, { new: true });
    res.status(200).send(order);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};