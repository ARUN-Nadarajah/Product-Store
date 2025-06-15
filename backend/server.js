import express from "express";
import dotenv from "dotenv";
import cors from "cors"; 
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";

dotenv.config(); // should come early

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());

console.log("MONGO_URL:", process.env.MONGO_URL);

app.use("/api/products", productRoute);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
});