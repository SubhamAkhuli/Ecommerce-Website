import productModel from "../../models/product/productModel.js";
import fs from "fs";
// import formidable from "formidable";


// create product
export const createProductController = async (req, res) => {
    try {
        const { seller,seller_name,name, price, description,brand, category, quantity, shipping } = req.fields;
        const {image} = req.files;
        // validations
        switch (true) {
            case !seller:
                return res.send({ message: "Seller is Required" });
            case !seller_name:
                return res.send({ message: "Seller Name is Required" });
            case !name:
                return res.send({ message: "Name is Required" });
            case !price:
                return res.send({ message: "Price is Required" });
            case !description:
                return res.send({ message: "Description is Required" });
            case !category:
                return res.send({ message: "Category is Required" });
            case !quantity:
                return res.send({ message: "Quantity is Required" });
            case !brand:
                return res.send({ message: "Brand is Required" });
            case image && image.size > 3000000:
                return res.send({ message: "Image should be less than 3MB" });
        }  

        //Add product
        const products = new productModel({...req.fields});
        if (image) {
            products.image.data = fs.readFileSync(image.path);
            products.image.contentType = image.type;
        }
        // console.log(req.fields)
        await products.save();
        res.status(200).send({
            success: true,
            message: "Product Created Successfully",
            products,
        });
        // console.log(products);
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Create",
            error,
        });

    }
}

// Get all products
export const getAllProductController = async (req, res) => {
    try {
        const products = await productModel.find().populate("category").select("-image").limit(12).sort({ "seller_name": 1});
        return res.status(200).send({
            success: true, 
            countTotal: products.length,
            message: "All Products",
            products,
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get",
            error,
        });

    }
}

// Get by seller id  products
export const getProductController = async (req, res) => {
    try {
        if (req.params.id) {
            const products = await productModel.find({seller:req.params.id}).populate("category").select("-image").limit(12).sort({ createdAt: -1 });
            return res.status(200).send({
                success: true,
                countTotal: products.length,
                message: "All Products",
                products,
            });
        }
        else {
            return res.status(400).send({
                success: false,
                message: "Seller ID is required",
            });
    }
}
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get",
            error,
        });

    }
}

// Get single product
export const getSingleProductController = async (req, res) =>
{   if (!req.params.pid) {
        return res.status(400).send({
            success: false,
            message: "Product Id is Required",
        });
    }
    else {
        try {
            const product = await productModel.findById(req.params.pid).select("-image").populate("category");
            res.status(200).send({
                success: true,
                message: "Product",
                product,
            });
        }
        catch(error){
            console.log(error)
            res.status(500).send({
                success: false,
                message: "Error in Get single product",
                error,
            });

        }
    }
}

// Get photo
export const productPhotoController = async (req, res) => {
    try {
        const product = await productModel.findById(req.params.pid);
        if (product.image.data) {
            res.set("Content-Type", product.image.contentType);
            return res.send(product.image.data);
        }
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Get",
            error,
        });

    }
}


// Update product

export const updateProductController = async (req, res) => {
try {
    const { name, description, price, brand, quantity,shipping } = req.fields;
    const { image } = req.files;
    const { pid } = req.params;
    const product = await productModel.findByIdAndUpdate(
        pid,
        { name, description, price, brand, quantity, shipping },
        { new: true }
    );
    if (image) {
        product.image.data = fs.readFileSync(image.path);
        product.image.contentType = image.type;
    }
    await product.save();
    res.status(200).send({
        success: true,
        message: "Product Updated Successfully",
        product,
    });
}
catch(error){
    console.log(error)
    res.status(500).send({
        success: false,
        message: "Error in Update",
        error,
    });

}
}


// Delete product

export const deleteProductController = async (req, res) => {
    try {
        const product = await productModel.findByIdAndDelete(req.params.pid);
        if (!product) {
            return res.status(400).send({
                success: false,
                message: "Product not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Product Deleted Successfully",
        });
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in Delete",
            error,
        });

    }
}







