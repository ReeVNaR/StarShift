import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

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

// Sample Products Data
const sampleProducts = [
  {
    name: "RGB Gaming Mousepad",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=500",
    description: "XL RGB gaming mousepad with 7 lighting modes",
    category: "gaming"
  },
  {
    name: "Wireless Gamepad",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=500",
    description: "Professional gaming controller with vibration feedback",
    category: "gaming"  // Changed from accessories to gaming
  },
  {
    name: "Gaming T-Shirt Black",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=500",
    description: "Comfortable black gaming t-shirt with cool design",
    category: "apparel"
  },
  {
    name: "Gaming T-Shirt White",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=500",
    description: "Classic white gaming t-shirt with RGB logo",
    category: "apparel"
  },
  {
    name: "Gaming Mouse",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1586349906319-47f6647f9d5d?auto=format&fit=crop&q=80&w=500",
    description: "Ergonomic gaming mouse with 16000 DPI sensor",
    category: "gaming"  // Changed from accessories to gaming
  },
  {
    name: "Custom Phone Case",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1601593346740-925612772716?auto=format&fit=crop&q=80&w=500",
    description: "Gaming-themed phone case with shock protection",
    category: "accessories"
  },
  {
    name: "Gaming Keyboard",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=500",
    description: "RGB Mechanical Gaming Keyboard with Blue Switches",
    category: "accessories"
  },
  {
    name: "Gaming Headset",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=500",
    description: "7.1 Surround Sound Gaming Headset with Noise Cancelling",
    category: "accessories"
  },
  {
    name: "Gaming Chair",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?auto=format&fit=crop&q=80&w=500",
    description: "Ergonomic Gaming Chair with Lumbar Support",
    category: "furniture"
  },
  {
    name: "Gaming Desk",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=500",
    description: "LED Gaming Desk with Controller Stand",
    category: "furniture"
  },
  {
    name: "Gaming Monitor",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1555626906-fcf10d6851b4?auto=format&fit=crop&q=80&w=500",
    description: "27-inch 144Hz Gaming Monitor with HDR Support",
    category: "accessories"
  },
  {
    name: "Gaming Backpack",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=500",
    description: "Water-resistant Gaming Laptop Backpack with RGB",
    category: "accessories"
  },
  {
    name: "Gaming Hoodie",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1578269174936-2709b6aeb913?auto=format&fit=crop&q=80&w=500",
    description: "Comfortable Gaming Hoodie with LED Design",
    category: "apparel"
  },
  {
    name: "Gaming Speaker Set",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&q=80&w=500",
    description: "2.1 Channel Gaming Speakers with RGB Lighting",
    category: "accessories"
  },
  {
    name: "Gaming Laptop Stand",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&q=80&w=500",
    description: "Adjustable Laptop Stand with Cooling Fan",
    category: "furniture"
  }
];

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
    let products = await Product.find(query);
    
    // If no products exist at all, seed the database
    if (!products || products.length === 0) {
      await Product.deleteMany({}); // Clear existing products
      await Product.insertMany(sampleProducts);
      products = await Product.find(query);
    }

    res.json({ products });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: "Error fetching products", error });
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

// Seed Products Route
app.post("/seed-products", async (req, res) => {
  try {
    await Product.deleteMany({}); // Clear existing products
    await Product.insertMany(sampleProducts);
    res.json({ message: "Products seeded successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error seeding products", error });
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

// Add to Cart Route
app.post("/cart/add", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne({ userId: decoded.id });
    if (!cart) {
      cart = new Cart({ userId: decoded.id, items: [] });
    }

    const existingItem = cart.items.find(item => item.productId.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity || 1;
    } else {
      cart.items.push({ productId, quantity: quantity || 1 });
    }

    await cart.save();
    res.json({ message: "Added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
});

// Get Cart Route
app.get("/cart", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const cart = await Cart.findOne({ userId: decoded.id }).populate('items.productId');
    res.json({ cart: cart || { items: [] } });
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

// Remove from Cart Route
app.delete("/cart/remove/:productId", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const cart = await Cart.findOne({ userId: decoded.id });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId.toString() !== req.params.productId);
      await cart.save();
    }
    res.json({ message: "Removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Error removing from cart", error });
  }
}); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
