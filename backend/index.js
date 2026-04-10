const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const products = [
  { 
    id: 1, 
    name: "Google Pixel 8 Pro", 
    price: 999, 
    category: "Smartphones",
    image: "/images/phone.jpg", // Path to your local image
    rating: 4.8,
    stock: 12
  },
  { 
    id: 2, 
    name: "Premium Laptop", 
    price: 1299, 
    category: "Laptops",
    image: "/images/laptop.jpg", 
    rating: 4.9,
    stock: 8
  },
  { 
    id: 3, 
    name: "Sony Headphones", 
    price: 349, 
    category: "Audio",
    image: "/images/headphone.jpg", 
    rating: 4.7,
    stock: 15
  }
];

app.get("/api/products", (req, res) => res.json(products));

app.get("/api/products/:id", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  product ? res.json(product) : res.status(404).send("Product not found");
});

app.post("/api/checkout", (req, res) => {
  res.json({ message: "Success", orderId: Date.now() });
});

app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));