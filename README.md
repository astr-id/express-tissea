# API Tisséa

Réalisée par Astrid Pierron  
Ce projet est une API REST permettant d'accéder aux informations du réseau de transports en commun.

## Technologies Utilisées

- **Backend** : Express.js
- **Base de données** : MongoDB
- **ORM** : Prisma 
- **Frontend** : React
- **Cartographie** : Leaflet
- **Tests** : Vitest

## Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléméents suivants :
- [Node.js](https://nodejs.org/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

## Installation

### 1. Cloner le repository
```sh
git clone https://github.com/votre-repo.git
cd express-tissea
```

### 2. Installer les dépendances
```sh
npm install
```

### 3. Configurer la base de données

1. **Créer le fichier `.env`**
Voici un exemple de contenu pour le fichier `.env` :
   
 ```env
 DATABASE_URL="mongodb://localhost:27017/tisseadatabase" # ou l'URL MongoDB Atlas si vous l'utilisez
 NODE_ENV=development
 PORT=5000
 JWT_SECRET="votre_clé_secrète"  # Utilisée pour les tokens JWT
 ```

3. **Vérifier la base de données dans MongoDB Compass**  
Une fois votre base de données configurée, ouvrez MongoDB Compass, connectez-vous à votre instance MongoDB, et vérifiez que la base de données `tisseadatabase` est bien présente.

### 4. Appliquer les migrations Prisma
Prisma est utilisé pour interagir avec la base de données.
Avant de lancer l'API, vous devez appliquer les migrations pour créer les tables nécessaires.
```sh
npx prisma db push
```

Puis, générez les clients Prisma :
```sh
npx prisma generate
```

### 5. Peupler la base de données
Après avoir configuré la base de données pour peupler la base de données exécutez le seeder pour insérer des données dans la base :
```sh
npm run seed
```

### 6. Démarrer l'API
Une fois les migrations appliquées et les données initiales insérées, vous pouvez démarrer l'API avec la commande suivante :
```sh
npm run dev
```
L'API sera disponible à l'adresse `http://localhost:5000`.

## Endpoints Principaux

Vous pouvez tester les routes suivantes dans Postman.

### Lignes de transport
- `GET /api/categories/:id/lines` : Récupérer toutes les lignes d'une catégorie
- `GET /api/categories/:id/lines/:id` : Détails d'une ligne
- `GET /api/categories/:id/lines/:id/stops` : Liste des arrêts d'une ligne

### Statistiques
- `GET /api/stats/distance/stops/:id/:id` : Distance entre deux arrêts
- `GET /api/stats/distance/lines/:id` : Distance totale d'une ligne

### Authentification (JWT)
- `POST /api/users/signup` : Inscription d'un utilisateur
- `POST /api/users/login` : Connexion d'un utilisateur

### Modification des données
- `POST /api/categories/:id/lines/:id/stops` : Ajouter un arrêt à une ligne
- `PUT /api/categories/:id/lines/:id` : Modifier une ligne
- `DELETE /api/categories/:id/lines/:id/stops/:id` : Supprimer un arrêt

## Tests

Lancer les tests unitaires avec Vitest :
```sh
npm run test
```

## Frontend (React & Leaflet)

Un mini-frontend est inclus pour afficher les arrêts sur une carte interactive.

1. Allez dans le répertoire `frontend` :
```sh
cd frontend
```

2. Installez les dépendances :
```sh
npm install
```

3. Démarrez le serveur de développement :
```sh
npm start
```

Accédez à `[http://localhost:5173](http://localhost:3000/)` pour voir la carte.
