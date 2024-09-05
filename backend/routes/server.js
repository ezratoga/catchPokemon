const express = require('express');
const router = express.Router();
const { catchPokemon, releasePokemon, renamePokemon, getMyPokemon } = require('../controllers/domain');

router.post('/catch', (req, res) => {
    const getCatchPokemon = catchPokemon(req.body);
    res.json(getCatchPokemon);
});
router.post('/release', releasePokemon);
router.post('/rename', renamePokemon);
router.get('/my-list', (req, res) => {
    const myPokemon = getMyPokemon();
    res.json(myPokemon);
});

module.exports = router;