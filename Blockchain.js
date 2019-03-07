const crypto = require('crypto');
const { BlockchainTool } = require('./tools');

module.exports = class Blockchain extends BlockchainTool {
  constructor() {
    super()
    this.chain = [];
  }

  add(block) {
    this.chain.push(block);
  }

  last() {
    if (this.chain.length > 0) {
      return this.chain[this.chain.length - 1];
    } else {
      throw new Error("La blockchain est vide");
    }
  }

  // Retourne un boolean qui indique si la blockchain est valide
  isValid(DIFFICULTY) {
    // Modifier ici.
    return false;
  }
}
