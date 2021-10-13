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
  }
);

User.beforeCreate(async (user) => {
    const userPassword = user.password.toString();

    const salt = await bcrypt.genSalt(10, 'a');
    user.password = bcrypt.hashSync(userPassword, salt);

})

//User.beforeCreate( async (next) => {
//    try {
//        const user = this
//        await bcrypt.genSalt(10, (err, salt) => {
//            if(err) return next(err)
//            bcrypt.hash(user.password, salt, (err, hash) => {
//                if (err) return next(err)
//                user.password = hash
//                next()
//            })
//        })
//    } catch (err) {
//        if (err) console.log(err)
//    }
//})


User.prototype.isValid = async (password, hash) => {
    const user = this
    bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return hash(err)
        if (hash) hash(null, isMatch)
    })
};

module.exports = User;
