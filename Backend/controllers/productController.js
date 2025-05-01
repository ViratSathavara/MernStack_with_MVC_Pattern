const mongoose = require("mongoose");
const Product = require("../models/productModel");

//get all procucts
const getProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    if (!allProducts || allProducts.length === 0) {
      return res.status(404).json({ message: "There is No products" });
    }
    res.status(200).json({
      success: true,
      products: allProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// createProduct
const createProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      ...req.body, 
      productId: 1
    });
    await newProduct.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: error.message,
    });
  }
};



// Update Product

const updateProduct = async (req, res) => {
  let { id } = req.params;
  const { name, description, price, category, stock } = req.body;

  try {
    let productId = Number(id);
    if (!productId || isNaN(productId)) {
      return res.status(400).json({
        status: false,
        message: 'Invalid product ID',
      });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { productId },
      {
        name,
        description,
        price: Number(price),
        category,
        stock: Number(stock),
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: 'Product not found or not updated',
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      status: 500,
      message: 'error.message',
    });
  }
};

// delete product

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const productId = Number(id);
  if (!productId || isNaN(productId)) {
    return res.status(400).json({
      status: false,
      message: 'Invalid product ID',
    });
  }

  try {
    const deletedProduct = await Product.findOneAndDelete({ productId });

    if (!deletedProduct) {
      return res.status(404).json({
        status: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      status: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: `Error deleting product - ${error.message}`,
    });
  }
};


module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
