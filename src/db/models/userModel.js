const { sequelize } = require('../index');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const { STRING } = DataTypes;

const User = sequelize.define(
  'user',
  {
    //ID auto
    username: {
      type: STRING,
      unique: {
        args: true,
        msg: 'Ce username existe déjà',
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Ce username existe déjà',
      },
    },
    password: {
      type: STRING,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        const userPassword = user.getDataValue('password').toString();

        const salt = await bcrypt.genSalt(10, 'a');
        const userPasswordHashed = bcrypt.hashSync(userPassword, salt);

        user.setDataValue('password', userPasswordHashed);
      },
    },
    instanceMethods: {
      validPassword: async (password) => {
        try {
          const user = this;
          return await bcrypt.compareSync(password, user.password);
        } catch (e) {
          throw e;
        }
      },
    },
  }
);
User.prototype.validPassword = async (password, hash) => {
  return await bcrypt.compareSync(password, hash);
};

module.exports = User;
