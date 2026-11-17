const validateProduct = require("../middleware/validateProduct");
const express = require("express");

const router = express.Router();

const {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    adjustStock,
    getLowStockProducts,
    getCategorySummary
} = require("../controllers/productController");


// POST - Create Product
router.post("/", validateProduct, createProduct);
router.get("/low-stock", getLowStockProducts);
router.get("/category-summary", getCategorySummary);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.patch("/:id/stock", adjustStock);

module.exports = router;
