const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'basketball_secret_key_123';

exports.register = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Please enter all fields' });

    try {
        let user = await User.findOne({ username });
        if (user) return res.status(400).json({ message: 'User already exists' });

        user = new User({ username, password });

        // Hash password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 * 24 }); // 1 day

        res.json({
            token,
            user: { id: user._id, username: user.username }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ message: 'Please enter all fields' });

    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ message: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: 3600 * 24 });

        res.json({
            token,
            user: { id: user._id, username: user.username }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
