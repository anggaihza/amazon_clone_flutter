const userService = require("../services/user.services")


const signup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await userService.createUser(name, email, password);
        res.json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { signup };
