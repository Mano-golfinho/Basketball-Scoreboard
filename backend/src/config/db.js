const mongoose = require('mongoose');

const connectDB = async () => {
    if (process.env.MONGODB_URI) {
        try {
            await mongoose.connect(process.env.MONGODB_URI);
            console.log('MongoDB Connected');
        } catch (err) {
            console.error('MongoDB Connection Error:', err);
            process.exit(1);
        }
    } else {
        console.log('WARNING: MONGODB_URI not found in .env');
    }
};

module.exports = connectDB;
