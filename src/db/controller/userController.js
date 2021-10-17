const User = require('../models/userModel');

const getAllUser = async (req, res, next) => {
  try {
    const users = await User.findAll();
    if (users === null) { return next() }
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json(e);
  }
};

const getUserByPk = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user === null) {
      return res.status(404).json(user);
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e);
  }
};

const registerUser = async (req, res) => {
  try {
    const user = req.body;
    const newUser = await User.create(user);
    if (user === null) {
      return res.status(404);
    }
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const body = req.body
    const user = await User.findOne( {
      where : {
        email : body.email
      }
    })
    //const validPassword = await user.isValid(body.password);
    //if (!validPassword) {
    //  return res.json("ton message")
    //}
    user.isValid(body.password, (err, isValid) => {
      console.log(isValid)
      if (!isValid) { return /*console.log(isValid)*/res.json('Wrong password') }
    })
    res.json('You have logged in');
  } catch (error) {
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userBody = req.body;
    const findUser = await User.findByPk(userId);
    if (findUser === null) {
      const message = `Le l'utilisateur ${userBody.username} demandé n'existe pas. Réessayer avec un autre identifiant.`;
      return res.status(404).json({ message });
    }
    const updateUser = (await findUser).update(userBody);
    if (updateUser === null) {
      const message = `Le pokemon demandé n'a pas pu être modifié.`;
      return res.status(400).json({ message });
    }
    res.status(200).json(updateUser);
  } catch (e) {
    res.status(500).json(e);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const userBody = req.body;
    const findUser = await User.findByPk(userId);
    if (userId === null) {
      return res.status(404).json(userId);
    }
    await findUser.destroy(userBody);
    const msg = `Vous avez bien supprimé ${userBody}`;
    res.status(200).json({ msg });
  } catch (e) {
    res.status(500).json(e);
  }
};

module.exports = {
  getAllUser,
  getUserByPk,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
