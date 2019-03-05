const NodeRSA = require('node-rsa');

class Transaction {
  // Construit une transaction envoyant montant à destinataire.
  // Retourne la transaction
  static buildSimpleTransaction(senderWallet, destinataire, montant, uTxOut) {

  }

  // @params txIns : un tableau de txIn
  // @params txOuts : un tableau de txOut
  constructor(
    txIns,
    txOuts
  ) {
    // ...
  }

  // Vérifie la validité des informations de la transaction
  // Retourne un booléen
  verify() {
    // ...
  }
}

class TxIn {
  // @params tx : transaction dans laquelle est le txOut que j'utilise
  // @params index : index du txOut dans la transaction
  // @params signature : signature du destinataire du txOut
  constructor(tx, index, signature) {
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
  // @params tx : un transaction
  // @params index : index du txOut dans le tableau txOuts de tx
  constructor(tx, index) {
    // ...
  }

  // Retourne un TxIn
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
