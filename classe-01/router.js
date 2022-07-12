const express = require("express");
const router = express();
const { getPokemonList, getSpecificPokemon } = require("./controllers/get-pokemon");

router.get("/pokemon", getPokemonList);
router.get("/pokemon/:idOrName", getSpecificPokemon);

module.exports = router;