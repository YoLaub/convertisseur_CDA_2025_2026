const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

// ON DEFINI ICI LA CLASS VIDEO QUI HERITE DU MODELE SEQUELIZE
class Video extends Model {

}

//CREATION DE LA TABLE VIDEO CORRESPOND A 
// CREATE TABLE IF NOT EXISTS videos (
//   id INTEGER PRIMARY KEY AUTOINCREMENT,
//   titre TEXT NOT NULL,
//   resume TEXT NOT NULL,
//   path TEXT NOT NULL,
//   date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,,
//   updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,,
//   format TEXT NOT NULL


Video.init(
  {
    titre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['mp4', 'avi', 'mkv', 'webm']], // Formats acceptés
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Video',
    timestamps: true,
    createdAt: 'date_creation'
  }
);

module.exports = Video;
