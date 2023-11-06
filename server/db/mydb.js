const mongoose = require('mongoose');

const connectToDatabase = async () => {
    try {
        await mongoose.connect("mongodb+srv://anggaasep98:Esemkaencjl123@cluster0.1cmnziz.mongodb.net/?retryWrites=true&w=majority", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = { connectToDatabase };