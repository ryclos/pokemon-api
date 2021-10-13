const express = require('express') // On l'appelle pour utiliser le router
const router = express.Router() // On peut utiliser les routers pour faire les routes
const controller = require('../db/controller/userController')

router.get('/', controller.getAllUser)
router.put('/:id', controller.updateUser)
router.delete('/:id', controller.deleteUser)
router.post('/register-user', controller.registerUser);
router.post('/login', controller.loginUser);

module.exports = router