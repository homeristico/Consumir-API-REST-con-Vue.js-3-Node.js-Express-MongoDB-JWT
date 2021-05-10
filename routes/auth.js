// importar router
const router = require('express').Router();

//middleware
const verifyToken = require('./../middlewares/validate-token');

//importar controladores
const userController = require('./../controller/UserController');


//====== definir rutas ======//

// rutas user
router.post('/register', userController.register);
router.get('/admin', verifyToken, userController.admin);
router.post('/login', userController.login);


module.exports = router;