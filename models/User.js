const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

// ON DEFINI ICI LA CLASS USER QUI HERITE DU MODELE SEQUELIZE
class User extends Model {
  // METHODE POUR VERIFIER LE MOT DE PASSE
  async checkPassword(password) {
    return await bcrypt.compare(password, this.password);
  }


}

//CREATION DE LA TABLE USER CORRESPOND A 
// CREATE TABLE IF NOT EXISTS users (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   username TEXT NOT NULL,
//   email TEXT NOT NULL UNIQUE,
//   password TEXT NOT NULL UNIQUE,
//   token TEXT NOT NULL UNIQUE,
//   resetToken TEXT NULL UNIQUE,
//   resetExpires DATETIME NULL,
//   createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
//   updatedAt DATETIME  DEFAULT CURRENT_TIMESTAMP,


User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { isEmail: true },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { len: [6, 100] },
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetToken: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    resetExpires: {
      type: DataTypes.DATE,
      allowNull: true,
    }
  },
  {
    sequelize,
    modelName: 'User',
    timestamps: true,
    createdAt: 'date_creation',
    updatedAt: 'date_modification',

    //HOOK SEQUELIZE
    hooks: {
      // CRYPTAGE A LA CREATION DE L'UTILISATEUR AVEC SEL NIVEAU DE SECURITE 10
      beforeCreate: async (user, options) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    },
  }
);

// EXPORTATION DU MODULE USER
module.exports = User;
