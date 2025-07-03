const path = require('path');
const jwt = require('jsonwebtoken');

const functionGeneral = {

    //APPLIQUE LE CODEC VIDEO EN FONCTION DU FORMAT DE CONVRSION
    applyCodecs: (ffmpegCommand, format, codec) => {
        switch (format) {
            case 'mp4':
                return ffmpegCommand
                    .videoCodec(codec)
                    .audioCodec('aac')
                    .format('mp4');
            case 'webm':
                return ffmpegCommand
                    .videoCodec(codec)
                    .audioCodec('libvorbis')
                    .format('webm');
            case 'mkv':
                return ffmpegCommand
                    .videoCodec(codec)
                    .audioCodec('aac')
                    .format('matroska');
            default:
                throw new Error('Format de sortie non pris en charge : ' + format);
        }
    },

    //RETOURNE LE PATH DE LA VIDEO ENCODEE AVEC LA BONNE EXTENSION
    getOutputFilePath: (format) => {
        const filename = `${Date.now()}.${format}`;
        return path.join(__dirname, '../videos/encodées', filename);
    },

    //RECUPERE ET DECODE LE TOKE JWT STOCKE DANS UN COOKIE SPECIFIQUE
    getTokenCookie(req, secret, cookieName  = "token") {
        try {
            //RECUPERE LES COOKIES DANS LE HEADER
            const cookieHeader = req.headers.cookie;
            if (!cookieHeader) return null; 

            //TRANSFORME LA CHAINE DE COOKIES EN TABLEAU, CHAQUE COOKIE ETANT UN ELEMENT
            const cookies = cookieHeader.split(';').map(c => c.trim());
            //RECHERCHE UN ELEMENT DU TABLEAU SOUS CONDITION ICI => COOKIENAME
            const tokenCookie = cookies.find(c => c.startsWith(cookieName + '='));
            if (!tokenCookie) return null;

            //RECUPERE LA VALEUR DU TOKEN (TOUT CE QUI SUIT LE '=')
            const token = tokenCookie.split('=')[1];
            if (!token) return null;

            //DECODE LE TOKEN
            const decoded = jwt.verify(token, secret);
            return decoded;
        } catch (error) {
            return null;
        }
    }

}

module.exports = functionGeneral;
