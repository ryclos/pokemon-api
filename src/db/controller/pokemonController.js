const Type = require('../models/typeModel');
const Pokemon = require('../models/pokemonModel');

const getAllPokemons = async (req, res) => {
  try {
    const pokemon = await Pokemon.findAll({
      attributes: ['id', 'name', 'hp', 'cp'],
      include: [{
        model: Type,
        as: 'types',
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }]
    });
    console.log(pokemon);
    res.status(200).json(pokemon);
  } catch (err) {
    res.json(err)
  }
};

const addNewPokemon = async (req, res) =>{
  try {
    const body = req.body;
    const pokemon = await Pokemon.create(body);
    res.status(201).json(pokemon);
  } catch (err) {
    res.json(err);
  }
};

const getPokemonById = async (req, res) => {
  try {
    const id = req.params.id;
    const pokemon = await Pokemon.findOne({
      where: {id: id},
      attributes: ['id', 'name'],
      include: [{
        model: Type,
        as: 'types',
        attributes: ['id', 'name'],
        through: { attributes: [] }
      }]
    });
    res.status(200).json(pokemon)
  } catch (err) {
    res.json(err);
  }
};

const updatePokemon = async (req, res) => {
  try {
    const id = req.params.id
    const pokemon = await Pokemon.findByPk(id); // Récupérer le pokemon avant de le modifier
    const update = await pokemon.update(req.body); // Une fois récupéré on peut le modifier
    res.status(200).json(update)
  } catch (err) {
    res.status(500).json(err);
  }
};

const deletePokemon = async (req, res) => {
  try {
    const id = req.params.id
    const pokemon = await Pokemon.findByPk(id)
    const pokemonDeleted = await pokemon.destroy(id)
    res.status(200).json(pokemonDeleted)
  } catch (error) {
    res.json(error)
  }
};

const addTypeToPokemon = async (req, res) => {
  try {
    const type = await Type.findOne({where: {name: req.body.name}})
    const pokemon = await Pokemon.findByPk(req.params.id);
    await type.addPokemon(pokemon);
    res.json(`Vous avez ajouter un nouveau type à ${pokemon.name}`);
  } catch (err) {
    res.json(err);
  }
};

const deleteTypePokemon = async (req, res) => {
  try {
    const type = await Type.findOne({where: {name: req.body.name}})
    const pokemon = await Pokemon.findByPk(req.params.id);
    await type.deletePokemon(pokemon);
    res.json(`Vous avez effacer un nouveau type à ${pokemon.name}`);
  } catch (err) {
    res.json(err)
  }
};

module.exports = {
  getAllPokemons,
  getPokemonById,
  addNewPokemon,
  addTypeToPokemon,
  updatePokemon,
  deleteTypePokemon
};