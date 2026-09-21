# Parléo - Application d'apprentissage du français

Application web pour apprendre et pratiquer le français avec l'aide d'une intelligence artificielle.

## Fonctionnalités

- Conversation interactive avec correction automatique
- Reconnaissance et synthèse vocale
- Suivi de progression personnalisé
- Exercices de vocabulaire et grammaire
- Système d'authentification sécurisé

## Technologies utilisées

### Backend
- Node.js & Express
- MySQL
- JWT pour l'authentification
- Groq API pour l'IA conversationnelle

### Frontend
- React avec Vite
- React Router
- Web Speech API

## Installation

### Prérequis
- Node.js (v16 ou supérieur)
- MySQL

### Configuration

1. Cloner le projet
```bash
git clone [url-du-repo]
cd parleo
```

2. Installer les dépendances

Backend :
```bash
cd backend
npm install
```

Frontend :
```bash
cd frontend
npm install
```

3. Configurer les variables d'environnement

Créer un fichier `.env` dans le dossier `backend` :
```env
GROQ_API_KEY=votre_cle_groq
GROQ_MODEL=qwen/qwen3.8-27b

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=parleo
DB_PORT=3306

JWT_SECRET=votre_secret_jwt
```

Pour obtenir une clé Groq gratuite : https://console.groq.com/keys

4. Créer la base de données MySQL
```sql
CREATE DATABASE parleo;
```

## Démarrage

Backend :
```bash
cd backend
node server.js
```

Frontend :
```bash
cd frontend
npm run dev
```

L'application sera accessible sur http://localhost:5173

## Structure du projet

```
parleo/
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration DB
│   │   ├── controllers/   # Logique métier
│   │   ├── middlewares/   # Middlewares (auth, etc.)
│   │   ├── routes/        # Routes API
│   │   └── services/      # Services (IA, etc.)
│   └── server.js
│
└── frontend/
    ├── src/
    │   ├── components/    # Composants React
    │   ├── pages/         # Pages de l'application
    │   └── services/      # Services API
    └── public/
```

## Licence

MIT
