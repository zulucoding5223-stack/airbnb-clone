import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoutes.js";
import listingRouter from "./routes/listingRoutes.js";
import reservationRouter from "./routes/reservationRoutes.js";

const app = express();
const PORT = process.env.PORT;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ================= STATIC FILES ================= */
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

/* ================= MIDDLEWARE ================= */
app.use(
  cors({
    origin:[
      "https://zulu-air-bnb-clone.netlify.app"
    ],
    credentials: true,
  })
);

app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/users", userRouter);
app.use("/listings", listingRouter);
app.use("/reservations", reservationRouter);
app.use('/', (req, res)=>{
  res.send('Api is running.')
})

/* ================= SERVER START ================= */
const startServer = async () => {
  try {
    console.log('Waiting for database to connect...');
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
