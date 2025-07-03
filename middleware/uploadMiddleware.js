// IMPORTATION DES DEPENDANCES
const multer = require('multer');
const path = require('path');

// CONFIGURATION DU STOCKAGE DES FICHIERS AVEC MULTER
const storage = multer.diskStorage({
  //DEFINITION DE LA DESTINATION
  destination: function (req, file, cb) {
    //CB = CALLBACK QUI PREND EN PREMIER PARAMETRE UNE EVENTUELL ERREUR ( ICI NULL ) ET EN DEUXIEME LE CHEMIN DE DESTINATION
    cb(null, path.join(__dirname, '../public/videos/originaux'));
  },
  //DEFINITION DU NOM DE FICHIER FINAL ET DE SON EXTENSION
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

// CREATION DU MIDDLEWARE UPLOAD AVEC LA CONFIGURATION CI DESSUS
const upload = multer({ storage });

//EXPORTATION DU MIDDLEWARE
module.exports = upload;

