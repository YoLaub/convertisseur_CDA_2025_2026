// IMPORTATION DES DEPENDANCES
const express = require('express');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const sequelize = require('./config/database');
// IMPORTE LE MODEL USER
const User = require('./models/User'); 
const Video = require('./models/Video'); 

dotenv.config();

// DÉFINITION DES RELATIONS ENTRE MODÈLES
User.hasMany(Video, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Video.belongsTo(User, {
  foreignKey: 'userId',
});

const app = express();

// CONFIGURATION EXPRESS
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist')); 


// VIEW ENGINE EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ROUTES
const authRoutes = require('./routes/authRoutes');
const publicRoutes = require('./routes/publicRoutes');

// DEFINITION DES ENDPOINTS
app.use('/', authRoutes);
app.use('/', publicRoutes);

//SYNCHRONISATION DE LA BASE DE DONNEE
(async () => {
  try {
    await sequelize.sync({ alter: true }); // CREE OU MET A JOUR LES TABLES
    console.log('Base de données synchronisée.');

  } catch (error) {
    console.error('Erreur de synchronisation :', error);
  }
})();

// LANCEMENT DE L'APP
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});

