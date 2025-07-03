'use strict';

// IMPORTATION DES MODULES NÉCESSAIRES
const fs = require('fs');                        // POUR LIRE LES FICHIERS DU DOSSIER COURANT
const path = require('path');                    // POUR GÉRER LES CHEMINS DE FICHIERS
const Sequelize = require('sequelize');          // ORM SEQUELIZE POUR INTERAGIR AVEC LA BASE DE DONNÉES
const process = require('process');              // POUR ACCÉDER AUX VARIABLES D’ENVIRONNEMENT

// NOM DU FICHIER ACTUEL (PAR EXEMPLE : index.js)
const basename = path.basename(__filename);

// ENVIRONNEMENT ACTUEL (PAR DÉFAUT : 'development' SI NON DÉFINI)
const env = process.env.NODE_ENV || 'development';

// CHARGEMENT DE LA CONFIGURATION DE LA BASE DE DONNÉES EN FONCTION DE L’ENVIRONNEMENT
const config = require(__dirname + '/../config/config.json')[env];

// OBJET QUI CONTIENDRA TOUS LES MODÈLES SEQUELIZE
const db = {};

// CRÉATION DE L’INSTANCE SEQUELIZE
let sequelize;

// SI UNE VARIABLE D’ENVIRONNEMENT EST DÉFINIE POUR LA CONNEXION
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  // SINON, UTILISATION DES INFORMATIONS DU FICHIER DE CONFIGURATION
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// LECTURE DES FICHIERS DU DOSSIER COURANT (EN GÉNÉRAL : MODELS/)
fs
  .readdirSync(__dirname)
  .filter(file => {
    // FILTRAGE : EXCLURE LES FICHIERS CACHÉS, LE FICHIER ACTUEL ET LES FICHIERS .test.js
    return (
      file.indexOf('.') !== 0 &&              // IGNORER LES FICHIERS CACHÉS
      file !== basename &&                    // IGNORER CE FICHIER (index.js)
      file.slice(-3) === '.js' &&             // NE GARDER QUE LES FICHIERS .js
      file.indexOf('.test.js') === -1         // EXCLURE LES FICHIERS DE TEST
    );
  })
  .forEach(file => {
    // IMPORTATION DE CHAQUE MODÈLE ET INITIALISATION AVEC SEQUELIZE
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;  // AJOUT DU MODÈLE À L’OBJET DB
  });

// SI UN MODÈLE A DES ASSOCIATIONS (RELATIONS ENTRE TABLES), ON LES DÉCLENCHE ICI
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// AJOUT DE L’INSTANCE SEQUELIZE ET DU CONSTRUCTEUR SEQUELIZE À L’EXPORT
db.sequelize = sequelize;   // PERMET D’ACCÉDER À LA CONNEXION
db.Sequelize = Sequelize;   // PERMET D’ACCÉDER AUX TYPES (STRING, INTEGER, etc.)

// EXPORTATION DE L’OBJET DB POUR ÊTRE UTILISÉ PARTOUT DANS L’APPLICATION
module.exports = db;
