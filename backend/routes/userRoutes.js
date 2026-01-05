import express from "express";
import { getUser, loginUser } from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { validAccess } from "../middleware/access.js";

const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.get("/me", auth, validAccess("user"),getUser);
userRouter.post("/host-login", loginUser);
userRouter.get("/host-me", auth, validAccess("host"), getUser);

export default userRouter;
