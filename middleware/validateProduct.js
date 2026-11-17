const validateProduct = (req, res, next) => {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        });
    }

    if (typeof price !== "number" || price < 0) {
        return res.status(400).json({
            success: false,
            message: "Price must be a non-negative number"
        });
    }

    if (!Number.isInteger(quantity) || quantity < 0) {
        return res.status(400).json({
            success: false,
            message: "Quantity must be a non-negative integer"
        });
    }

    next();
};

module.exports = validateProduct;