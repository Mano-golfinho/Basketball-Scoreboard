const ratelimit = require('../config/upstash');

const rateLimiter = async (req, res, next) => {
    try {
        // Use a consistent identifier for the user.
        const identifier = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
        const { success } = await ratelimit.limit(identifier);

        if (!success) {
            return res.status(429).json({ message: 'Too many requests, please try again later.' });
        }
        next();
    } catch (err) {
        console.error('Rate limiting error:', err);
        next(); // Fail open
    }
};

module.exports = rateLimiter;
