import express from "express";
import { getUser, loginUser } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);

export default userRouter;
