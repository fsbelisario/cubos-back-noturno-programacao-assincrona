const axios = require("axios");

async function getPokemonList(start, qty) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/?offset=${start}&limit=${qty}`);
    return response.data.results;
}

async function getSpecificPokemon(idOrName) {
    const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${idOrName}`);
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
    return {
        id,
        name,
        height,
        weight,
        base_experience,
        forms,
        abilities,
        species
    };
}

const start = 2;
const qty = 2;
const idOrName = "venusaur";

getPokemonList(start, qty).then((results) => console.log(results));

getSpecificPokemon(idOrName).then((data) => console.log(data));