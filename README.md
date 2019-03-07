# Tutoriel Blockchain : de zéro vers ...

On est en mesure de chaîner les blocks et de vérifier que la chaîne n'a pas été modifié.

On aimerait maintenant pouvoir échanger de la valeur via cette Blockchain. Pouvoir faire un chèque de la forme : Moi, Jean Dupond transfère 10€ à Dupont Jean. Sous cette forme, il y a plusieurs problèmes : comment gérer les homonymes ? Comment s'assurer que c'est bien Jean qui a signé le chèque ? Comment s'assurer que Jean a bien l'argent ?

Pour les deux premières questions, il y a une solution "simple" : un couple de clés publique et privée. Pour la troisième, on va créer notre propre monnaie.

Explications !

## Objectifs

* Comprendre la notion de couple clé publique/clé privée.
* Apprendre à manipuler une clé RSA.
* Comprendre la notion de transaction.

## Une histoire de couple

La cryptographie met à notre disposition un super outil : RSA. Pour les détails : https://fr.wikipedia.org/wiki/Chiffrement_RSA.

En très gros, vous produisez un couple clé publique/clé privée. Comme son nom l'indique, vous pouvez rendre publique ... la clé publique ! Cette clé peut servir à plusieurs choses :

* Vous écrire un message en l'encryptant avec. Seules les personnes ayant la clé privée associée peuvent le décrypter.
* Décrypter un message encrypté avec la clé privée.
* Vérifier votre signature !

Cette clé sera l'adresse de votre portefeuille. Je vais encore prendre un raccourci mais elle est unique, plus de problème d'homonymes ! Vous pouvez aussi signer des messages et les autres pourront vérifier que c'est bien vous.

Comme ça, c'est super beau et cool mais ça ne me dit pas comment faire :/

On a un premier problème, c'est que Node.js ne sait pas générer un couple de clés RSA. Il faut installer une bibliothèque tierce. Pas de soucis, on va utiliser le gestionnaire de dépendances de Node.js pour la récupérer et l'installer, j'ai nommé npm :

    npm install node-rsa

Vous pouvez maintenant utiliser la bibliothèque pour encrypter et décrypter un message mais aussi pour le signer et vérifier la signature.

```Javascript
const NodeRSA = require('node-rsa');
const key = new NodeRSA({b:2048}); // Génère une nouvelle clé
// const key = new NodeRSA("maclé..."); // importe la clé en paramètre

const msg = "Je transfère 10€ à Jean Dupond"
const signature = key.sign(msg)

console.log("Signature :", signature); // Signature : <Buffer c4 3a d3 01 df fc 56 4a 01 8b ... 246 more bytes>
console.log("Vérifier :", key.verify(msg, signature)); // Vérifier : true
```

Pour en savoir plus sur comment l'utiliser : https://github.com/rzcoder/node-rsa.

La clé publique représente ce qu'on appel votre adresse ou un wallet. Pour le moment, disons qu'un wallet a une clé publique et si vous en êtes propriétaire, une clé privée. Il permet aussi au propriétaire de signer des messages et à tout le monde de vérifier la signature. Tout compris ?

Regardez `etape-3-wallet.js` et vous n'avez plus qu'à compléter le fichier `Wallet.js`.

    node etape-3-wallet.js

## Build Your Block Coin

On a maintenant une solution pour signer, il faut maintenant de l'argent à transférer.

Créons une nouvelle unité, le Build Your Block coin ou BYB. Disons qu'un BYB vaut un centime. Dans ce contexte, que devient la phrase : Moi, Jean Dupond transfère 10€ à Dupont Jean ?

[![musique de questions](https://img.youtube.com/vi/QrPCPoOAO4E/0.jpg)](https://www.youtube.com/watch?v=QrPCPoOAO4E)

C'est une transaction de la forme :

* source : clé publique de Jean Dupond
* destination : clé publique de Dupont Jean
* valeur : 1000 BYB

Et pour signer le chèque :

* signature : source + destination + valeur signé avec la clé privée de Jean Dupond

On peut le représenter comme cela :

     Transaction 1
    +------------------------------------------------------+
    |                                                      |
    | source: <Jean public key>                            |
    | destination: <Dupont public key>                     |
    | value: 1000                                          |
    |                                                      |
    +------------------------------------------------------+
    |                                                      |
    | signature: <Jean.sign(source + destination + value)> |
    |                                                      |
    +------------------------------------------------------+

Facile ! Oui mais non.

Mais en fait, on n'a toujours pas résolu la question de s'assurer que la source a l'argent. Vous ne pouvez pas non plus distinguer deux envois de 1000 BYB. Qu'est-ce qui empêche Dupont Jean d'ajouter indéfiniment votre transaction à la Blockchain ?

## Mon précieux !

Comment rendre une transaction unique ?

Une idée ?

On veut que quelque-chose soit unique ? On a déjà eu ce problème, non ? Quelle solution a-t-on utilisée déjà ?

Vous avez trouvé ?

Et si on mettait un id à nos transactions calculé à partir du contenu de celle-ci ? C'est cool ça, mais je vois déjà plein de choses qu'il va falloir vérifier. Il va falloir vérifier que la transaction est unique dans la blockchain, si elle est dans la blockchain, je ne peux pas l'ajouter au block courant. Mais pour ça, il faut avoir toute la blockchain et la parcourir à la recherche de transaction identique. Couteux mais faisable.

Autre chose, si je veux faire deux transactions de 1000 BYB à Jean, je ne peux pas car leur signature sera la même ! Je dois rajouter une autre information comme la date et/ou un nonce.

Une transaction aurait au moins : une source, un destinataire, un montant, un nonce ou date et une signature.

     Transaction 2
    +--------------------------------------------------+
    |                                                  |
    | id: <hash(source + destination + value + nonce)> |
    | source: <Jean public key>                        |
    | destination: <Dupont public key>                 |
    | value: 1000                                      |
    | nonce: <exemple: 21>                             |
    |                                                  |
    +--------------------------------------------------+
    |                                                  |
    | signature: <Jean.sign(id)>                       |
    |                                                  |
    +--------------------------------------------------+

Pour que cette solution fonctionne, il faut que je maintienne le solde de tous les comptes des utilisateurs.

## Ça coule de source

Maintenir l'état des comptes de tout le monde ne me fait pas envie. En plus, j'aimerait pouvoir faire plusieurs choses :

* Ne pas devoir stocker l'intégralité de la blockchain pour valider une transaction.
* Pouvoir remonter à la source de l'argent.
* Pouvoir mettre des conditions sur l'utilisation de l'argent.

Pour la dernière, on verra ça plus tard. Pour les deux premières, c'est assez similaire aux blocks : on va chainer les transactions !

Une transaction prendra en entrée une ou plusieurs autres transactions que j'ai reçu et aura une ou plusieurs sorties.

     Transaction
    +-----------------------------+
    |                             |
    | id: <sha(inputs + outputs)> |
    | inputs: []                  |
    | outputs: []                 |
    |                             |
    +-----------------------------+

###### Pourquoi ne pas se limiter à une entrée et une sortie ?

Une entrée est un `Input`. Un `Input` représente la sortie d'une transaction précédente, elle contient une référence à la transaction et l'index de la sortie. Elle est aussi la preuve que la personne à le droit d'utiliser la sortie, elle contient la signature du destinataire de la sortie référencée.

     Input
    +-----------------------------+
    |                             |
    | tx: <ref une transaction>   |
    | index: <index de la sortie> |
    | hash: <hash(tx.id + index)> |
    | signature: <sign(hash)>     |
    |                             |
    +-----------------------------+

Une sortie un `Output`. Un `Output` aura un montant et un destinataire. Les deux ont un hash permettant de vérifier leur contenu.

     Output
     +-----------------------------------------+
     |                                         |
     | montant: <exemple: 1000>                |
     | destinataire: <public key destinataire> |
     | hash: <hash(montant + destinataire)>    |
     |                                         |
     +-----------------------------------------+

Une sortie qui n'est pas utilisée comme entrée représente votre argent disponible.

###### Pourquoi cette solution permet de résoudre les deux premiers points ?

     Transaction 0                                   Transaction 1
    +----------------------------------------+      +-------------------------------------------+
    |                                        |      |                                           |
    | id: < Exemple: 1654823783 > <-------------+   | id: <sha(inputs + outputs)>               |
    | inputs: []                             |  |   | inputs: [                                 |
    | outputs:  ]                            |  |   |                                           |
    |                                        |  |   |   Input                                   |
    |   Output                               |  |   |  +--------------------------------------+ |
    |  +-----------------------------------+ |  |   |  |                                      | |
    |  |                                   | |  +------+ tx: < Exemple: 1654823783 >          | |
    |  | montant: 5000                     +<----------+ index: 0                             | |
    |  | destinataire: <public key Alice > | |      |  | signature: <destinataire.sign(hash)> | |
    |  |     ^                             | |      |  |                +                     | |
    |  +-----------------------------------+ |      |  +--------------------------------------+ |
    |        |                               |      |                   |                       |
    | ]      +----------------------------------------------------------+                       |
    |                                        |      | ]                                         |
    +----------------------------------------+      |                                           |
                                                    | outputs: [                                |
                                                    |                                           |
                                                    |    Output                                 |
                                                    |   +-----------------------------------+   |
                                                    |   |                                   |   |
                                                    |   | montant: 1000                     |   |
                                                    |   | destinataire: <public key Bob >   |   |
                                                    |   |                                   |   |
                                                    |   +-----------------------------------+   |
                                                    |                                           |
                                                    |    Output                                 |
                                                    |   +-----------------------------------+   |
                                                    |   |                                   |   |
                                                    |   | montant: 4000                     |   |
                                                    |   | destinataire: <public key Alice > |   |
                                                    |   |     ^                             |   |
                                                    |   +-----+-----------------------------+   |
                                                    |                                           |
                                                    | ]                                         |
                                                    |                                           |
                                                    +-------------------------------------------+


Implémentons ! Regardez le fichier `etape-3-transaction.js` et complétez `Transaction.js`.

###### Combien de BYB Alice a avant le transfère à Bob ?
###### Combien de BYB ont Alice et Bob après le transfère ?
###### Bis repetita, pourquoi ne pas se limiter à une entrée et une sortie ?

## Mettre des transactions en block

On sait produire des transactions, maintenant, pour les sauvegarder, il faut les mettre dans la blockchain.

Je vous laisse faire ! Modifiez la classe `Block` pour que data soit maintenant une liste de `Transaction`s.

## Fait tourner la planche à billets

###### Comment peut-on créer de l'argent ?

La solution de Bitcoin est de créer de la monnaie à chaque block. Le première transaction de chaque block est une transaction sans Input mais avec une sortie.

Implémentez cette mécanique pour que chaque nouveau block crée 50 BYB.

## Suite

Vos mains saignent devant tant de code mais ça fonctionne ? Cool ! <Rire sadique> :D

Je n'ai pas encore écrit la suite. Vous avez fini ? Alors `git checkout etape-4` et vous écrivez un tuto pour codez un client pair à pair ou bien pour modifier le code pour que les transactions acceptent un script qui permet des conditions comme *attendre 100 blocks avant de dépenser* ou *Il faut la signature de deux personnes pour la dépenser*.

## Questions cultures

###### Qu'est-ce qu'un arbre de Merkle ?
