const User = require('../models/user');
const bcrypt = require('bcrypt');

const createUser = async (name, email, password) => {
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error('User with the same email already exists!');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ email, password: hashedPassword, name });

        return user.save();
    } catch (error) {
        throw error;
    }
};

module.exports = { createUser };
