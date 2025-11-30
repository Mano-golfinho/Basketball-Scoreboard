const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const rateLimiter = require('./middleware/rateLimiter');

const authRoutes = require('./routes/authRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Rate Limiter
app.use('/api', rateLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/games', gameRoutes);

// Serve static files from the frontend/dist directory
app.use(express.static(path.join(__dirname, '../../frontend/dist')));

// Catch-all route
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
