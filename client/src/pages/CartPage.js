import React from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";

const CartPage = () => {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [instance, setInstance] = useState(null);

  // Group items in the cart by product ID and calculate quantities
  const groupCartItems = () => {
    const groupedCart = cart.reduce((acc, item) => {
      const existingItem = acc.find(
        (cartItem) => cartItem.product._id === item._id
      );
      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.price;
      } else {
        acc.push({
          product: item,
          quantity: 1,
          totalPrice: item.price,
        });
      }
      return acc;
    }, []);
    return groupedCart;
  };

  // Calculate total price of grouped cart items
  const calculateTotalPrice = () => {
    return groupCartItems().reduce((total, item) => total + item.totalPrice, 0);
  };

  // Calculate total quantity of items in the cart
  const calculateTotalQuantity = () => {
    return groupCartItems().reduce((total, item) => total + item.quantity, 0);
  };

  // Remove item from cart
  const removeCartItem = (pid) => {
    try {
      const myCart = cart.filter((item) => item._id !== pid);
      setCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
      toast.success("Item removed from cart");
    } catch (error) {
      console.log(error);
    }
  };

  // Get client token for braintree
  const getClientToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.token);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getClientToken();
  }, [auth?.token, cart]);

  // Handle payment
  const handelPayment = async () => {
    try {
      setPaymentSuccess(true);
      const { nonce } = await instance.requestPaymentMethod();
      const {data} = await axios.post(
        `http://localhost:8080/api/v1/product/payment`,
        {
          buyer: auth?.user?.id,
          buyer_name: auth?.user?.name,
          shippingAddress: auth?.user?.address,
          email: auth?.user?.email,
          total_price: calculateTotalPrice(),
          quantity: calculateTotalQuantity(),
          cart: groupCartItems(),
          nonce,
        }
      );
      if (data.error) {
        toast.error(data.error);
        setPaymentSuccess(false);
        return;
      }
      else{
        setPaymentSuccess(false);
        localStorage.removeItem("cart");
        setCart([]);
        navigate("/dashboard/user/orders");
        toast.success(data.message);

      }   
    } catch (error) {
      console.log(error);
      toast.error("Payment failed. Please try again.");
      setPaymentSuccess(false);
    }
  };

  return (
    <>
      <Header />
      <div className=" container" style={{ minHeight: "69.8vh" }}>
        <div className="row">
          <div className="col-md-12">
            <h3 className="text-center bg-light p-2 mb-1">
              {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
            </h3>
            <h6 className="text-center text-primary">
              {groupCartItems().length
                ? `You have ${calculateTotalQuantity()} item${
                    calculateTotalQuantity() === 1 ? "" : "s"
                  } in your cart ${
                    auth?.token ? "" : "Please log in to checkout!"
                  }`
                : "Your cart is empty."}
            </h6>
          </div>
        </div>
        <div className="row mb-1">
          <div className="col-md-5 p-0 m-0">
            {groupCartItems().map(({ product, quantity, totalPrice }) => (
              <div
                className="row card flex-row mb-1"
                style={{ boxShadow: "0 0 10px #ccc" }}
                key={product._id}
              >
                <div className="col-md-3 m-2">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img-top"
                    alt={product.name}
                    style={{
                      marginTop: "30px",
                      width: "100px",
                      height: "100px",
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="col-md-8 mt-2">
                  <h6>{product.name}</h6>
                  <p style={{ marginBottom: "0px" }}>
                    {product.description.substring(0, 30)}.....
                  </p>
                  <p style={{ marginBottom: "0px" }}>₹{product.price}</p>
                  <p style={{ marginBottom: "0px" }}>Quantity: {quantity}</p>
                  <p>Total Price: ₹{totalPrice}</p>
                  <button
                    className="btn btn-danger btn-sm mb-2"
                    onClick={() => removeCartItem(product._id)}
                  >
                    <i className="bi bi-trash3-fill"></i> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-6 m-4 text-center">
            <h2>Cart Summary</h2>
            <p>Total | Checkout | Payment</p>
            <hr />
            <h4>Total: ₹{calculateTotalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h5>Delivery Address: {auth?.user?.address}</h5>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Change Delivery Address
                  </button>
                </div>
                {groupCartItems().length !== 0 && clientToken && (
                  <>
                    <DropIn
                      className="mb-3 p-3"
                      options={{
                        authorization: clientToken,
                        card: {
                          cardholderName: {
                            required: true,
                          },
                        },
                        googlePay: {
                          googlePayVersion: 2,
                          merchantId: `${process.env.REACT_APP_BRAINTREE_MERCHANT_ID}`,
                        },
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={handelPayment}
                      disabled={
                        !auth?.user?.address || !instance || paymentSuccess
                      }
                    >
                      {paymentSuccess ? "Processing..." : "Pay Now"}
                    </button>
                  </>
                )}
              </>
            ) : (
              <div className="mb-3">
                {auth?.token ? (
                  <button
                    className="btn btn-warning"
                    onClick={() => navigate("/dashboard/user/profile")}
                  >
                    Change Delivery Address
                  </button>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={() =>
                      navigate("/login", {
                        state: "/cart",
                      })
                    }
                  >
                    Please Login to checkout
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
