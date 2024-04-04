import Jwt  from "jsonwebtoken";

// protected route
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).send({ message: "Access Denied" });
    }
    const verified = Jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Invalid Token" });
  }
};