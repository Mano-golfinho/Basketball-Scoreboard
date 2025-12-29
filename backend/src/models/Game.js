const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    leftTeam: {
        name: { type: String, required: true },
        score: { type: Number, required: true },
        fouls: { type: Number, default: 0 }
    },
    rightTeam: {
        name: { type: String, required: true },
        score: { type: Number, required: true },
        fouls: { type: Number, default: 0 }
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
