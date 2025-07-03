const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');


//PAGE ACCUEIL
router.get('/', (req, res) => {
    res.render('home')
}
);

//AFFICHAGE
router.get('/reset',AuthController.showPasswordForm);
router.get('/askResetpassword', AuthController.showEmailForm);

//ENVOI
router.post('/reset/ask', AuthController.forgotPassword);
router.post('/reset/update', AuthController.resetPassword);

module.exports = router;

