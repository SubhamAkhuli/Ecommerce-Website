import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Import an empty image for no products available
import emptyImage from "../empty-product.jpg";

function Homepage() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedPriceRange, setSelectedPriceRange] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [productCount, setProductCount] = useState(0);

    // Get all products
    const getAllProducts = async () => {
        try {
            const { data } = await axios.get(
                `http://localhost:8080/api/v1/product/get-all-product`
            );
            setProducts(data.products);
            setFilteredProducts(data.products);
            setProductCount(data.products.length);
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while fetching products.");
        }
    };

    useEffect(() => {
        getAllProducts();
    }, []);

    // Helper function to truncate description to 15 words
    const truncateDescription = (description) => {
        const words = description.split(" ");
        if (words.length > 5) {
            return words.slice(0, 5).join(" ") + "...";
        }
        return description;
    };

    // Function to handle category change
    const handleCategoryChange = (event) => {
        const category = event.target.value;

        // If the same category is clicked again, reset the selection
        if (selectedCategory === category) {
            setSelectedCategory("");
            setFilteredProducts(products);
        } else {
            setSelectedCategory(category);
            filterProducts(category, selectedPriceRange, searchQuery);
        }
    };

    // Function to handle price range change
    const handlePriceRangeChange = (event) => {
        const priceRange = event.target.value;

        // If the same price range is selected again, reset the selection
        if (selectedPriceRange === priceRange) {
            setSelectedPriceRange("");
            filterProducts(selectedCategory, "", searchQuery);
        } else {
            setSelectedPriceRange(priceRange);
            filterProducts(selectedCategory, priceRange, searchQuery);
        }
    };

    // Function to handle search query change
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        filterProducts(selectedCategory, selectedPriceRange, event.target.value);
    };

    // Function to filter products based on category, price range, and search query
    const filterProducts = (category, priceRange, searchQuery) => {
        let filtered = products;

        // Filter by category if specified
        if (category) {
            filtered = filtered.filter(product => product.category === category);
        }

        // Filter by price range if specified
        if (priceRange) {
            switch (priceRange) {
                case "Under ₹100":
                    filtered = filtered.filter(product => product.price < 100);
                    break;
                case "₹100-₹200":
                    filtered = filtered.filter(
                        product => product.price >= 100 && product.price <= 200
                    );
                    break;
                case "₹200-₹500":
                    filtered = filtered.filter(
                        product => product.price >= 200 && product.price <= 500
                    );
                    break;
                case "₹500-₹1000":
                    filtered = filtered.filter(
                        product => product.price >= 500 && product.price <= 1000
                    );
                    break;
                case "Over ₹1,000":
                    filtered = filtered.filter(product => product.price > 1000);
                    break;
                default:
                    break;
            }
        }

        // Filter by search query if specified
        if (searchQuery) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Update filtered products and product count
        setFilteredProducts(filtered);
        setProductCount(filtered.length);
    };

    const navigate = useNavigate();

    return (
        <>
            <Header />
            <div className="container m-3" style={{ minHeight: "65.2vh" }}>
                <div className="row">
                    <div className="col-md-3">
                        <div
                            className="list-group card"
                            style={{ borderRadius: "5px", boxShadow: "0 5px 10px #ccc" }}
                        >
                            <div className="card-header">
                                <h5 className="text-center">Filter</h5>
                            </div>
                            <div className="card-body" style={{ cursor: "pointer" }}>
                                <span className="m-2">
                                    <b>Shop by Category: </b>
                                </span>
                                <ul>
                                    {[
                                        "Fashion & Apparel",
                                        "Electronics & Gadgets",
                                        "Home & Lifestyle",
                                        "Beauty & Health",
                                        "Books & Stationery",
                                        "Furniture & Home Decor",
                                        "Toys & Games",
                                        "Sports & Outdoors",
                                        "Automotive & Motorbike",
                                        "Grocery & Food",
                                        "Watch & Clocks",
                                    ].map((category, index) => (
                                        <div key={index}>
                                            <input
                                                type="radio"
                                                id={`category${index}`}
                                                className="m-2 category-radio"
                                                name="category"
                                                value={category}
                                                checked={selectedCategory === category}
                                                onClick={handleCategoryChange}
                                            />
                                            <label htmlFor={`category${index}`}>{category}</label>
                                            <br />
                                        </div>
                                    ))}
                                    {/* Option to reset category selection */}
                                    <div>
                                        <input
                                            type="radio"
                                            id="all"
                                            name="category"
                                            value=""
                                            checked={!selectedCategory}
                                            onClick={handleCategoryChange}
                                        />
                                        <label htmlFor="all">All</label>
                                    </div>
                                </ul>

                                <span className="m-2">
                                    <b>Price: </b>
                                </span>
                                {/* Convert the price range list items into a select element */}
                                <select
                                    value={selectedPriceRange}
                                    onChange={handlePriceRangeChange}
                                    className="form-select m-2"
                                >
                                    {/* Option to reset price range selection */}
                                    <option value="">All</option>
                                    <option value="Under ₹100">Under ₹100</option>
                                    <option value="₹100-₹200">₹100-₹200</option>
                                    <option value="₹200-₹500">₹200-₹500</option>
                                    <option value="₹500-₹1000">₹500-₹1000</option>
                                    <option value="Over ₹1,000">Over ₹1,000</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="d-flex flex-wrap">
                            {/* Add the search bar */}
                            <input
                                type="text"
                                placeholder="Search for products"
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="form-control mb-3"
                                style={{ width: "100%" ,borderRadius:"5px", boxShadow: "0 0 10px #ccc"}}
                            />
                            
                            {/* Show selected category and price range */}
                            {selectedCategory && (
                                <h3 className="w-100 text-center">{selectedCategory} Products</h3>
                            )}
                            {selectedPriceRange && (
                                <h5 className="w-100 text-primary">Price Range: {selectedPriceRange}</h5>
                            )}
                            {/* Show products or no products message */}
                            {productCount > 0 ? (
                                filteredProducts.map((product) => (
                                    <div
                                        className="card m-2"
                                        key={product._id}
                                        style={{
                                            width: "18rem",
                                            borderRadius: "5px",
                                            boxShadow: "0 0 10px #ccc",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => navigate(`/product-details/${product._id}`)}
                                    >
                                        <img
                                            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
                                            className="card-img-top"
                                            style={{
                                                height: "150px",
                                                objectFit: "contain",
                                                marginTop: "10px",
                                            }}
                                            alt={product.name}
                                        />
                                        <div className="card-body"  >
                                            <h5 className="card-title">{product.name}</h5>
                                            <p className="card-text">
                                                 {product.brand}
                                            </p>
                                            <p className="card-text">
                                               ₹{product.price}
                                            </p>
                                            <p className="card-text">
                                                 {truncateDescription(product.description)}
                                            </p>
                                            </div>
                                    </div>
                                ))
                            ) : (
                                <div className="pnf container">
                                    <img
                                        src={emptyImage}
                                        alt="No products available"
                                        style={{
                                            width: "500px",
                                            height: "auto",
                                            margin: "20px",
                                        }}
                                    />
                                    <h4>No products available</h4>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Homepage;
