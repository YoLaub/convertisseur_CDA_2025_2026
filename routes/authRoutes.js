const express = require('express');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware');
const authorization = require('../middleware/authMiddleware')
const AuthController = require('../controllers/AuthController');
const VideoController = require('../controllers/VideoController');

//GET
//AUTHENTIFICATION
router.get('/login', AuthController.showLoginForm);
router.get('/register',AuthController.showRegisterForm);
//FORMULAIRE CONVERSION
router.get('/upload',authorization,VideoController.showConvertForm);
//DECONNEXION
router.get('/logout',AuthController.logout);

////////////////////////////////////////////////////////////////////////
//POST
//AUTHENTIFICATION
router.post('/login', AuthController.login);
router.post('/register', AuthController.register);

////////////////////////////////////////////////////////////////////////

//CREATE
//CONVERSION
router.post('/upload', upload.single('media'), VideoController.convert);

//READ - BIBLIOTHEQUE
router.get('/librairy', VideoController.librairy)

// DELETE
router.post('/delete', VideoController.delete);

//UPDATE
router.post('/update', VideoController.update);




module.exports = router;
 
