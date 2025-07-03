 # Convertisseur Vidéo WebM avec FFmpeg

Ce projet Node.js utilise [`fluent-ffmpeg`](https://www.npmjs.com/package/fluent-ffmpeg) pour convertir des vidéos en WebM, MKV et MP4, intégrant FFmpeg de manière fluide en JavaScript.

## Pourquoi avoir choisi Node.js ?


Tout d'abord, avec Node.js, on peut utiliser JavaScript à la fois côté client et côté serveur. C'est super pratique car cela simplifie le développement, la maintenance et le partage de code.  

Ensuite, Node.js a un écosystème très riche et moderne grâce à npm. On trouve plein de modules actifs pour gérer les fichiers, les vidéos (comme fluent-ffmpeg), la sécurité (bcryptjs), et l’authentification (jsonwebtoken).  
    

Node.js permet aussi un développement rapide. Avec Express et les outils associés, on peut prototyper et développer rapidement, avec une syntaxe simple et une configuration légère.  
Enfin, Node.js est facile à déployer. Il s’intègre sans problème avec les serveurs modernes et les plateformes cloud, et la gestion des dépendances est simplifiée grâce à npm.

---
## Architecture:

- Model View Controller (MVC)
- POO / Fonctionnelle

## Librairies :
-   "bcryptjs": "^3.0.2" => Cryptage des données
-   "bootstrap": "^5.3.7", => Style des pages
-   "dotenv": "^16.6.1", => Gestion des variables d'envronnement
-   "ejs": "^3.1.10", => Moteur de template
-   "express": "^5.1.0", => Serveur
-   "express-session": "^1.18.1", => Gestion des sessions  
-   "fluent-ffmpeg": "^2.1.3", => Manipule/convertit des vidéos via FFmpeg.
-   "jsonwebtoken": "^9.0.2", => Gestion des token (création, décodage, vérification) 
-   "multer": "^2.0.1", => Gère l’upload de fichiers.
-   "sequelize": "^6.37.7", => ORM
-   "sqlite3": "^5.1.7" => Gestion sans ORM de la base de donnée en Sqlite
## Base de donnée:
- Sqlite => Gerer par l'ORM sequelize

  - Pourquoi sequelize ?
Rapide à installer, sécurisé, CRUD integrer.   
Documentation simple https://sequelize.org/docs/v6/

- Exemple de model de donnée sans ORM non utilisé models/Users.js => Géré par sqlite3

## Prérequis

### Environnement:
- **Node.js** (version 14 ou supérieure recommandée)
- **FFmpeg** installé et accessible en ligne de commande

### Installation de FFmpeg

- [FFmpeg officiel](https://ffmpeg.org/download.html)  
- Sur macOS via Homebrew :  
  ```bash
  brew install ffmpeg

- Sur Linux :
    ```bash
    sudo apt update
    sudo apt install ffmpeg

- Sur Windows :
Télécharge et installe depuis le site officiel, puis ajoute ffmpeg au PATH.

## Installation du projet

#### 1. Clone ce dépôt
#### 2. Install les dépendances:
- Dans ton terminal à la racine du projet:
    ```bash
    npm install

#### 1. Occupe toi du fichier .env
- Change ex_env.txt par .env
- Renseigne les variables Brevo et pense bien à changer la variable SECRET KEY

#### 4. Lancer le projet en développement :

- Dans ton terminal à la racine du projet:
    ```bash
    npm run dev

- Accede au projet sur http://localhost:3000/ et crée toi un compte.

## RESSOURCES:

- https://ffmpeg.org/
- https://developer.mozilla.org/fr/docs/Web/JavaScript/
- https://www.npmjs.com/search?q=fluent-ffmpeg
- https://www.w3schools.com/js/js_classes.asp
- https://ejs.co/
- https://expressjs.com/en/guide/routing.html
- https://nodejs.org/docs/latest/api/
- https://sequelize.org/docs/v6/
- https://getbootstrap.com/
- https://developers.brevo.com/recipes
  