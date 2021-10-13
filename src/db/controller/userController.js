const User = require("../models/userModel");

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
        if (users === null) { return res.status(404).json(users); }
    } catch (e) {
        res.status(500).json(e);
    };
};

const getUserByPk = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByPk(id);
        if (user === null) { return res.status(404).json(user); }
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
};

const registerUser = async (req, res) => {
    try {
        const body = req.body;
        const hash = User.beforeCreate
        const user = await hash.create(body);
        if (user === null) { return res.status(404).json(user); }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
};

const loginUser = async (req, res) => {
    try {
        const body = req.body.username;
        const user = await User.findOne(body);
        const isPasswordValid = req.hooks.validPassword()
        if (isPasswordValid) {
            const message = `L'utilisateur a été connecté avec succès`;
            console.log(isPasswordValid)
            return res.json({message, data: user})
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const userBody = req.body
        const findUser = await User.findByPk(userId);
        if (findUser === null) {
            const message = `Le l'utilisateur ${userBody.username} demandé n'existe pas. Réessayer avec un autre identifiant.`
            return res.status(404).json({message})
        }
        const updateUser = (await findUser).update(userBody);
        if (updateUser === null) {
            const message = `Le pokemon demandé n'a pas pu être modifié.`
            return res.status(400).json({message})
        }
        res.status(200).json(updateUser)
    } catch (e) {
        res.status(500).json(e);
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        const userBody = req.body
        const findUser = await User.findByPk(userId)
        if (userId === null) { return res.status(404).json(userId); }
        await findUser.destroy(userBody)
        const msg = `Vous avez bien supprimé ${userBody}`
        res.status(200).json({ msg })
    } catch (e) {
        res.status(500).json(e)
    }
}

module.exports = {
    getAllUser,
    getUserByPk,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}