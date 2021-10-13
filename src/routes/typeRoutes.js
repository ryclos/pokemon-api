const express = require('express');
const router = express.Router();
const controller = require('../db/controller/typeController');

router.get('/', controller.getAllTypes);
router.post('/', controller.addNewType);
router.get('/:id', controller.getTypeById);

module.exports = router;