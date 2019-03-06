const NodeRSA = require('node-rsa');

module.exports = class Wallet {

  // https://github.com/rzcoder/node-rsa#load-key-from-pem-string
  constructor(key) {
    // Complétez le constructeur
  }

  // Retourne un booléen à true si l'on a la clé privée
  // https://github.com/rzcoder/node-rsa#properties
  hasPrivate() {
    // Astuce quand il y aura quelque-chose de bizarre:
    //   let maVariable = 42;
    //   !!maVariable === true
    return true; //...
  }

  // Retourne la clé publique
  // https://github.com/rzcoder/node-rsa#importexport-keys
  getPublicKey() {
    return ; // ...
  }

  // Retourne la signature
  // https://github.com/rzcoder/node-rsa#signingverifying
  sign(msg) {
    return ; // ...
  }

  // Vérifie la signature
  // Retourne un booléen à true si la signature est bonne
  // https://github.com/rzcoder/node-rsa#signingverifying
  verify(msg, signature) {
    return true; // ...
  }
}
