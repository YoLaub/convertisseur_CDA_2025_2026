// IMPORTATION DES DEPENDANCES
const functionGeneral = require('../public/js/function')
const secret = process.env.SESSION_SECRET;

//IMPORTATION DU MODULE AUTHMIDDLEWARE
module.exports = (req, res, next) => {

  //RECUPERE LE TOKEN
  const decodedUser = functionGeneral.getTokenCookie(req, secret);

  //REDIRIGE VERS LA PAGE DE CONNEXION SI PROBLEME DE TOKEN
  if (!decodedUser) {
    console.error('Token manquant ou invalide');
    return res.redirect('/login');
  }

  //STOCKE LES DONNE UTILISATEUR DECODE DANS L'OBJET req
  req.user = decodedUser;
  //PASSE A LA SUITE DU PROGRAMME
  next();

};
