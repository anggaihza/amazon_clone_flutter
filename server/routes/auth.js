const router = require("express").Router()
const userController = require("../controllers/user.controllers");
const auth = require("../middlewares/auth");
const User = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")


router.post("/api/signup", userController.signup)

router.post("/api/signin", async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({ email })

        if (!user) {
            res.status(400).json({ msg: "User with this email does not exist!" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            res.status(400).json({ msg: "Incorrect password" })
        }

        const userData = {
            id: user._id,
            email: user.email
        }

        const token = jwt.sign(userData, "passwordKey")
        res.json({ token, ...user._doc })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})

router.post("/tokenIsValid", async (req, res) => {
    try {

        const token = req.header("x-auth-token")
        if (!token) return res.json(false)

        const verified = jwt.verify(token, "passwordKey")
        if (!verified) return res.json(false)

        const user = await User.findById(verified.id)
        if (!user) return res.json(false)

        res.json(true)
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
})


// Get user data
router.get("/", auth, async (req, res) => {
    const user = await User.findById(req.user)
    res.json({ ...user._doc, token: req.token });
})

module.exports = router