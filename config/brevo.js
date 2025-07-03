// IMPORTATION DU SDK BREVO 
const Brevo = require('@getbrevo/brevo');

// CRÉATION D'UNE INSTANCE DE L'API D'ENVOI D'E-MAILS TRANSACTIONNELS
const apiInstance = new Brevo.TransactionalEmailsApi();

// CONFIGURATION DE LA CLÉ API
apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey, 
  process.env.BREVO_API_KEY                   
);

// EXPORTATION DES ÉLÉMENTS POUR UTILISATION DANS D'AUTRES FICHIERS
module.exports = {
  apiInstance,                 
  SendSmtpEmail: Brevo.SendSmtpEmail // LE CONSTRUCTEUR DE L'OBJET DE CONFIGURATION D'UN E-MAIL SMTP
};

