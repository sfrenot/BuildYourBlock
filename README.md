# Tutoriel Blockchain : de zéro vers ...

On est en mesure de chainer les blocks et de vérifier que la chaine n'a pas été modifié.

On aimerait maintenant pouvoir échanger de la valeur via cette Blockchain. Pouvoir faire un chèque de la forme : Moi, Jean Dupond transfere 10€ à Dupont Jean. Sous cette forme, il y a plusieurs problèmes : comment gérer les homonymes ? Comment s'assurer que c'est bien Jean qui à signer le chèque ? Comment s'assurer que Jean a bien l'argent ? ...

Pour les deux premières questions, il y a une solution "simple" : un couple de clés publique et privée. Pour la troisième, on va créer notre propre monnaie !

Explications !

## Une histoire de couple

La cryptographie met à notre disposition un super outil : RSA. Pour les détails : https://fr.wikipedia.org/wiki/Chiffrement_RSA.

En très gros, vous produisez un couple clé publique / clé privée. Comme son nom l'indique, vous pouvez rendre publique ... la clé publique ! Cette clé peut servir à plusieurs choses :

* vous écrire un message en l'encryptant avec. Seul les personnes ayant la clé privée associé peuvent le décrypter.
* Décrypter un message encrypté avec la clé privée.
* Vérifier votre signature !

Cette clé sera l'adresse de votre portefeuille. Je vais encore prendre un raccourci mais elle est unique, plus de problème d'homonymes ! Vous pouvez aussi signer des messages et les autres pourront vérifier que c'est bien vous.

Comme ça c'est super beau et cool mais ça ne me dit pas comment faire :/

On a un premier problème, c'est que Node.js ne sais pas générer un couple de clés RSA. Il faut installer une bibliothèque tiers. Pas de soucis, on va utiliser le gestionnaire de dépendances de Node.js pour la récupérer et l'installer, j'ai nommé npm :

    npm install node-rsa

Vous pouvez maintenant utiliser la bibliothèque pour encrypter et décrypter un message.

    const NodeRSA = require('node-rsa');
    const key = new NodeRSA({b:2048});

    const text = 'Hello RSA!';
    const encrypted = key.encryptPrivate(text, 'base64');
    console.log('encrypted: ', encrypted);
    const decrypted = key.decryptPublic(encrypted, 'utf8');
    console.log('decrypted: ', decrypted);

    const msg = "Je transfère 10€ à Jean Dupond"
    const signature = key.sign(msg)

    console.log("Signature :", signature);
    console.log("Vérifier :", key.verify(msg, signature));

Pour en savoir plus sur comment l'utiliser : https://github.com/rzcoder/node-rsa.

La clé publique représente ce qu'on appel un wallet. Pour le moment, disons qu'un wallet a un montant, une clé publique et si vous en êtes propriétaire, une clé privée. Il permet aussi au propriétaire de signer des messages et à tout le monde de vérifier la signature. Tout compris ? Vous n'avez plus qu'à compléter le fichier `Wallet.js`.

## Build Your Block Coin

On a maintenant sur solution pour signer, il faut maintenant de l'argent à transférer.

Créons une nouvelle unité, le Build Your Block coin ou BYB. Disons qu'un BYB vaut un centime. Dans ce contexte, que devient la phrase : Moi, Jean Dupond transfere 10€ à Dupont Jean ?

[![musique de questions](https://img.youtube.com/vi/QrPCPoOAO4E/0.jpg)](https://www.youtube.com/watch?v=QrPCPoOAO4E)

C'est une transaction de la forme :

* source : clé publique de Jean Dupond
* destination : clé publique de Dupont Jean
* valeur : 1000 BYB
* signature : source + destination + valeur signé avec la clé privée de Jean Dupond

Facile ! Je vous laisse compléter le fichier Transaction.js alors !

## Mettre des transactions en block

On sait produire des transactions, maintenant, pour les sauvegarder, il faut les mettre dans la blockchain.

Je vous laisse faire ! Modifiez la classe `Block` pour que data soit maintenant une liste de `Transaction`s.

## Suite

C'est bon ? Bravo ! Mais en faite, on n'a toujours pas résolu la question de s'assurer que la source à l'argent. Vous ne pouvez pas non plus distinguer deux envois de 1000 BYB. Qu'est qui empêche Dupont Jean d'ajouter indéfiniment votre transaction à la Blockchain ?

Pour résoudre tout ça, il va falloir complexifier un peu les transactions. Pas beaucoup mais on va y consacrer l'étape suivante : `git checkout etape-4`.
