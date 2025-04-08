import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

// Product Schema
const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  image: String,
  description: String,
  category: String,
});

const Product = mongoose.model("Product", productSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, default: 1 }
  }]
});

const Cart = mongoose.model("Cart", cartSchema);

// 📝 Register Route
app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  
  res.json({ message: "User registered successfully!" });
});

// 🔐 Login Route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// 🛡 Protected Route (Dashboard)
app.get("/dashboard", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Welcome to the dashboard!", userId: decoded.id });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Profile Route
app.get("/profile", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
});

// Products Route - Removing authentication requirement
app.get("/products", async (req, res) => {
  try {
    const { category } = req.query;
    const query = category ? { category } : {};
    const products = await Product.find(query);
    
    if (!products || products.length === 0) {
      return res.status(404).json({ message: "No products found", products: [] });
    }
    
    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: "Error fetching products", error: error.message });
  }
});

// Single Product Route
app.get("/products/:id", async (req, res) => {
  try {
    console.log('Fetching product with ID:', req.params.id);
    const product = await Product.findById(req.params.id);
    console.log('Found product:', product);
    
    if (!product) {
      console.log('Product not found');
      return res.status(404).json({ message: "Product not found" });
    }
    res.json({ product });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: "Error fetching product", error: error.message });
  }
});

// Create Product Route
app.post("/products", async (req, res) => {
  try {
    const productData = req.body;
    const sanitizedData = {
      name: productData.name,
      price: Number(productData.price),
      image: productData.image,
      description: productData.description,
      category: productData.category
    };

    const newProduct = new Product(sanitizedData);
    const savedProduct = await newProduct.save();
    
    res.status(201).json({ 
      message: "Product created successfully", 
      product: savedProduct 
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      message: "Error creating product", 
      error: error.message 
    });
  }
});

// Update Product Route
app.put("/products/:id", async (req, res) => {
  try {
    console.log('Update request received:', req.params.id, req.body);
    
    const updates = req.body;
    const productId = req.params.id;

    // Ensure all fields are properly formatted
    const sanitizedUpdates = {
      name: updates.name,
      price: Number(updates.price),
      image: updates.image,
      description: updates.description,
      category: updates.category
    };

    console.log('Sanitized updates:', sanitizedUpdates);

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      sanitizedUpdates,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      console.log('Product not found');
      return res.status(404).json({ message: "Product not found" });
    }

    console.log('Product updated:', updatedProduct);
    res.json({ product: updatedProduct });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      message: "Error updating product", 
      error: error.message 
    });
  }
});

// Delete Product Route
app.delete("/products/:id", async (req, res) => {
  try {
    console.log('Delete request received for product:', req.params.id);
    
    const productId = req.params.id;
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      console.log('Product not found');
      return res.status(404).json({ message: "Product not found" });
    }

    console.log('Product deleted:', deletedProduct);
    res.json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      message: "Error deleting product", 
      error: error.message 
    });
  }
});

// Add new categories route
app.get("/categories", async (req, res) => {
  try {
    const categories = await Product.distinct('category');
    res.json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
});

// Add middleware for token verification
const verifyToken = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Update Cart Routes
app.post("/cart/add", verifyToken, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    // Verify product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      cart = new Cart({ userId: req.userId, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    
    // Populate product details before sending response
    await cart.populate('items.productId');
    
    res.json({ message: "Added to cart", cart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ 
      message: "Error adding to cart", 
      error: error.message 
    });
  }
});

app.get("/cart", verifyToken, async (req, res) => {
  try {
    console.log('Fetching cart for user:', req.userId);
    
    const cart = await Cart.findOne({ userId: req.userId })
      .populate('items.productId');
    
    console.log('Found cart:', cart);

    if (!cart) {
      // Return empty cart instead of error
      return res.json({ cart: { items: [] } });
    }
    
    res.json({ cart });
  } catch (error) {
    console.error('Cart fetch error:', error);
    res.status(500).json({ 
      message: "Error fetching cart", 
      error: error.message 
    });
  }
});

app.delete("/cart/remove/:productId", verifyToken, async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.userId });
    
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.productId
    );
    
    await cart.save();
    await cart.populate('items.productId');
    
    res.json({ message: "Removed from cart", cart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ 
      message: "Error removing from cart", 
      error: error.message 
    });
  }
});

// Update signin route to match frontend
app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET, 
      { expiresIn: "24h" }
    );
    
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: "Error during login", error: error.message });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
