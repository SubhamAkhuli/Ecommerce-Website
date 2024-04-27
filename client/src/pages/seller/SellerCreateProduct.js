import React from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import SellerMenu from "../../pages/seller/SellerMenu";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../../context/auth";
import {useNavigate} from "react-router-dom";

const SellerCreateProduct = () => {

  const navigate = useNavigate();
  const [user] = useAuth();
  const SellerId = user?.user?.id || "N/A";
  const category = user?.user?.category || "N/A";
  const Sellername = user?.user?.name || "N/A";
  const [product, setProduct] = useState({
    seller: SellerId,
    seller_name: Sellername,
    name: "",
    description: "",
    price: "",
    brand: "",
    quantity: "",
    category: category,
    image: "",
  });

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
    // console.log(product);
    e.preventDefault();
    try {
      const { name, description, price, category, brand, quantity, image } =
        product;
      if (!name) {
        toast.error("Product Name is Required");
      } else if (!description) {
        toast.error("Product Description is Required");
      } else if (!price) {
        toast.error("Product Price is Required");
      } else if (!category) {
        toast.error("Product Category is Required");
      } else if (!image) {
        toast.error("Product Image is Required");
      } else if (!brand) {
        toast.error("Product Brand is Required");
      } else if (!quantity) {
        toast.error("Product Quantity is Required");
      } else {
        //
        // console.log(product);
        const productData = new FormData();
        productData.append("seller", SellerId);
        productData.append("seller_name", Sellername);
        productData.append("name", name);
        productData.append("brand", brand);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("quantity", quantity);
        productData.append("quantity", quantity);
        productData.append("image", image);
        productData.append("category", category);
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/product/create-product`,
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
              <div className="card-header text-center">
                <h3>Add Product</h3>
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
                      name="brand"
                      required
                    />
                    <label htmlFor="floatingInput">Product Brand</label>
                  </div>
                  <div className="form-floating mb-3">
                    <textarea
                      className="form-control"
                      style={{ height: "100px"}}
                      placeholder="Product Description"
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
                      onChange={onchange}
                      name="price"
                      required
                    />
                    <label htmlFor="floatingInput">Product Price</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      disabled
                      className="form-control"
                      id="floatingInput"
                      value={category}
                      placeholder="Enter your Product Category"
                      name="category"
                      required
                    />
                    <label htmlFor="floatingInput">Product Category</label>
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
                      required
                    />
                    <label htmlFor="floatingInput">Product Image</label>
                  </div>
                  {photoPreview && (
                    <div className="mb-3">
                      <img
                        src={photoPreview}
                        alt="Product Preview"
                        style={{ height: "100px", width: "200px", objectFit: "contain"
                          }}
                      />
                    </div>
                  )}
                  <button type="submit" className="btn btn-primary">
                    Add Product
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

export default SellerCreateProduct;
