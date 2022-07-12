const axios = require("axios");

function getPokemonList(req, res) {
    const start = Number(req.query.inicio);
    const qty = Number(req.query.quantidade);
    const response = axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${start}&limit=${qty}`);
    response.then((response) => {
        res.json(response.data.results);
    });
}

function getSpecificPokemon(req, res) {
    const idOrName = req.params.idOrName;
    const response = axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
    response.then((response) => {
        const {
            id,
            name,
            height,
            weight,
            base_experience,
            forms,
            abilities,
            species
        } = response.data;
        res.json({
            id,
            name,
            height,
            weight,
            base_experience,
            forms,
            abilities,
            species
        }).stringfy;
    });
}

module.exports = { getPokemonList, getSpecificPokemon };