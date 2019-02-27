# Tutoriel Blockchain : de zéro vers ...

Le but de ce tutoriel est de coder une blockchain depuis zéro pour en comprendre les mécanismes. Cette Blockchain sera très loin d'une Blockchain de production mais permettra d'illustrer les différentes mécaniques la constituant. Les notions et les problématiques seront introduites au furent et à mesure de la progression. Certaines seront *un peu* simplifiées.

Le code sera en Javascript pour permettre au plus grand nombre de réaliser ce tutoriel et parce que c'est le langage de programmation que j'utilise toujours les jours :D. L'environnement utilisé est Node.js (https://nodejs.org/fr/) en version 10 avec npm pour gérer les dépendances. Je pars du principe que vous savez coder dans ce langage et utiliser git.

Pour écrire ce tutoriel, je me suis inspiré de la suite d'article de Kass sur Medium réaliser avec le langage Java : https://medium.com/programmers-blockchain/create-simple-blockchain-java-tutorial-from-scratch-6eeed3cb03fa.

## Cloner ce dépôt

```Bash
git clone https://github.com/dreimert/BuildYourBlock.git
cd BuildYourBlock
```

## Work in progress

Ce tutoriel est en cours d'écriture. Je prévois une première version relue et corrigée pour septembre 2018.

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

const first = new Block(null, "First !");
const second = new Block(first.id, "Second :)");
const constructif = new Block(second.id, "Vous commencez à voir le principe ?");

console.log([first, second, constructif]);
```

J'ai aussi commencé à écrire un fichier `Block.js` mais je vais laisser le compléter !

Quand c'est fini, dans un terminal placé dans ce dossier : `npm start`. Vous devriez voir quelque chose comme cela :

```Javascript
[ Block {
    id: 510140110, // peux être diffèrent
    previous: null,
    data: 'First !',
    date: 2019-02-27T08:01:42.000Z },
  Block {
    id: 515642654,  // peux être diffèrent
    previous: 510140110,  // peux être diffèrent
    data: 'Second :)',
    date: 2019-02-27T10:02:43.000Z },
  Block {
    id: 721495421,  // peux être diffèrent
    previous: 515642654,  // peux être diffèrent
    data: 'Vous commencez à voir le principe ?',
    date: 2019-02-28T10:03:44.000Z } ]
```

C'est bon ? Magnifique ! Vous avez une première blockchain ! Bon, par contre, elle est sacrément pas fonctionnelle... Normalement, quand un block est ajouté dans la Blockchain, il n'est plus modifiable. Ici, rien ne vous empêche de modifier ce que vous voulez.

## Prenons un peu de hash

Nous voulons vérifier que les blocks n'ont pas été modifié. Pour vérifier que quelque-chose n'a pas été modifié, il est courant en informatique d'utiliser des fonctions de hachage.

Une fonction de hachage est une fonction qui prendre en entrée un ensemble quelconque de données et retourne une empreinte, aussi appelée hash, permettant d'identifier l'entrée. Cette empreinte est de taille fixe quelque-soit l'entrée. Une fonction couramment utilisé est SHA. Voici quelques exemples d'empreinte :

```Bash
> echo "Blockchain" | shasum
# efcf8baf5959ad1ebc7f4950425ef1c2eae9cbd9  -

> echo "Block" | shasum
# d1a6b1157e37bdaad78bec4c3240f0d6c576ad21  -

> echo "Vous commencez à voir le principe ?" | shasum
# 25abec7ced7642b886c1bffbc710cc3439f23ab7  -
```

Une autre propriété intéressante est qu'une petite modification dans l'entrée change totalement l'empreinte :

```Bash
> echo "Blockchain" | shasum
# efcf8baf5959ad1ebc7f4950425ef1c2eae9cbd9  -

> echo "blockchain" | shasum
# ea5f179324c233b002fa8ac4201fa216001515e5  -
```

Si je vous parle de tout ça, c'est qu'on va l'utiliser mais comment cela résout notre problème ?

Une idée ?

Cool !

On va calculer l'empreinte du block avec cette fonction et on va utiliser cette empreinte comme identifiant du block ! Si on modifie le block, son empreinte change donc son id change ! Mais cette id est utilisé dans le block suivant, ce qui modifie son empreinte. Et ainsi de suite jusqu'au dernier block de la chaine.

La fonction suivante prend en entrée une chaine de caractère et retour l'empreinte correspondante.

```Javascript
const crypto = require('crypto');

function getHash(data) {
  return crypto.createHash('sha256').update(data, 'utf8').digest('hex');
}
```

Modifier la class Block pour lui ajouter une fonction getHash qui calcule l'empreinte correspondant au block. Pour calculer cette empreinte, vous devez utiliser l'identifiant du block précédent, la date du block et les données contenu dans le block.

```Javascript
const toHash = `${this.previous}${this.data}${this.date}`;
```

Vous obtenez exactement ça :

```Javascript
[ Block {
    previous: null,
    data: 'First !',
    date: 2019-02-27T08:01:42.000Z,
    id:
     'a41f8877855bd3d91519bc73a6d77963d7034b8275252a55ee3dd775870f8cac' },
  Block {
    previous:
     'a41f8877855bd3d91519bc73a6d77963d7034b8275252a55ee3dd775870f8cac',
    data: 'Second :)',
    date: 2019-02-27T10:02:43.000Z,
    id:
     'e5c9f1816fb8bc23f361ae89e91681104b78832fe4aefef3eba8deeb3dbd5d95' },
  Block {
    previous:
     'e5c9f1816fb8bc23f361ae89e91681104b78832fe4aefef3eba8deeb3dbd5d95',
    data: 'Vous commencez à voir le principe ?',
    date: 2019-02-28T10:03:44.000Z,
    id:
     'e78126cef62cd6e82a540a44fb3df71faab249ec4f1893173063aedca589aa03' } ]
```

###### Que pouvez-vous dire sur l'ordre des champs par rapport à l'affichage précédent ? Pourquoi ?

Maintenant, essayez de modifier le premier élément de la chaine.

###### Comparez. Qu'est-ce qu'il se passe ?

## Suite

Vous avez survécu ? Cool ! Passons à l'étape suivante : `git checkout etape-2`.
