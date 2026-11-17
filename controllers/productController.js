
const Product = require("../models/Product");

// Create New Product
const createProduct = async (req, res) => {
    try {
        const { name, category, price, quantity, lowStockThreshold } = req.body;

        const product = await Product.create({
            name,
            category,
            price,
            quantity,
            lowStockThreshold
        });

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getAllProducts = async (req, res) => {
    try {
        const {
            category,
            minPrice,
            maxPrice,
            sortBy = "createdAt",
            order = "desc",
            page = 1,
            limit = 10
        } = req.query;

        const filter = {};

        // Category filter
        if (category) {
            filter.category = category;
        }

        // Price filter
        if (minPrice !== undefined || maxPrice !== undefined) {
            filter.price = {};

            if (minPrice !== undefined) {
                filter.price.$gte = Number(minPrice);
            }

            if (maxPrice !== undefined) {
                filter.price.$lte = Number(maxPrice);
            }
        }

        // Pagination
        const pageNumber = Math.max(1, parseInt(page) || 1);
        const pageLimit = Math.min(100, Math.max(1, parseInt(limit) || 10));
        const skip = (pageNumber - 1) * pageLimit;

        // Sorting
        const allowedSortFields = [
            "name",
            "price",
            "quantity",
            "createdAt"
        ];

        const sortField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";

        const sortOrder = order === "asc" ? 1 : -1;

        const products = await Product.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(pageLimit);

        const totalProducts = await Product.countDocuments(filter);

        res.status(200).json({
            success: true,
            totalProducts,
            currentPage: pageNumber,
            totalPages: Math.ceil(totalProducts / pageLimit),
            data: products
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid Product ID"
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Invalid Product ID"
        });
    }
};

const adjustStock = async (req, res) => {
    try {
        const { quantity } = req.body;

        if (!Number.isInteger(quantity) || quantity === 0) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be a non-zero integer"
            });
        }

        const product = await Product.findOneAndUpdate(
            {
                _id: req.params.id,
                quantity: { $gte: quantity < 0 ? -quantity : 0 }
            },
            {
                $inc: { quantity: quantity }
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!product) {
            return res.status(400).json({
                success: false,
                message: "Product not found or insufficient stock"
            });
        }

        res.status(200).json({
            success: true,
            message: "Stock adjusted successfully",
            data: product
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        });
    }
};

const getLowStockProducts = async (req, res) => {
    try {
        const products = await Product.find({
            $expr: {
                $lte: ["$quantity", "$lowStockThreshold"]
            }
        });

        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getCategorySummary = async (req, res) => {
    try {
        const summary = await Product.aggregate([
            {
                $group: {
                    _id: "$category",
                    totalProducts: { $sum: 1 },
                    totalQuantity: { $sum: "$quantity" },
                    totalValue: {
                        $sum: {
                            $multiply: ["$price", "$quantity"]
                        }
                    }
                }
            },
            {
                $sort: { _id: 1 }
            }
        ]);

        res.status(200).json({
            success: true,
            data: summary
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    adjustStock,
    getLowStockProducts,
    getCategorySummary
};