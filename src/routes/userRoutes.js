const express = require('express') // On l'appelle pour utiliser le router
const router = express.Router() // On peut utiliser les routers pour faire les routes
const controller = require('../db/controller/userController')

router.get('/', controller.getAllUser)
router.post('/', controller.registerUser)
router.get('/:id', controller.getUserByPk)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)


module.exports = router