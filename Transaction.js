const NodeRSA = require('node-rsa');

class Transaction {
  // Construit une transaction envoyant montant à destinataire.
  // Retourne la transaction
  static buildSimpleTransaction(senderWallet, destinataire, montant, uTxOut) {
    // ...
    return new Transaction(/* ... */);
  }

  // @params txIns : un tableau de txIn
  // @params txOuts : un tableau de txOut
  constructor(
    txIns,
    txOuts
  ) {
    // ...
    this.id = ''; // ...
  }

  // Vérifie la validité des informations de la transaction
  // comme la somme des entrées = somme des sorties
  // Retourne un booléen
  verify() {
    // ...
  }

  // Retourne le hash du Tx : hash des txIns + hash des txOuts
  getHash() {
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

  // Retourne le hash du TxIn : tx.getHash() + index + signature
  getHash() {
    // ...
  }
}

class TxOut {
  constructor(montant, destinataire) {
    // ...
  }

  // Retourne le hash du TxOut : montant + destinataire
  getHash() {
    // ...
  }
}

// Représente une transaction non dépensées
// Sert uniquement de base de données
class UTxOut {
  // @params tx : un transaction
  // @params index : index du txOut dans le tableau txOuts de tx
  constructor(tx, index) {
    // ...
  }

  // Retourne un TxIn
  toTxIn(wallet) {
    // ...
  }
}

module.exports = {
  Transaction,
  TxIn,
  TxOut,
  UTxOut
}
