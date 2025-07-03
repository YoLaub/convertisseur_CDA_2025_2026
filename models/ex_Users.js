const db = require('./db');

class User {
  constructor(dbFilePath) {
    this.db = new db.Database(dbFilePath, (err) => {
      if (err) {
        console.error('Erreur base de données:', err.message);
      } else {
        console.log('Base SQLite connectée.');
      }
    });
  }

  // Créer la table si elle n'existe pas
  createTable() {
    const sql = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL UNIQUE,
        token TEXT NOT NULL UNIQUE,
        resetToken TEXT NULL UNIQUE,
        resetExpires DATETIME NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME  DEFAULT CURRENT_TIMESTAMP,
      )`;
    return new Promise((resolve, reject) => {
      this.db.run(sql, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // Créer un utilisateur
  create(username, email, password, token) {
    return new Promise((resolve, reject) => {
      const sql = `INSERT INTO users (username, email, password,token) VALUES (?, ?, ?)`;
      this.db.run(sql, [username, email], function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, username, email });
      });
    });
  }

  // Lire un utilisateur par ID
  getById(id) {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users WHERE id = ?`;
      this.db.get(sql, [id], (err, row) => {
        if (err) reject(err);
        else resolve(row);
      });
    });
  }

  // Lire tous les utilisateurs
  getAll() {
    return new Promise((resolve, reject) => {
      const sql = `SELECT * FROM users`;
      this.db.all(sql, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }

  // Mettre à jour un utilisateur
  update(id, username, email, password, token, resetToken, resetExpires) {
    return new Promise((resolve, reject) => {
      const sql = `UPDATE users SET username = ?, email = ?, password = ?, token = ?, resetToken = ?, resetExpires = ? WHERE id = ?`;
      this.db.run(sql, [username, email, id, password, token, resetToken, resetExpires], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  // Supprimer un utilisateur
  delete(id) {
    return new Promise((resolve, reject) => {
      const sql = `DELETE FROM users WHERE id = ?`;
      this.db.run(sql, [id], function (err) {
        if (err) reject(err);
        else resolve({ changes: this.changes });
      });
    });
  }

  // Fermer la base
  close() {
    this.db.close();
  }
}


test().catch(console.error);
