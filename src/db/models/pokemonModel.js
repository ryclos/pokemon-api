// Local import
const { sequelize } = require('../index');
const { DataTypes } = require('sequelize');

// Pokemon model
const { STRING, INTEGER } = DataTypes;
const Pokemon = sequelize.define('pokemons', { // J'ai remarqué que tu ne déclare pas de ID
  // ID existant par defaut, sauf si uuid ou autre
  name: {
    type: STRING,
    allowNull: false,
    notEmpty: true,
    unique: { // Pas mal celui là c'est vrai qu'il est important
      args: true,
      msg: 'Ce Pokémon existe déjà'
    },
    validate: {
      notNull: {
        msg: 'Saisissez un nom de Pokémon'
      }
    }
  },
  hp: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notNull: 'Saisissez les points de vie du Pokémon',
      min: {
        args: 1,
        msg: 'Le minimum est 1 point de vie'
      },
      max: {
        args: 100, // Pourquoi ici tu ne met pas de []? Car dans l'exo que j'ai on en met
        msg: 'Le maximum est 100 point de vie'
      }
    }
  },
  cp: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notNull: 'Saisissez les points de CP du Pokémon',
      min: {
        args: 1,
        msg: 'Le minimum est 1 point de CP'
      },
      max: {
        args: 100,
        msg: 'Le maximum est 100 point de CP'
      }
    }
  }
}, {
  freezeTableName: true,
  timestamps: false
});

module.exports = Pokemon;