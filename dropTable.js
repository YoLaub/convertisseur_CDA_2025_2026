const sqlite3 = require('sqlite3').verbose();

// Utilise un fichier local dans le même dossier que le script
const db = new sqlite3.Database('./data/database.sqlite', (err) => {
  if (err) {
    return console.error('Erreur d’ouverture de la base :', err.message);
  }
  console.log('Connexion à la base OK');
});

db.run('DROP TABLE IF EXISTS ', (err) => {
  if (err) return console.error(err.message);
  console.log('Table supprimée avec succès');
});

db.close();
