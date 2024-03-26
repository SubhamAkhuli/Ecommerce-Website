import sellerModel from "../../models/seller/sellerModel.js";
import { hashPassword , comparePassword} from "../../helpers/authHelper.js";
import jwt from "jsonwebtoken";

// Register Seller
export const sellerRegisterController = async (req, res) => {
  try {
    const { type, name, email, password, phone, address } = req.body;
    //validations
    if (!type) {
      return res.send({ error: "Type is Required" });
    }
    if (!name) {
      return res.send({ error: "Name is Required" });
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
    const exisitingseller = await sellerModel.findOne({ email });
    //exisiting seller
    if (exisitingseller) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register seller
    const hashedPassword = await hashPassword(password);
    //save
    const seller = await new sellerModel({
      type,
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "Seller Register Successfully",
      seller,
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
      return res.send({ message: "invalid credentials " });
    }
    //check seller
    const seller = await sellerModel.findOne({ email });
    //not found
    if (!seller) {
      return res.status(200).send({
        success: false,
        message: "Seller not found",
      });
    }
    //match password
    const isMatch = await comparePassword(password, seller.password);
    //not match
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
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
