const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, gameController.getGames);
router.post('/', auth, gameController.createGame);
router.delete('/:id', auth, gameController.deleteGame);

module.exports = router;
