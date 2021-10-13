const { sequelize } = require('../index')
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt')

const { STRING } = DataTypes

const User = sequelize.define('user', {
    //ID auto
    username:{
        type: STRING,
        unique: {
            args: true,
            msg: 'Ce username existe déjà'
        },
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Ce username existe déjà'
        },
    },
    password: {
        type: STRING
    }

},
    {
        freezeTableName: true,
        timestamps: false
    },
    {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSaltSync(10, 'a');
                user.password = bcrypt.hashSync(user.password, salt);
            }
        }
    },
    instanceMethods: {
        validPassword: async (password) => {
            try {
                const user = this
                return await bcrypt.compareSync(password, user.password);
            } catch (e) {
                throw e
            }
        }
    }
});
User.prototype.validPassword = async (password, hash) => {
    return await bcrypt.compareSync(password, hash);
}

module.exports = User


