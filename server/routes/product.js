const express = require("express")
const productRouter = express.Router()
const auth = require("../middlewares/auth")
const Product = require("../models/product")

productRouter.get('/api/products', auth, async (req, res) => {
    try {
        const products = await Product.find({ category: req.query.category })
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

// Create a get request to search products and get them
productRouter.get('/api/products/search/:name', auth, async (req, res) => {
    try {
        const products = await Product.find({
            name: { $regex: req.params.name, $options: "i" }
        })
        res.json(products)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
})

module.exports = productRouter;