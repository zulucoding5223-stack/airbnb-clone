import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(404).json({
        success: false,
        message: "Not authorized. Please login.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;

    next()
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(401).json({
      sucess: false,
      message: "Token expired.",
    });
  }
};
