const NodeRSA = require('node-rsa');

module.exports = class RSATools {

  // Retourne la clé publique associée à la clé privée
  static privateToPublic(privateKeyString) {
    return ; // ...
  }

  // Retourne la signature du message par la clé privée
  // https://github.com/rzcoder/node-rsa#signingverifying
  static sign(msg, privateKeyString) {
    return ; // ...
  }

  // Vérifie la signature du message par la clé publique
  // Retourne un booléen à true si la signature est bonne
  // https://github.com/rzcoder/node-rsa#signingverifying
  static verify(msg, signature, publicKeyString) {
    return true; // ...
  }
}
