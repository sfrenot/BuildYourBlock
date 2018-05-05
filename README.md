# Tutoriel Blockchain : de zéro vers ...

Le but de ce tutoriel est de coder une blockchain depuis zéro pour en comprendre les mécanismes. Cette Blockchain sera très loin d'une Blockchain de production mais permettra d'illustrer les différentes mécaniques la constituant. Les notions et les problématiques seront introduites au furent et à mesure de la progression. Certaines seront *un peu* simplifiées.

Le code sera en Javascript pour permettre au plus grand nombre de réaliser ce tutoriel et parce que c'est le langage de programmation que j'utilise toujours les jours :D. L'environnement utilisé est Node.js (https://nodejs.org/fr/) en version 10 avec npm pour gérer les dépendances. Je pars du principe que vous savez coder dans ce langage et utiliser git.

Pour écrire ce tutoriel, je me suis inspiré de la suite d'article de Kass sur Medium réaliser avec le langage Java : https://medium.com/programmers-blockchain/create-simple-blockchain-java-tutorial-from-scratch-6eeed3cb03fa.

## Au commencement fut le block

Dans Blockchain, il y a block. Un block est un ensemble d'informations et quand les blocks sont mis bout à bout, ils forment une chaine : la Blockchain !

Commençons avec un block assez simple :

* un identifiant : permet d'identifier le block. Il sera généré aléatoirement.
* un parent : l'identifiant du block qui précède dans la chaine. Cela nous permettra de remonter la chaine jusqu'à sont origine.
* des données : pour le moment, une simple chaine de caractère.
* la date de création du block.

J'ai écris un fichier `index.js` qui ressemble à ça :

```Javascript
const Block = require("./Block");

const first = new Block("00000000", "First !");
const second = new Block(first.id, "Second :)");
const constructif = new Block(second.id, "Vous commencez à voir le principe ?");

console.log([first, second, constructif]);
```

J'ai aussi commencé à écrire un fichier `Block.js` mais je vais laisser le compléter !

Quand c'est fini, dans un terminal placé dans ce dossier : `npm start`. Vous devriez voir quelque chose comme cela :

```Javascript
[ Block {
    id: 466991139,
    previous: 0,
    data: 'First !',
    date: 2018-05-05T14:49:29.152Z },
  Block {
    id: 349521768,
    previous: 466991139,
    data: 'Second :)',
    date: 2018-05-05T14:49:29.152Z },
  Block {
    id: 847041514,
    previous: 349521768,
    data: 'Vous commencez à voir le principe ?',
    date: 2018-05-05T14:49:29.152Z } ]
```

C'est bon ? Magnifique ! Vous avez une première blockchain ! Bon, par contre, elle est sacrément pas fonctionnelle... Normalement, quand un block est ajouté dans la Blockchain, il n'est plus modifiable. Ici, rien ne vous empêche de modifier ce que vous voulez.
