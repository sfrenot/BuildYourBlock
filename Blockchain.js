const crypto = require('crypto');

module.exports = class Blockchain {
  constructor() {
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

  isValid() {
    // Modifier ici.
  }
}
