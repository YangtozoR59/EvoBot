# 🚀 EvoBot — Evodevs Team Mini App

Bot Telegram + Mini App pour **Evodevs Team** : une SPA glassmorphique argentée intégrée au bot via le Telegram WebApp SDK.

## 📋 Fonctionnalités

- **Bot Telegram** : commandes `/start`, menu interactif (Services, Portfolio, Contact)
- **Mini App SPA** : 4 pages (Accueil, Services, Politique, À propos)
- **Catalogue de services** : 6 prestations avec détails, tarifs et délais
- **Formulaire de commande** : envoi de notifications au propriétaire via Telegram Bot API
- **Design premium** : glassmorphisme, animations, typewriter, compteurs animés

## 🛠 Stack Technique

| Technologie | Usage |
|---|---|
| Node.js | Runtime serveur |
| Express 5 | Serveur HTTP + API |
| Telegraf 4 | Bot Telegram |
| HTML/CSS/JS | Frontend SPA (vanilla) |
| Telegram WebApp SDK | Intégration Mini App |

## 📁 Structure du projet

```
EvoBot/
├── index.js                 # Serveur Express + Bot Telegram
├── package.json
├── public/
│   ├── index.html           # Page HTML principale
│   ├── styles.css            # Design system glassmorphique
│   ├── app.js                # SPA JavaScript (router, pages, modals)
│   └── logo.svg              # Logo Evodevs Team
├── evodevs_team_logo_dark.svg
├── evodevs_team_logo_light.svg
└── README.md
```

## ⚙️ Variables d'environnement

| Variable | Description | Obligatoire |
|---|---|---|
| `BOT_TOKEN` | Token du bot Telegram | ✅ Oui |
| `OWNER_CHAT_ID` | Chat ID pour recevoir les commandes | ✅ Oui |
| `WEBAPP_URL` | URL publique de l'app (Render) | ✅ Oui |
| `PORT` | Port du serveur (défaut : `3000`) | ❌ Non |

> **💡 Obtenir votre `OWNER_CHAT_ID`** : envoyez un message à [@userinfobot](https://t.me/userinfobot) sur Telegram, il vous renverra votre Chat ID.

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

Dans l'onglet **Environment** du service Render, ajoutez :

```
BOT_TOKEN=8203109380:AAGTv_gO0r2DHGr_S8U0AY1nNnWkPu_3o90
OWNER_CHAT_ID=<votre_chat_id>
WEBAPP_URL=https://evobot-xxxx.onrender.com
```

> ⚠️ Remplacez `evobot-xxxx` par le sous-domaine réel attribué par Render après le premier déploiement.

### 3. Déployer

Cliquez **Deploy** — Render installe les dépendances et lance le serveur. Votre Mini App sera accessible à l'URL affichée.

### 4. Configurer le bouton WebApp du bot

Une fois l'URL Render connue, mettez à jour la variable `WEBAPP_URL` avec l'URL complète. Redéployez le service. Le bot affichera automatiquement le bouton **"🚀 Ouvrir la Mini App"** dans la commande `/start`.

## ⏰ Garder le service actif avec UptimeRobot

> Le plan gratuit de Render met le service en veille après **15 minutes d'inactivité**. UptimeRobot envoie un ping régulier pour le maintenir éveillé.

### Configuration

1. Créez un compte gratuit sur [uptimerobot.com](https://uptimerobot.com)
2. Cliquez sur **Add New Monitor**
3. Configurez :

| Paramètre | Valeur |
|---|---|
| **Monitor Type** | `HTTP(s)` |
| **Friendly Name** | `EvoBot` |
| **URL** | `https://evobot-xxxx.onrender.com` |
| **Monitoring Interval** | `5 minutes` |

4. Cliquez **Create Monitor**

> ✅ UptimeRobot pingera votre service toutes les 5 minutes, empêchant Render de le mettre en veille. Le service restera disponible 24/7.

> ⚠️ **Note** : Render impose une limite de **750 heures/mois** sur le plan gratuit. Un seul service actif 24/7 consomme ~720 heures, ce qui reste dans la limite.

## 🧪 Développement local

```bash
# Cloner le repo
git clone https://github.com/YangtozoR59/EvoBot.git
cd EvoBot

# Installer les dépendances
npm install

# Lancer le serveur
node index.js
```

Le serveur démarre sur `http://localhost:3000`. La Mini App est accessible directement dans le navigateur.

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

## 📄 Licence

ISC — Evodevs Team © 2026
