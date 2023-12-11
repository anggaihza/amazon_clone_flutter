const express = require("express")
const productRouter = express.Router()
const auth = require("../middlewares/auth")
const Product = require("../models/product")
const ratingSchema = require("../models/rating")

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

productRouter.post("/api/rate-product", auth, async (req, res) => {
    try {
        const { id, rating } = req.body;
        let product = await Product.findById(id)

        for (let i = 0; i < product.rating.length; i++) {
            if (product.ratings[i].userId == req.user) {
                product.ratings.splice(i, 1)
                break;
            }
        }

        product.ratings.push(ratingSchema);
        product = await product.save()
        res.json(product)
    } catch (error) {

    }
})

module.exports = productRouter;