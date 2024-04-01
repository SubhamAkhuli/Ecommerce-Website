import sellerModel from "../../models/seller/sellerModel.js";
import { hashPassword, comparePassword } from "../../helpers/authHelper.js";
import jwt from "jsonwebtoken";
import typeModel from "../../models/Type/typeModel.js";

// Register Seller
export const sellerRegisterController = async (req, res) => {
  try {
    const { shop_name,category, name, email, password, phone, address } = req.body;
    //validations
    if (!shop_name) {
      return res.send({ message: "Shop Name is Required" });
    }
    if (!category) {
      return res.send({ message: "Type is Required" });
    }
    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    //check seller
    const exisitingseller = await typeModel.findOne({ email });
    //exisiting seller
    if (exisitingseller) {
      return res.status(200).send({
        success: false,
        message: "Email is Already Registered",
      });
    }
    //register seller
    const hashedPassword = await hashPassword(password);
    //save
    const seller = await new sellerModel({
      shop_name,
      category,
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    // Save Type
    const type = await new typeModel({
      email,
      type: "seller",
    }).save();


    res.status(201).send({
      success: true,
      message: "Seller Register Successfully",
      seller:
      {
        shop_name: seller.shop_name,
        category: seller.category,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
        type: type.type,
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Registeration",
      error,
    });
  }
};

// login Seller
export const sellerLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validations
    if (!email || !password) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //check seller
    const seller = await sellerModel.findOne({ email });
    //not found
    if (!seller) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //match password
    const isMatch = await comparePassword(password, seller.password);
    //not match
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = jwt.sign({ id: seller._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Seller Login Successfully",
      token: token,
      seller: {
        type: seller.type,
        name: seller.name,
        email: seller.email,
        phone: seller.phone,
        address: seller.address,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};


// testing route
export const testcontroller = async (req, res) => {
  try {
    res.send({ message: "Seller Auth Route" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in Test" });
  }
};