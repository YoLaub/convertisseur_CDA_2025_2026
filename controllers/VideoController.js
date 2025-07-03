// IMPORTATION DES DEPENDANCES
const videos = require('../models/Video');
const FFmpeg = require('fluent-ffmpeg');
const functionGeneral = require('../public/js/function')
const secret = process.env.SESSION_SECRET;

class VideoController {

  //AFFICHE LE FORMULAIRE DE CONVERSION
  static showConvertForm(req, res) {
    const message = req.session.successMessage;
    const mediaPath = req.session.mediaPath;

    //SUPPRESSION DES MESSAGES DE SESSION APRES LECTURE (AMELIORATION: MIDDLEWARE FLASHMESSAGE)
    delete req.session.successMessage;
    delete req.session.mediaPath;

    // RENDU DE LA PAGE AVEC LES VARIABLES RENSEIGNEES
    res.render('upload', { error: null, message: message, mediaPath: mediaPath });
  }

  //GERE LA CONVERSION DU FICHIER ORIGINAL
  static async convert(req, res) {

    console.log('Fichier reçu :', req.file);

    //VERIFIE QUE LE FICHIER SOIT BIEN PRESENT DANS LA REQUETE
    if (!req.file) {
      return res.status(400).send('Aucun fichier reçu');
    }

    //RECUPERATION DES CHAMPS DU FORMULAIRE
    const { title, resume, format, codec } = req.body;
    const type = req.file.mimetype;
    const pathFile = req.file.path;
    const outputPath = functionGeneral.getOutputFilePath(format);
    //RECUPERATION DES INFO DE L'UTILISATEUR DANS LE COOKIE
    const infoUser = functionGeneral.getTokenCookie(req, secret)

    //CREATION DE L'OBJET FFMPEG AVEC LE FICHIER SOURCE
    let convertMedia = new FFmpeg({ source: pathFile })


    console.log('Mime type :', req.file.mimetype);
    console.log('Format :', format);
    console.log('Codec :', codec);

    //GESTION DES FORMAT DE CONVERSION CELON LE MIMETYPE DE LA SOURCE (SWITCH A FACTORISER)
    try {
      switch (format) {

        case "mp4":
          switch (type) {
            // CONVERSION WEBM VERS MP4
            case 'video/webm':
              functionGeneral.applyCodecs(convertMedia, format, codec).fromFormat('webm').save(outputPath).on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '%')
              }).on('end', async () => {
                console.log('100% Done');
                const test = __dirname.replace("controllers", "public");
                const newPath = outputPath.replace(test, "");

                await videos.create({ titre: title, resume: resume, path: newPath, format: format, userId: infoUser.id });
                req.session.successMessage = "Vidéo convertie - retrouvez-la dans votre bibliothèque";
                req.session.mediaPath = newPath;
                res.redirect('/upload');
              });
              break;
            // CONVERSION MKV VERS MP4
            case 'video/x-matroska':
              functionGeneral.applyCodecs(convertMedia, format, codec).fromFormat('matroska').save(outputPath).on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '%')
              }).on('end', async () => {
                console.log('100% Done');
                const test = __dirname.replace("controllers", "public");
                const newPath = outputPath.replace(test, "");

                await videos.create({ titre: title, resume: resume, path: newPath, format: format, userId: infoUser.id });
                req.session.successMessage = "Vidéo convertie - retrouvez-la dans votre bibliothèque";
                req.session.mediaPath = newPath;
                res.redirect('/upload');
              });
              break;
            default:
              console.log("Format source non pris en charge");
              break;
          }
          break;
        case "mkv":
          switch (type) {
            // CONVERSION MP4 VERS MKV
            case 'video/mp4':
              functionGeneral.applyCodecs(convertMedia, format, codec).fromFormat('mp4').save(outputPath).on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '%')
              }).on('end', async () => {
                console.log('100% Done');
                const test = __dirname.replace("controllers", "public");
                const newPath = outputPath.replace(test, "");

                await videos.create({ titre: title, resume: resume, path: newPath, format: format, userId: infoUser.id });
                req.session.successMessage = "Vidéo convertie - retrouvez-la dans votre bibliothèque";
                req.session.mediaPath = newPath;
                res.redirect('/upload');
              });
              break;
            // CONVERSION WEBM VERS MKV
            case 'video/webm':
              functionGeneral.applyCodecs(convertMedia, format, codec).fromFormat('webm').save(outputPath).on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '%')
              }).on('end', async () => {
                console.log('100% Done');
                const test = __dirname.replace("controllers", "public");
                const newPath = outputPath.replace(test, "");

                await videos.create({ titre: title, resume: resume, path: newPath, format: format, userId: infoUser.id });
                req.session.successMessage = "Vidéo convertie - retrouvez-la dans votre bibliothèque";
                req.session.mediaPath = newPath;
                res.redirect('/upload');
              });
              break;
            default:
              console.log("Format source non pris en charge");
              break;
          }
          break;

        case "webm":
          switch (type) {
            // CONVERSION MP4 VERS WEBM
            case 'video/mp4':
              functionGeneral.applyCodecs(convertMedia, format, "libvpx").fromFormat('mp4').save(outputPath).on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '%')
              }).on('end', async () => {
                console.log('100% Done');
                const test = __dirname.replace("controllers", "public");
                const newPath = outputPath.replace(test, "");

                await videos.create({ titre: title, resume: resume, path: newPath, format: format, userId: infoUser.id });
                req.session.successMessage = "Vidéo convertie - retrouvez-la dans votre bibliothèque";
                req.session.mediaPath = newPath;
                res.redirect('/upload');
              });
              break;
            // CONVERSION MKV VERS WEBM
            case 'video/x-matroska':
              functionGeneral.applyCodecs(convertMedia, format, "libvpx").fromFormat('matroska').save(outputPath).on('progress', function (progress) {
                console.log('Processing: ' + progress.percent + '%')
              }).on('end', async () => {
                console.log('100% Done');
                const test = __dirname.replace("controllers", "public");
                const newPath = outputPath.replace(test, "");

                await videos.create({ titre: title, resume: resume, path: newPath, format: format, userId: infoUser.id });
                req.session.successMessage = "Vidéo convertie - retrouvez-la dans votre bibliothèque";
                req.session.mediaPath = newPath;
                res.redirect('/upload');
              });
              break;

            default:
              console.log("Format source non pris en charge");
              res.render('upload', { error: "Format cible non pris en charge", message: null });
              break;
          }
          break;

        default:
          console.log("Format cible non pris en charge");
          res.render('upload', { error: "Format cible non pris en charge", message: null });
          break;
      }


    } catch (error) {
      // GESTION DES ERREURS DE CONVERSION
      res.render('upload', { error: error, message: null });
    }

  }


  //GESTION BIBLIOTHEQE
  //AFFICHAGE
  static async librairy(req, res) {

    const infoUser = functionGeneral.getTokenCookie(req,secret);
    const videoEncodes = await videos.findAll({ where: { userId: infoUser.id }});
    res.render('librairy', { encodes: videoEncodes });

  }

  //SUPPRESSION
  static async delete(req, res) {
    const { id } = req.body;

    const deleteVideo = await videos.destroy({ where: { id: id } });
    if (deleteVideo) {
      return res.json({ success: true, message: "Vidéo effacée" });
    } else {
      return res.status(400).json({ success: false, message: "Erreur dans la requête" });
    }
  }


  //MIS A JOUR
  static async update(req, res) {

    console.log(req.body);
    const { id, titre, resume } = req.body;

    const updateVideo = await videos.update({ titre: titre, resume: resume }, { where: { id: id } });
    if (updateVideo) {
      return res.json({ success: true, message: "Mise à jour OK" });
    } else {
      return res.status(400).json({ success: false, message: "Erreur dans la requête" });
    }

  }

}
//Exportation du controller
module.exports = VideoController;
