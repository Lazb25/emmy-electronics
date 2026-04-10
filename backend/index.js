const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()); // This allows the server to read the data you send

// 1. Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  description: String
});

const Product = mongoose.model('Product', productSchema);

// 2. GET Route (Already working)
app.get('/api/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// 3. POST Route (THE MISSING PIECE)
// This is what the "Publish Product" button talks to
app.post('/api/products', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Error saving product" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));