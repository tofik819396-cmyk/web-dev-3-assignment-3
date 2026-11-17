
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Routes import
const productRoutes = require("./routes/productRoutes");
const errorHandler = require("./middleware/errorHandler");

// Environment variables
dotenv.config();

const app = express();

// Error handling middleware
app.use(errorHandler);

// Middleware
app.use(express.json());

// Database connection
connectDB();

// Product routes
app.use("/api/products", productRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Inventory Management API is Running!");
});

// Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
