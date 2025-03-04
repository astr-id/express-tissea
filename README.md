# 🚌 API Tisséa

Réalisée par ✨Astrid Pierron✨  
Ce projet est une API REST permettant d'accéder aux informations du réseau de transports en commun.

## 💻 Technologies Utilisées

- **Backend** : Express.js
- **Base de données** : MongoDB
- **ORM** : Prisma 
- **Frontend** : React
- **Carte** : Leaflet
- **Tests** : Vitest

## 🔧 Prérequis

Avant de commencer, assurez-vous d'avoir installé les éléments suivants :
- [Node.js](https://nodejs.org/)
- [MongoDB Compass](https://www.mongodb.com/products/compass)

## ⚙️ Installation

### 1. Cloner le repository
```sh
git clone https://github.com/astr-id/express-tissea.git
cd express-tissea
```

### 2. Installer les dépendances
```sh
npm install
```

### 3. Configurer la base de données

1. **Créer un compte MongoDB Atlas**  
   Si vous n'avez pas encore de compte, inscrivez-vous sur [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).

2. **Créer une organisation et un projet**  
   Une fois connecté, créez une **organisation** et un **projet**.

3. **Créer un cluster et une base de données**  
   Créez un **cluster** (par exemple `Cluster0`) et une **base de données**. Vous pourrez ensuite obtenir l'**URL de connexion** pour votre base de données MongoDB.
   
   ```plaintext
   mongodb+srv://<username>:<db_password>@cluster0.mongodb.net/tisseadatabase
   ```

5. **Se connecter à MongoDB Compass**  
   Vous pouvez vous connecter à MongoDB Compass. Assurez-vous que la base de données `tisseadatabase` existe.

### 4. Créer le fichier `.env`
Créez un fichier `.env` à la racine du projet avec le contenu suivant :

```env
MONGO_URI="mongodb+srv://<username>:<db_password>@cluster0.mongodb.net/tisseadatabase"
NODE_ENV=development
PORT=5000
JWT_SECRET="votre_clé_secrète"  # Utilisée pour les tokens JWT
```

**Remarque :** Remplacez `<username>` et `<db_password>` par vos identifiants MongoDB.

### 5. Appliquer les migrations Prisma
Prisma est utilisé pour interagir avec la base de données.  
Avant de lancer l'API, vous devez appliquer les migrations pour créer les tables nécessaires :
```sh
npx prisma db push
```

Ensuite, générez le client Prisma :
```sh
npx prisma generate
```

### 6. Peupler la base de données
Après avoir configuré la base de données, exécutez le seeder pour insérer des données :
```sh
npm run seed
```

### 7. Démarrer l'API
Une fois les migrations appliquées et les données initiales insérées, vous pouvez démarrer l'API avec la commande suivante :
```sh
npm run dev
```
L'API sera disponible à l'adresse `http://localhost:5000`.

## 🛣️ Endpoints Principaux

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

## 🧪 Tests

Si vous souhaitez générer un rapport HTML des tests, exécutee la commande suivante :
```sh
npx vitest run --reporter=html
```

Cela générera un rapport détaillé dans un fichier HTML, que vous pourrez ouvrir dans votre navigateur en utilisant la commande suivante :

```sh
npx vite preview --outDir html
```

Cela va créer un répertoire `html` contenant le résultat de la prévisualisation.

## 🗺️ Frontend (React & Leaflet)

Un frontend est inclus pour afficher les arrêts sur une carte.

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

Accédez à `http://localhost:3000/` pour voir la carte.
