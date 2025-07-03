 const { Sequelize } = require('sequelize');
require('dotenv').config();

//CONNEXION A LA BASE SQLITE VIA URL DANS .ENV
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'sqlite',
  logging: false, 
  storage: './data/database.sqlite',
});

// TEST LA CONNEXION
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  }
}

testConnection(); // TEST AU DEMARRAGE

//EXPORT DU MODULE
module.exports = sequelize;
