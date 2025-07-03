const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Chemin vers le fichier SQLite (dans le dossier du projet)
const dbPath = path.resolve(__dirname, 'db.sqlite');

// Création de la connexion (ou ouverture si fichier existant)
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Erreur ouverture base de données :', err.message);
  } else {
    console.log('Connexion à la base SQLite réussie :', dbPath);
  }
});

module.exports = db;
