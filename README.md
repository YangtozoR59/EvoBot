# 🚀 EvoBot — Bot Telegram + Mini App (Evodevs Team)

Bot Telegram associé à une **Mini App** (SPA glassmorphique) pour **Evodevs Team**, construit avec **Telegraf** (bot) et **Express** (serveur + API), intégrée via le **Telegram WebApp SDK**. Application bilingue (Anglais par défaut / Français).

Ce projet sert aussi de **base d'apprentissage** pour comprendre comment concevoir un bot Telegram couplé à une Mini App : structure du code, flux de données, et points d'extension sont détaillés plus bas.

---

## 📋 Sommaire

- [Fonctionnalités](#-fonctionnalités)
- [Comprendre l'architecture](#-comprendre-larchitecture)
- [Stack technique](#-stack-technique)
- [Structure du projet](#-structure-du-projet)
- [Variables d'environnement](#️-variables-denvironnement)
- [Développement local](#-développement-local)
- [Déploiement sur Render](#-déploiement-sur-render-gratuit)
- [Garder le service actif](#-garder-le-service-actif-avec-uptimerobot)
- [API](#-api)
- [Contribuer](#-contribuer)
- [Contact](#-contact)
- [Licence](#-licence)

---

## 📋 Fonctionnalités

- **Bot Telegram** : commande `/start`, menu interactif bilingue (EN/FR), gestion des préférences utilisateur.
- **Mini App SPA** : 4 pages (Accueil, Services, Politique, À propos), routage front-end, bascule de langue à la volée.
- **Internationalisation (i18n)** : Anglais par défaut, Français en option.
- **Catalogue de services** : 6 prestations avec détails, tarifs et délais.
- **Formulaire de commande** : envoi de notifications au propriétaire via l'API Telegram Bot.
- **Design premium** : glassmorphisme, animations, typewriter adaptatif, compteurs animés.

---

## 🧠 Comprendre l'architecture

Cette section explique **comment le bot et la Mini App communiquent**, pour ceux qui veulent s'en inspirer pour leurs propres projets.

### 1. Deux "faces" d'une même application

Un bot Telegram + Mini App repose sur **un seul serveur Node.js** qui joue deux rôles :

```
┌─────────────────────────────┐
│         index.js            │
│                              │
│  ┌────────────┐  ┌────────┐ │
│  │  Telegraf  │  │ Express│ │
│  │  (le bot)  │  │(le web)│ │
│  └─────┬──────┘  └───┬────┘ │
│        │             │      │
└────────┼─────────────┼──────┘
         │             │
   Telegram API    Navigateur
   (commandes,     (Mini App,
    messages)       via WebApp SDK)
```

- **Telegraf** gère la conversation dans Telegram (commandes, boutons, menus).
- **Express** sert les fichiers statiques (`public/`) et expose une API (`/api/send-order`) que la Mini App appelle en JavaScript.

### 2. Le pont entre le bot et la page web

Quand l'utilisateur clique sur "Ouvrir la Mini App" dans le bot, Telegram ouvre une **WebView** pointant vers `WEBAPP_URL`. Cette page charge le [Telegram WebApp SDK](https://core.telegram.org/bots/webapps), qui permet à la page web de :
- récupérer les infos de l'utilisateur Telegram (`Telegram.WebApp.initDataUnsafe`)
- adapter le thème (clair/sombre) à celui de Telegram
- fermer la Mini App ou envoyer des données au bot

### 3. Cycle de vie d'une commande

1. L'utilisateur remplit le formulaire dans la Mini App (`app.js`).
2. Le formulaire envoie une requête `POST /api/send-order` au serveur Express.
3. Le serveur utilise **Telegraf** pour envoyer un message formaté au `OWNER_CHAT_ID` (le propriétaire du bot).
4. Le propriétaire reçoit la commande directement dans son chat Telegram — pas besoin de dashboard externe.

### 4. Pourquoi cette approche est réutilisable

Ce pattern (bot + Mini App + API interne) fonctionne pour n'importe quel cas d'usage : prise de rendez-vous, boutique en ligne, support client, etc. Il suffit d'adapter :
- les pages de la Mini App (`public/`)
- le contenu du menu bot (`index.js`)
- le schéma de la commande envoyée à `/api/send-order`

---

## 🛠 Stack Technique

| Technologie | Usage |
|---|---|
| Node.js | Runtime serveur |
| Express 5 | Serveur HTTP + API |
| Telegraf 4 | Bot Telegram |
| HTML/CSS/JS | Frontend SPA (vanilla, sans framework) |
| Telegram WebApp SDK | Intégration Mini App |

---

## 📁 Structure du projet

```
EvoBot/
├── index.js                 # Serveur Express + Bot Telegram
├── package.json
├── public/
│   ├── index.html           # Page HTML principale
│   ├── styles.css           # Design system glassmorphique
│   ├── app.js                # SPA JavaScript (router, pages, modals)
│   └── logo.svg              # Logo Evodevs Team
├── evodevs_team_logo_dark.svg
├── evodevs_team_logo_light.svg
└── README.md
```

---

## ⚙️ Variables d'environnement

| Variable | Description | Obligatoire |
|---|---|---|
| `BOT_TOKEN` | Token du bot Telegram (obtenu via [@BotFather](https://t.me/BotFather)) | ✅ Oui |
| `OWNER_CHAT_ID` | Chat ID pour recevoir les commandes | ✅ Oui |
| `WEBAPP_URL` | URL publique de l'app (Render ou autre) | ✅ Oui |
| `PORT` | Port du serveur (défaut : `3000`) | ❌ Non |

> **💡 Obtenir votre `OWNER_CHAT_ID`** : envoyez un message à [@userinfobot](https://t.me/userinfobot) sur Telegram, il vous renverra votre Chat ID.

> ⚠️ **Sécurité** : ne mettez jamais de vraies valeurs (surtout `BOT_TOKEN`) dans le README ou dans un fichier versionné. Utilisez un fichier `.env` (ajouté à `.gitignore`) en local, et les variables d'environnement du service d'hébergement en production. Si un token a été exposé par erreur, révoquez-le immédiatement via `/revoke` auprès de @BotFather.

Exemple de fichier `.env` local :
```
BOT_TOKEN=votre_token_ici
OWNER_CHAT_ID=votre_chat_id
WEBAPP_URL=http://localhost:3000
PORT=3000
```

---

## 🧪 Développement local

```bash
# Cloner le repo
git clone https://github.com/YangtozoR59/EvoBot.git
cd EvoBot

# Installer les dépendances
npm install

# Créer votre fichier .env (voir section ci-dessus)

# Lancer le serveur
node index.js
```

Le serveur démarre sur `http://localhost:3000`. La Mini App est accessible directement dans le navigateur (les fonctionnalités liées au SDK Telegram nécessitent un test via Telegram lui-même).

---

## 🚀 Déploiement sur Render (Gratuit)

### 1. Créer le Web Service

1. Connectez-vous sur [render.com](https://render.com)
2. Cliquez sur **New** → **Web Service**
3. Connectez votre repo GitHub `YangtozoR59/EvoBot`
4. Configurez :

| Paramètre | Valeur |
|---|---|
| **Name** | `evobot` (ou au choix) |
| **Region** | `Frankfurt (EU)` ou la plus proche |
| **Branch** | `main` |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `node index.js` |
| **Instance Type** | `Free` |

### 2. Configurer les variables d'environnement

Dans l'onglet **Environment** du service Render, ajoutez `BOT_TOKEN`, `OWNER_CHAT_ID` et `WEBAPP_URL` avec vos propres valeurs (jamais celles d'un README public).

### 3. Déployer

Cliquez **Deploy** — Render installe les dépendances et lance le serveur. Votre Mini App sera accessible à l'URL affichée.

### 4. Configurer le bouton WebApp du bot

Une fois l'URL Render connue, mettez à jour `WEBAPP_URL` puis redéployez. Le bot affichera automatiquement le bouton **"🚀 Ouvrir la Mini App"** dans la commande `/start`.

---

## ⏰ Garder le service actif avec UptimeRobot

> Le plan gratuit de Render met le service en veille après **15 minutes d'inactivité**. UptimeRobot envoie un ping régulier pour le maintenir éveillé.

1. Créez un compte gratuit sur [uptimerobot.com](https://uptimerobot.com)
2. Cliquez sur **Add New Monitor**
3. Configurez :

| Paramètre | Valeur |
|---|---|
| **Monitor Type** | `HTTP(s)` |
| **Friendly Name** | `EvoBot` |
| **URL** | l'URL de votre service Render |
| **Monitoring Interval** | `5 minutes` |

> ⚠️ **Note** : Render impose une limite de **750 heures/mois** sur le plan gratuit. Un seul service actif 24/7 consomme ~720 heures, ce qui reste dans la limite.

---

## 📩 API

### `POST /api/send-order`

Envoie une notification de commande au propriétaire via Telegram.

**Body (JSON) :**
```json
{
  "name": "Prénom Nom",
  "email": "client@email.com",
  "service": "Site Web Vitrine",
  "budget": "100 000 - 300 000 FCFA",
  "description": "Description du projet...",
  "urgent": false
}
```

**Réponse :** `{ "ok": true }`

---

## 🤝 Contribuer

Les contributions sont bienvenues, notamment pour :
- Ajouter de nouvelles langues (i18n)
- Améliorer l'accessibilité de la Mini App
- Documenter davantage le flux bot ↔ Mini App
- Proposer de nouveaux patterns d'intégration Telegram WebApp SDK

Pour contribuer : forkez le repo, créez une branche (`feature/ma-fonctionnalite`), puis ouvrez une pull request avec une description claire du changement.

---

## 📬 Contact

- **Telegram** : [@ItzCyd](https://t.me/ItzCyd)
- **Email** : calebyangcyd@gmail.com
- **Portfolio** : [itzcyd.vercel.app](https://itzcyd.vercel.app)

---

## 📄 Licence

ISC — Evodevs Team © 2026
