const { sequelize } = require('../index');
const { DataTypes } = require('sequelize');
const Pokemon = require('./pokemonModel');

// Pokemon type model
const Type = sequelize.define('types', {
  name: {
    type: DataTypes.STRING,
    unique: {
      args: true,
      msg: 'Ce type de pokemon existe déjà'
    }
  }
}, {
  freezeTableName: true
});

// Relation with pokemon model
Type.belongsToMany(Pokemon, {
  through: 'pokemon_type',
  as: 'pokemons',
  foreignKey: 'type_id'
});

Pokemon.belongsToMany(Type, {
  through: 'pokemon_type',
  as: 'types',
  foreignKey: 'pokemon_id'
});

module.exports = Type;