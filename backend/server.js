import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import listingRouter from "./routes/listingRoutes.js";
import reservationRouter from "./routes/reservationRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use("/users", userRouter);
app.use("/listings", listingRouter);
app.use("/reservations", reservationRouter);

const startServer = async () => {
  console.log("Connecting to Database...");
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`server runnning on port:${port}`);
    });
  } catch (error) {
    console.error("Server has some errors: ", error.message);
    process.exit(1);
  }
};

startServer();
