import userModel from "../../models/user/userModel.js";
import { hashPassword, comparePassword } from "../../helpers/authHelper.js";
import Jwt from "jsonwebtoken";
import typeModel from "../../models/Type/typeModel.js";

// login user
export const adminLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validations
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }

    //check user
    const user = await userModel.findOne({  email });
    const type = await typeModel.findOne({ email });
    //exisiting user
    if (!user) {
      return res.status(200).send({
        success: false,
        message: "Email Id Not Registered",
      });
    }

    //compare password
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.send({ message: "Invalid Password" });
    }

    //generate token
    const token = Jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //send response
    res.status(200).send({
      success: true,
      message: "Login Successfully",
      token: token,
      user: {
        type: type.type,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
    });
  } catch (error) {
    res.status(500).send({ message: "Internal Server Error" });
  }
};