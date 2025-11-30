const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    leftTeam: {
        type: String,
        required: true
    },
    rightTeam: {
        type: String,
        required: true
    },
    winner: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Game', GameSchema);
