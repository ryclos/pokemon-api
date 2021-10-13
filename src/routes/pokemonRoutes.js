const express = require('express');
const router = express.Router();
const controller = require('../db/controller/pokemonController');

router.get('/', controller.getAllPokemons); // Retourne tous les pokemons
router.post('/', controller.addNewPokemon); // Ajoute un nouveau Pokemon
router.get('/:id', controller.getPokemonById); // Retourne le pokemon selon son ID
router.put('/:id', controller.updatePokemon); // Mets à jour un pokemon déjà existant
router.put('/:id/type', controller.addTypeToPokemon); // Ajoute un nouveau type à un Pokemon

module.exports = router;