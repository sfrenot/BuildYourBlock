const NodeRSA = require('node-rsa');

module.exports = class Transaction {
  constructor(
    sourcePublicKey,
    destinationPublicKey,
    montant,
    signature = null
  ) {}

  sign(privateKey) {}

  setSignature(signature) {}

  verify() {}
}
