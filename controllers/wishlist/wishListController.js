import WishList from "../../models/Wishlist/wishListModal.js";
import productModel from "../../models/product/productModel.js";

// add product to wishlist
export const addToWishlistController = async (req, res) => {
  try {
  const { product } = req.body;
    const productData = await productModel
        .findById(product._id)
        .exec();
    if (!productData) {
        return res.status(404).json({ message: "Product not found" });
        }
    const wishList = await WishList
        .findOne({ "product._id": product._id, user: req.user._id })
        .exec();
    if (wishList) {
        return res.status(200).json({ message: "Product already in wishlist" });
        }
    const newWishList = new WishList({
        user: req.user._id,
        product: product,
        });
    await newWishList.save();
    res.status(201).json({ message: "Product add in wishlist succesfully",newWishList });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

// get all wishlist by user id
export const getUserWishlistController = async (req, res) => {
    const { id } = req.params;
    try {
        const wishList = await WishList.find({ user: id }).sort({ createdAt: -1 })
        .exec();
        res.json(wishList);
    } catch (error) {
        // console.log(error);
        res.status(404).json({ message: error.message });
    }
    };


// remove product from wishlist

export const removeFromWishlistController = async (req, res) => {
    const { id } = req.params;
    try {
        const wishList = await WishList.findByIdAndDelete(id);
        if (!wishList) {
        return res.status(404).json({ message: "Product not found in wishlist" });
        }
        res.status(200).json({ message: "Product removed from wishlist" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
    };

    