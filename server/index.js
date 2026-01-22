import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import UserRouter from "./routes/User.js";
import ProductRouter from "./routes/Products.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong";
  return res.status(status).json({
    success: false,
    status,
    message,
  });
});

// routes handler
app.use("/api/user/", UserRouter);
app.use("/api/products/", ProductRouter);

app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello Developers",
  });
});

// connecting to database
const connectDB = async () => {
  mongoose.set("strictQuery", true);
  await mongoose
    .connect(process.env.MONGO_DB)
    .then(() => console.log("Connected to Db"))
    .catch((err) => {
      console.error("Connection Failed");
      console.error(err);
      process.exit(1); // stop the server
    });
};

// function to start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(8080, () => console.log("Server started on port 8080"));
  } catch (error) {
    console.log(error);
  }
};

startServer();
