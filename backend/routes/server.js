const express = require('express');
const router = express.Router();
const { catchPokemon, releasePokemon, renamePokemon } = require('../controllers/domain');

router.post('/catch', (req, res) => {
    const getCatchPokemon = catchPokemon(req.body);
    res.json(getCatchPokemon);
});
router.post('/release', releasePokemon);
router.post('/rename', renamePokemon);

module.exports = router;