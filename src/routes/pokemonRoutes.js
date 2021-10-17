const express = require('express');
const router = express.Router();
const pokemonController = require('../db/controller/pokemonController');

router.get('/', pokemonController.getAllPokemons); // Retourne tous les pokemons
router.post('/', pokemonController.addNewPokemon); // Ajoute un nouveau Pokemon
router.get('/:id', pokemonController.getPokemonById); // Retourne le pokemon selon son ID
router.put('/:id', pokemonController.updatePokemon); // Mets à jour un pokemon déjà existant
router.put('/:id/type', pokemonController.addTypeToPokemon); // Ajoute un nouveau type à un Pokemon

module.exports = router;