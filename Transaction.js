const NodeRSA = require('node-rsa');

class Transaction {
  static buildSimpleTransaction(senderWallet, destinataire, montant, uTxOut) {

  }

  constructor(
    txIns,
    txOuts
  ) {
    // ...
  }

  verify() {
    // ...
  }
}

class TxIn {
  constructor(TxId, index, signature) {
    // ...
  }
}

class TxOut {
  constructor(montant, destinataire) {
    // ...
  }
}

// Représente une transaction non dépensées
class UTxOut {
  constructor(txOut, index) {
    // ...
  }

  toTxInt(wallet) {
    // ...
  }
}

module.exports = {
  Transaction,
  TxIn,
  TxOut,
  UTxOut
}
