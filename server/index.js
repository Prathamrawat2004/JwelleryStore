import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

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

