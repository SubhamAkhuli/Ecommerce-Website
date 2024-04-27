import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SellerMenu from "./SellerMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const SellerUpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  // get product details
  const getProduct = async () => {
    try {
      const productId = params.pid || "N/A";
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/product/getone-product/${productId}`
      );
      setProduct(data.product);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while fetching product.");
    }
  };

  useEffect(() => {
    getProduct();
    // eslint-disable-next-line
  }, [params.pid]);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    brand: "",
    quantity: "",
    shipping: "",
    image: "",
  });

  // load image
  const [photoPreview, setPhotoPreview] = useState(null);

  const onchange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    const image = e.target.files[0];

    setProduct({ ...product, image: image });
    // Check if a file is selected
    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, description, price, brand, image, quantity, shipping } =
        product;

      if (!name) {
        toast.error("Product Name is Required");
      } else if (!description) {
        toast.error("Product Description is Required");
      } else if (!price) {
        toast.error("Product Price is Required");
      } else if (!brand) {
        toast.error("Product Brand is Required");
      } else if (!quantity) {
        toast.error("Product Quantity is Required");
      } else {
        const productData = new FormData();
        productData.append("name", name);
        productData.append("brand", brand);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("shipping", shipping);
        productData.append("image", image);
        const response = await axios.put(
          `${process.env.REACT_APP_API_URL}/product/update-product/${params.pid}`,
          productData
        );
        if (response.data.success) {
          toast.success(response.data.message);
          setTimeout(() => {
            navigate("/dashboard/seller/products");
          }, 10);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <>
      <Header />
      <div className="container m-3" style={{ minHeight: "56vh" }}>
        <div className="row">
          <div className="col-md-3">
            <SellerMenu />
          </div>
          <div className="col-md-9">
            <div className="card" style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}>
              <div className="card-header d-flex flex-wrap">
              <button
                  className="btn btn-primary"
                  style={{borderRadius:"5px", boxShadow:"0 0 10px #ccc"}}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  <i
                    className="bi bi-backspace me-2"
                    style={{ cursor: "pointer",marginBottom: "2px"}}
                  ></i>
                  Back
                </button>
                <h3  style={{margin:"auto"}}>Update Product Details</h3>
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Product Name"
                      onChange={onchange}
                      value={product.name}
                      name="name"
                      required
                    />
                    <label htmlFor="floatingInput">Product Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Product Brand"
                      onChange={onchange}
                      value={product.brand}
                      name="brand"
                      required
                    />
                    <label htmlFor="floatingInput">Product Brand</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      style={{ height: "100px" }}
                      placeholder="Product Description"
                      value={product.description}
                      name="description"
                      id="floatingInput"
                      onChange={onchange}
                      required
                    ></textarea>
                    <label htmlFor="floatingInput">Product Description</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="floatingNumber"
                      placeholder="Enter your Product Quantity"
                      value={product.quantity}
                      onChange={onchange}
                      name="quantity"
                      required
                    />
                    <label htmlFor="floatingInput">Product Quantity</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Product Price"
                      value={product.price}
                      onChange={onchange}
                      name="price"
                      required
                    />
                    <label htmlFor="floatingInput">Product Price</label>
                  </div>
                  <div className="form-floating mb-3">
                    <select
                      className="form-select"
                      id="floatingSelect"
                      aria-label="Floating label select example"
                      value={product.shipping}
                      onChange={onchange}
                      name="shipping"
                      required
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Out of Stock">Out of the Stock</option>
                    </select>

                    <label htmlFor="floatingInput">Product Shipping</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="floatingInput"
                      placeholder="Enter your Product Image"
                      name="image"
                      accept="image/*"
                      onChange={handleImageChange}

                    />
                    <label htmlFor="floatingInput">Product Image</label>
                  </div>
                  {photoPreview ? (
                    <div className="mb-3">
                      <img
                        src={photoPreview}
                        alt="Product Preview"
                        style={{
                          height: "100px",
                          width: "200px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  ) : (
                    <div className="mb-3">
                      <img
                        src={`${process.env.REACT_APP_API_URL}/product/product-photo/${params.pid}`}
                        alt="Product Preview"
                        style={{
                          height: "100px",
                          width: "200px",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  )}

                  <button type="submit" className="btn btn-success">
                    Save Details
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger mx-3"
                    onClick={() => navigate(-1)}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SellerUpdateProduct;
