import express from "express";
import {
  UserRegister,
  UserLogin,
  getAllCartItems,
  addToCart,
  removeFromCart,
  getAllOrders,
  placeOrder,
  getUserFavorites,
  addToFavorites,
  removeFromFavorites,
} from "../controllers/User.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

// User
router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

// Cart
router.get("/cart", verifyToken, getAllCartItems);
router.post("/cart", verifyToken, addToCart);
router.patch("/cart", verifyToken, removeFromCart);

// Order
router.get("/order", verifyToken, getAllOrders);
router.post("/order", verifyToken, placeOrder);

// Favourites
router.get("/favorite", verifyToken, getUserFavorites);
router.post("/favorite", verifyToken, addToFavorites);
router.patch("/favorite", verifyToken, removeFromFavorites);

export default router;
