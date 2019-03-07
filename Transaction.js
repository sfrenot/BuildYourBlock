const NodeRSA = require('node-rsa');
const crypto = require('crypto');

function calcUnspentOutputsForMontant(montant, unspentOutputs, myPublicKey) {
  let unspentOutputsForMontant = [];
  let valueUnspentOutputsForMontant = 0;

  for (let i = 0; i < unspentOutputs.length; i++) {
    const unspentOutput = unspentOutputs[i];
    const output = unspentOutput.tx.outputs[unspentOutput.index];

    if(output.destinataire === publicKey) {
      unspentOutputsForMontant.push(unspentOutput);
      valueUnspentOutputsForMontant += output.montant;

      if (valueUnspentOutputsForMontant >= montant) {
        return unspentOutputsForMontant;
      } else {
        continue;
      }
    } else {
      continue;
    }
  }

  // Quand on n'a pas assez d'argent, on lance une exception
  throw new Error("Vous n'avez pas assez.");
}

// Représente une transaction ou un chèque.
// Souvent abrégé en tx quand passé en variable.
class Transaction {
  // Construit une transaction envoyant montant à destinataire.
  // Retourne la transaction
  static buildSimpleTransaction(senderWallet, destinataire, montant, unspentOutputs) {

    const unspentOutputsForMontant = calcUnspentOutputsForMontant(/* ... */);
    // ...

    return new Transaction(/* ... */);
  }

  // @params inputs : un tableau de Input
  // @params outputs : un tableau de Output
  constructor(
    inputs,
    outputs
  ) {
    // ...
    this.id = ''; // ...
  }

  // Retourne le hash du Tx : hash des inputs + hash des outputs
  getHash() {
    const hashInputs = this.inputs.map((input) => {return input.hash;}).join('');
    // ...
  }
}

class Input {
  // @params tx : transaction dans laquelle est le Output que j'utilise
  // @params index : index du Output dans le outputs de la transaction
  // @params signature : signature du destinataire du Output
  constructor(tx, index, signature = undefined) {
    // ...
  }

  // Calcule la signature
  sign(wallet) {
    this.signature = "/* ... */";
  }

  // Retourne le hash du Input : tx.id + index
  getHash() {
    // ...
  }
}

class Output {
  constructor(montant, destinataire) {
    // ...
  }

  // Retourne le hash du Output : montant + destinataire
  getHash() {
    // ...
  }
}

module.exports = {
  Transaction,
  Input,
  Output
}
