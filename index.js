const Block = require('./Block');
const Blockchain = require('./Blockchain');

const blockchain = new Blockchain();

blockchain.add(new Block(null, "First !"));
blockchain.add(new Block(blockchain.last().id, "Second :)"));
blockchain.add(new Block(blockchain.last().id, "Vous commencez à voir le principe ?"));

console.log("isValid:", blockchain.isValid());

console.log(blockchain);
