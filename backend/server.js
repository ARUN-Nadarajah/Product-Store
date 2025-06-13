import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoute from "./routes/productRoute.js";

const app = express();
app.use(express.json());

dotenv.config();

console.log(process.env.MONGO_URL);

app.use("/api/products", productRoute);

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`Server is running on port ${process.env.PORT}`);
  console.log("http://localhost:5001");
  
});
