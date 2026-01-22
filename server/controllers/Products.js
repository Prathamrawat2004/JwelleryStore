import mongoose from "mongoose";
import Products from "../models/Products.js";
import { createError } from "../error.js";

// adding products to database
export const addProducts = async (req, res, next) => {
  try {
    const productsData = req.body;

    if (!Array.isArray(productsData)) {
      return next(
        createError(400, "Invalid request. Expected an array of products!"),
      );
    }

    // array to store the products
    const createdProducts = [];

    // traversing each product
    for (const productInfo of productsData) {
      const { title, name, desc, img, price, sizes, category } = productInfo;

      const product = new Products({
        title,
        name,
        desc,
        img,
        price,
        sizes,
        category,
      });
      const createdProduct = await product.save();

      // adding to array
      createdProducts.push(createdProduct);
    }

    return res
      .status(201)
      .json({ message: "Products added successfully!", createdProducts });
  } catch (error) {
    next(error);
  }
};

// get products from database
export const getproducts = async (req, res, next) => {
  try {
    let { categories, minPrice, maxPrice, sizes, search } = req.query;
    sizes = sizes?.split(",");
    categories = categories?.split(",");

    const filter = {};

    if (categories && Array.isArray(categories)) {
      filter.category = { $in: categories }; // Match products in any of the specified categories
    }

    if (minPrice || maxPrice) {
      filter["price.org"] = {};
      if (minPrice) {
        filter["price.org"]["$gte"] = parseFloat(minPrice);
      }
      if (maxPrice) {
        filter["price.org"]["$lte"] = parseFloat(maxPrice);
      }
    }

    if (sizes && Array.isArray(sizes)) {
      filter.sizes = { $in: sizes }; // Match products in any of the specified sizes
    }

    if (search) {
      filter.$or = [
        { title: { $regex: new RegExp(search, "i") } }, // Case-insensitive title search
        { desc: { $regex: new RegExp(search, "i") } }, // Case-insensitive description search
      ];
    }

    const products = await Products.find(filter);
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// get products based on ID
export const getProductById = async (req, res, next) => {
  try {

    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid product ID"));
    }

    const product = await Products.findById(id);
    if (!product) {
      return next(createError(404, "Product not found"));
    }

    return res.status(200).json(product);
    
  } catch (err) {
    return next(error);
  }
};
