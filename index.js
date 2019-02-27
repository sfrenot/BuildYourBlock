const Block = require("./Block");

const first = new Block(
  null,
  new Date("2019-02-27T08:01:42.000Z"),
  "First !"
);

const second = new Block(
  first.id,
  new Date("2019-02-27T10:02:43.000Z"),
  "Second :)"
);

const third = new Block(
  second.id,
  new Date("2019-02-28T10:03:44.000Z"),
  "Vous commencez à voir le principe ?"
);

console.log([first, second, third]);
