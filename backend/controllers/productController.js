import mongoose from "mongoose";
import Product from "../models/product.js";


export const getProducts =  async(req,res) =>{
  try{
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  }catch(e){
    console.log("error message", e);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;

  if (
    !product.name ||
    !product.price ||
    !product.image ||
    !product.description
  ) {
    res.status(400).json({ success: false, message: "All fields are required" });
  }

  const newProduct = new Product(product);
  try {
    newProduct.save();
    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (e) {
    console.log("error message", e);
    res.status(500).json({ success: false, message: "Failed to add product" });
  }
};

export const deleteProduct = async (req, res) => {
  const {id} = req.params;
  
  try{
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Product deleted successfully" });
  }catch(e){
    console.log("error message", e);
    res.status(500).json({ success: false, message: "Failed to delete product" });
  }

};

export const updateProduct = async (req,res) => {
  const {id} = req.params;
  const product = req.body;

  if(!mongoose.isValidObjectId(id)){
    res.status(400).json({ success: false, message: "Invalid product id" });
  }

  try{
    await Product.findByIdAndUpdate(id, product, { new: true });
    res.status(200).json({ success: true, message: "Product updated successfully" });
  }catch(e){
    console.log("error message", e);
    res.status(500).json({ success: false, message: "Failed to update product" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" })
    }
    res.json({ success: true, data: product })
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" })
  }
}