import userModel from "../../models/user/userModel.js";
import { hashPassword, comparePassword } from "../../helpers/authHelper.js";
import Jwt from "jsonwebtoken";
import typeModel from "../../models/Type/typeModel.js";

// Register User
export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password, phone, address,answer } = req.body;
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
    if (!answer) {
      return res.send({ message: "Answer is Required" });
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
      answer
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
        answer: user.answer,
        type: type.type,
      },
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
        message: "Invalid Credentials",
      });
    }
    //check user
    const user = await userModel.findOne({ email });
    //check user
    if (!user) {
      return res.send({
        success: false,
        message: "User Not Found, Please Register First",
      });
    }
    //check password
    const isMatch = await comparePassword(password, user.password);
    //check password
    if (!isMatch) {
      return res.send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // user type found
    const type = await typeModel.findOne({
      email: email,
    });
    const userType = type.type;
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
        answer: user.answer,
        type: userType,
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


// Forgot Password
export const userForgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
      //validations
      if (!email || !answer ) {
        return res.send({
          success: false,
          message: "Email and answer is Required",
        });
      }
      if (!newPassword) {
        return res.send({
          success: false,
          message: "New Password is Required",
        });
      }
      //check user
      const user = await userModel.findOne({ email });
      //check user
      if (!user) {
        return res.send({
          success: false,
          message: "User Not Found",
        });
      }
      //check answer
      if (answer !== user.answer) {
        return res.send({
          success: false,
          message: "Invalid answer",
        });
      }
      //response
      const hashedPassword = await hashPassword(newPassword);
      if (!hashedPassword) {
        return res.send({
          success: false,
          message: "Error in Password Reset",
        });
      }
      //update
      await userModel.findOneAndUpdate
      (
        { email: email },
        {
          password: hashedPassword,
        }
      );
      res.send({
        success: true,
        message: "Password Reset Successfully",
      });
    } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Forgot Password",
      error,
    });
  }
};
