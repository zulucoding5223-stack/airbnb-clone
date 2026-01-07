import userModel from "../models/userSchema.js";
import jwt from "jsonwebtoken";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all fields. (email, password)",
      });
    }

    const user = await userModel.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Incorrect credentials.",
      });
    }

    const isMatch = password === user.password;
    if (!isMatch) {
      return res.status(401).json({
        sucess: false,
        message: "Incorrect credentials.",
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      success: true,
      token,
      user:{
        id: user._id,
        username: user.username,
        role: user.role,
        image: user.image,
      }
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      sucess: false,
      message: "Internal server error when logging in.",
    });
  }
};

export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      user: {
        username: user.username,
        role: user.role
      },
    });
  } catch (error) {
    console.error("Error: ", error.message);
    return res.status(500).json({
      sucess: false,
      message: "Internal server error when loading profile data.",
    });
  }
};
