# ReduceLink 🔗

Un service de raccourcissement de liens gratuit, simple et transparent.

- Site officiel : https://reducelink.arthurp.fr
- Dépôt GitHub : https://github.com/arthur-pbty/reducelink

![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![SQLite](https://img.shields.io/badge/SQLite-Prisma-green)

## ✨ Fonctionnalités

- **Raccourcissement de liens** : Transformez vos URLs longues en liens courts
- **Alias personnalisé** : Choisissez votre propre alias ou laissez-en générer un automatiquement
- **QR Code** : Chaque lien génère un QR Code téléchargeable
- **Statistiques** : Suivez le nombre de clics en temps réel
- **100% gratuit** : Aucune inscription, aucune limitation
- **Transparence** : Tous les liens sont publics

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18+
- npm ou yarn

### Installation

```bash
# Cloner le projet
git clone https://github.com/arthur-pbty/reducelink.git
cd reducelink

# Installer les dépendances
npm install

# Configurer l'environnement
cp .env.example .env

# Initialiser la base de données
npx prisma migrate dev

# Lancer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
reducelink/
├── prisma/
│   ├── schema.prisma      # Schéma de la base de données
│   └── migrations/        # Migrations SQL
├── src/
│   ├── app/               # Pages Next.js (App Router)
│   │   ├── page.tsx       # Page d'accueil
│   │   ├── liens/         # Liste des liens
│   │   ├── stats/         # Statistiques
│   │   ├── a-propos/      # À propos
│   │   ├── conditions/    # CGU
│   │   └── [shortCode]/   # Redirection dynamique
│   ├── components/        # Composants React
│   └── lib/               # Utilitaires et actions
├── public/                # Assets statiques
└── package.json
```

## 🛠️ Technologies

- **Framework** : Next.js 16 avec App Router
- **Langage** : TypeScript
- **Base de données** : SQLite avec Prisma
- **Styles** : Tailwind CSS
- **QR Code** : qrcode.react

## 📖 Pages

| Route | Description |
|-------|-------------|
| / | Page d'accueil avec formulaire |
| /liens | Liste de tous les liens |
| /stats | Statistiques globales |
| /a-propos | Informations sur le service |
| /conditions | Conditions d'utilisation |
| /{shortCode} | Redirection vers l'URL originale |

## 🔧 Configuration

Variables d'environnement (.env) :

```env
# Base de données SQLite
DATABASE_URL="file:./dev.db"

# URL de base du site
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

## 📦 Scripts

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run start    # Serveur de production
npm run lint     # Linting ESLint
```

## 🗃️ Base de données

Commandes Prisma utiles :

```bash
npx prisma migrate dev      # Créer une migration
npx prisma migrate reset    # Réinitialiser la DB
npx prisma studio           # Interface visuelle
npx prisma generate         # Générer le client
```

---

Fait avec ❤️ pour simplifier vos URLs.
