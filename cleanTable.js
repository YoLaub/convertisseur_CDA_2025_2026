const sqlite3 = require('sqlite3').verbose();

// Ouvre ou crée la base de données
const db = new sqlite3.Database('./data/database.sqlite');

// Nom de la table à vider
const table = 'Users';

db.serialize(() => {
  // Supprimer toutes les lignes de la table
  db.run(`DELETE FROM ${table}`, function (err) {
    if (err) {
      return console.error(`Erreur DELETE: ${err.message}`);
    }
    console.log(`Toutes les lignes ont été supprimées de la table "${table}"`);
  });

  // Réinitialiser l'auto-incrément (facultatif)
  db.run(`DELETE FROM sqlite_sequence WHERE name = ?`, [table], function (err) {
    if (err) {
      return console.error(`Erreur sqlite_sequence: ${err.message}`);
    }
    console.log(`Compteur AUTOINCREMENT réinitialisé pour "${table}"`);
  });

  // Libérer l’espace disque (facultatif)
  db.run(`VACUUM`, function (err) {
    if (err) {
      return console.error(`Erreur VACUUM: ${err.message}`);
    }
    console.log(`Base de données optimisée`);
  });
});

// Fermer la base à la fin
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connexion à la base de données fermée.');
});
