const { sequelize } = require('../index');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');

const { STRING } = DataTypes;

const User = sequelize.define('user', {
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
  }
);

User.beforeCreate(async (user) => {
    try {
        const salt = await bcrypt.genSalt(10, 'a');
        return user.password = bcrypt.hashSync(user.password, salt);
    } catch (err) {
        console.log(err)
    }
})

User.prototype.isValid = function(candidatePassword, cb) {
    const user = this
    return bcrypt.compare(candidatePassword, user.password, function(err, isValid) {
        if (err) { return cb(err) }
        if (cb) { return cb(null, isValid) }
    })
};

module.exports = User;
