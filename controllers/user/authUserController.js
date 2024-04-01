import userModel from "../../models/user/userModel.js";
import { hashPassword, comparePassword } from "../../helpers/authHelper.js";
import Jwt from "jsonwebtoken";
import typeModel from "../../models/Type/typeModel.js";

// Register User
export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
    //validations
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
    //check user
    const exisitingUser = await typeModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Email Id Already Registered",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();


    // Save Type
    const type = await new typeModel({
      email,
      type: "user",
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
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

// Login User
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validations
    if (!email || !password) {
      return res.send({
        success: false,
        message: "Invalid Credentials1",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    //check user
    if (!user) {
      return res.send({
        success: false,
        message: "Invalid Credentials2",
      });
    }
    //check password
    const isMatch = await comparePassword(password, user.password);
    //check password
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Invalid Credentials3",
      });
    }
    //token
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //response
    res.send({
      success: true,
      message: "Login Successfully",
      token: token,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
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


// Test Controller
export const testcontroller = async (req, res) => {
  try {
    res.send({ message: "User Auth Route" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error in Test" });
  }
};