<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Telegraf-4.16-2CA5E0?logo=telegram&logoColor=white" alt="Telegraf">
  <img src="https://img.shields.io/badge/Express-5-000000?logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Telegram_Mini_App-Ready-2AABEE?logo=telegram&logoColor=white" alt="Telegram WebApp">
  <img src="https://img.shields.io/github/license/YangtozoR59/EvoBot" alt="License">
</p>

<h1 align="center">🤖 EvoBot — Bot Telegram & Mini App Officielle (Evodevs Team)</h1>

<p align="center">
  Bot Telegram intelligent couplé à une <strong>Mini App (Telegram WebApp SPA)</strong> pour le collectif <strong>Evodevs Team</strong>.
</p>

---

## 🌟 Vue d'ensemble

**EvoBot** permet aux clients et prospects d'interagir directement avec l'écosystème d'**Evodevs Team** :
- Explorer le **catalogue de prestations & tarifs transparents**
- Lancer la **Mini App Telegram interactive** avec retour haptique
- Soumettre des **demandes de devis et commandes de projets** reçues instantanément par l'administrateur
- Consulter les **engagements de service et garanties**
- Basculer facilement entre le **Français** et l'**Anglais**

---

## 🏗️ Architecture & Flux de Données

```
┌────────────────────────────────────────────────────────┐
│                        index.js                        │
│                                                        │
│   ┌──────────────────────────┐    ┌─────────────────┐  │
│   │     Telegraf Bot         │    │  Serveur Express│  │
│   │ (Commandes /start, etc.) │    │ (SPA + API POST)│  │
│   └────────────┬─────────────┘    └────────┬────────┘  │
└────────────────┼───────────────────────────┼───────────┘
                 │                           │
           Telegram API               Telegram WebApp
         (Messages, alertes)       (Interface public/app.js)
```

1. **Bot conversationnel** : Commandes `/start`, `/services`, `/contact`, `/help`, `/lang` avec menus interactifs *Inline Keyboards*.
2. **Mini App SPA** : Interface glassmorphique ultra-légère chargée dans la WebView Telegram via le `Telegram WebApp SDK`.
3. **Transmission des commandes** : L'API `/api/send-order` formate la notification en HTML sécurisé et l'envoie au `OWNER_CHAT_ID`.

---

## ⚙️ Variables d'Environnement

Créez un fichier `.env` à la racine (ou configurez vos variables sur Render / Railway) :

```env
# Token du bot fourni par @BotFather
BOT_TOKEN=your_telegram_bot_token_here

# Chat ID Telegram recevant les notifications de commandes (@userinfobot)
OWNER_CHAT_ID=your_chat_id_here

# URL publique où est déployée la Mini App (ex: https://evobot.onrender.com)
WEBAPP_URL=https://evobot.onrender.com

# Port du serveur Express (défaut : 3000)
PORT=3000
```

---

## 🚀 Installation & Démarrage Local

```bash
# 1. Cloner le projet
git clone https://github.com/YangtozoR59/EvoBot.git
cd EvoBot

# 2. Installer les dépendances
npm install

# 3. Configurer le .env
cp .env.example .env

# 4. Lancer le serveur et le bot
npm start
```

---

## 🌐 Déploiement sur Render (Gratuit)

1. Créez un **Web Service** sur [render.com](https://render.com).
2. Connectez le dépôt `YangtozoR59/EvoBot`.
3. Configurez :
   - **Runtime** : `Node`
   - **Build Command** : `npm install`
   - **Start Command** : `npm start`
4. Dans l'onglet **Environment**, ajoutez `BOT_TOKEN`, `OWNER_CHAT_ID` et `WEBAPP_URL`.

---

## 👨‍💻 Auteur & Support

Développé par **Evodevs Team** ([@YangtozoR59](https://github.com/YangtozoR59))  
- WhatsApp : `+237 698 44 80 24`  
- Telegram : `@ItzCyd`  
- E-mail : `evodevsteam.contact@gmail.com`  

Licence : [ISC](LICENSE)
