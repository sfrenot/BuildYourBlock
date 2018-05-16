const Block = require('./Block');
const Blockchain = require('./Blockchain');

const difficulty = 5;

const blockchain = new Blockchain();

blockchain.add(new Block(null, "First !"));
blockchain.last().miner(difficulty);
blockchain.add(new Block(blockchain.last().id, "Second :)"));
blockchain.last().miner(difficulty);
blockchain.add(new Block(blockchain.last().id, "Vous commencez à voir le principe ?"));
blockchain.last().miner(difficulty);

console.log("isValid:", blockchain.isValid(difficulty));

console.log(blockchain);
