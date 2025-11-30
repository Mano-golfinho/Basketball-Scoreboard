const Game = require('../models/Game');

exports.getGames = async (req, res) => {
    try {
        const games = await Game.find({ userId: req.user.id }).sort({ date: -1 });
        res.json(games);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createGame = async (req, res) => {
    const game = new Game({
        leftTeam: req.body.leftTeam,
        rightTeam: req.body.rightTeam,
        winner: req.body.winner,
        userId: req.user.id
    });

    try {
        const newGame = await game.save();
        res.status(201).json(newGame);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteGame = async (req, res) => {
    try {
        const game = await Game.findById(req.params.id);
        if (!game) return res.status(404).json({ message: 'Game not found' });

        // Check ownership
        if (game.userId && game.userId.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await game.deleteOne();
        res.json({ message: 'Game deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
