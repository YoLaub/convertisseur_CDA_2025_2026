// IMPORTATION DES DEPENDANCES
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../models/User');
const { apiInstance, SendSmtpEmail } = require('../config/brevo');
const secret = process.env.SESSION_SECRET;

class AuthController {
  //##############
  // AFFICHAGE
  //###############

  //FORMULAIRE DE CONNEXION
  static showLoginForm(req, res) {
    res.render('login', { error: null });
  }
  //FORMULAIRE D'INSCRIPTION
  static showRegisterForm(req, res) {
    res.render('register', { error: null });
  }
  //FORMULAIRE DE DEMANDE DE D'ENVOI D'ACCES AU FORMULAIRE DE CHANGEMENT DE MOT DE PASSE
  static showEmailForm(req, res) {
    res.render('askResetPassword', { error: null, message: null });
  }
  //FORMULAIRE DE CHANGEMENT DE MOT DE PASSE
  static async showPasswordForm(req, res) {

    const token = req.query.token;

    try {
      const decoded = jwt.decode(token);

      const user = await users.findOne({
        where: {
          email: decoded.email,
          resetToken: token,
        }
      });

      if (user === null) return res.status(400).send('Lien invalide ou expiré');

      res.render('reset', { error: null, message: null, token: token });
    } catch (err) {
      return res.status(400).send('Lien invalide');
    }

  }

  //###############################
  // LOGIQUE
  //#############################

  // IDENTIFICATION
  static async login(req, res) {

    const { username, password } = req.body;
    // RECHERCHE SI UN UTILISATEUR EXISTE AVEC L'ORM SEQUELIZE ET SA METHODE DE CLASS findOne({ where: {col: ? } })
    const user = await users.findOne({ where: { username: username } });

    // VERIFICATION DU MOT DE PASSE
    if (user === null || !(await user.checkPassword(req.body.password))) {
      return res.status(401).render('login', { error: 'Identifiants incorrects' });
    }

    // CREATION DU TOKEN DE CONNEXION
    const token = jwt.sign({ id: user.id, username: user.username }, secret, { expiresIn: '1h' });
    await users.update(
      { token: token },
      {
        where: {
          username: user.username
        }
      }
    );

    // ENREGISTREMENT DU TOKEN DANS COOKIES ET REDIRECTION
    res.cookie('token', token);
    res.redirect('/upload');

  }

  // ENREGISTREMENT
  static async register(req, res) {
    const { username, email, password } = req.body;
    // RECHERCHE SI UN UTILISATEUR EXISTE DEJA AVEC L'ORM SEQUELIZE ET SA METHODE DE CLASS findOne({ where: {col: ? } })
    const user = await users.findOne({ where: { email: email } });

    if (user !== null) {
      return res.render('register', { error: "Nom d'utilisateur déjà pris" });
    }
    // CREATION DU TOKEN DE CONNEXION
    const token = jwt.sign({ username: username, email: email }, secret, { expiresIn: '1h' });
    //ENREGISTREMENT DU NOUVEL UTILISATEUR DANS LA BASE DE DONNE
    await users.create({ username: username, email: email, password: password, token: token });

    //REDIRECTION VERS LA PAGE DE CONNEXION
    res.redirect('/login');

  }

  //ENVOIE EMAIL POUR MODIFICATION MOT DE PASSE

  static async forgotPassword(req, res) {
    //RECUPERATION DE L'EMAIL ENVOYE EN POST DANS LE FORMULAIRE
    const { email } = req.body;
    try {
      //RECHERCHE SI L'UTLISATEUR EXISTE
      const user = await users.findOne({ where: { email } });

      if (!user) return res.status(404).json({ message: 'Utilisateur non trouvé' });

      //CREER UN TOKEN DE RESET
      const token = jwt.sign({ id: user.id, email: user.email }, secret, { expiresIn: '1h' });
      //CREER UNE DATE D'EXPIRATION DU TOKEN
      const expires = new Date(Date.now() + 60 * 60 * 1000);

      // MISE A JOUR DE L'UTILISATEUR
      await users.update({ resetToken: token, resetExpires: expires }, { where: { id: user.id } });
      //DEFINITION DU LIEN DE RESET AVEC LE TOKEN DE RESET
      const resetLink = process.env.RESET_LINK_BASE_URL + token;

      // CREATION DE L'OBJET EMAIL
      const emailData = ({
        sender: {
          name: process.env.NAME_FOR_EMAIL,
          email: process.env.BREVO_SENDER_EMAIL
        },
        to: [{ email }],
        templateId: parseInt(process.env.TEMPLATE_ID, 10),
        params: {
          RESET_LINK: resetLink,
          USERNAME: user.email
        },
        headers: { 'X-Mailin-custom': 'recuperation de mot de passe' }
      });

      //ENVOI DE L'EMAIL AVEC BREVO - VOIR config/brevo.js
      await apiInstance.sendTransacEmail(emailData);

      return res.render("askResetPassword", { error: null, message: 'E-mail de réinitialisation envoyé avec succès.' });
    } catch (err) {
      console.error('Erreur dans forgotPassword :', err);
      return res.render("askResetPassword", { error: 'Erreur serveur', message: null });
    }
  }

  //MODIFICATION DU PASSWORD SOUS VERIFICATION DU TOKEN
  static async resetPassword(req, res) {

    //RECUPERATION DU PASSWORD ET DU TOKEN ENVOYE EN POST DANS LE FORMULAIRE
    const { password, token } = req.body;

    try {
      //DECRYPTAGE DU TOKEN
      const decoded = jwt.decode(token.trim());
      //VERIFICATION DE L'EXISTANCE DE L'UTILISATEUR
      const user = await users.findOne({
        where: {
          email: decoded.email,
          resetToken: token.trim(),
        }
      });

      if (user === null) return res.status(400).render("reset", { error: 'Lien invalide ou expiré', message: null, token: null });

      const salt = await bcrypt.genSalt(10);
      const cryptPassword = await bcrypt.hash(password, salt);

      //MISE A JOUR DU MOT DE PASSE DE L'UTILISATEUR
      await user.update({
        password: cryptPassword,
        resetToken: null,
        resetExpires: null
      });

      res.render("reset", { error: null, message: 'Mot de passe modifié avec succès', token: null });
    } catch (err) {
      res.status(400).render("reset", { error: 'Token invalide', message: null, token: null });
    }

  };

  //DECONNEXION
  static logout(req, res) {
    res.clearCookie('token');
    res.redirect('/login')
  };

}

module.exports = AuthController;
