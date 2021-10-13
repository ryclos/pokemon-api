const Type = require('../models/typeModel');

const getAllTypes =  async (req, res) => {
  try {
    const type = await Type.findAll({
      attributes: ['id', 'name']
    });
    res.status(200).json(type);
  } catch (err) {
    res.json(err);
  }
};

const addNewType = async (req, res) => {
  try {
    const body = req.body;
    const type = await Type.create(body);
    res.status(201).json(type);
  } catch (err) {
    res.json(err);
  }
};

const getTypeById = async (req, res) => {
  try {
    const id = req.params.id;
    const type = await Type.findByPk(id);
    res.status(200).json(type);
  } catch (err) {

  }
};

module.exports = {
  getAllTypes,
  getTypeById,
  addNewType
};