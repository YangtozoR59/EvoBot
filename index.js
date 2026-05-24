const { Telegraf, Markup } = require('telegraf');
const express = require('express');

// ==========================================
// 1. CONFIGURATION DU SERVEUR DE MONITORING
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Bot Telegram de Présentation en ligne ! 🚀');
});

app.listen(PORT, () => {
    console.log(`Serveur de ping activé sur le port ${PORT}`);
});

// ==========================================
// 2. CONFIGURATION DU BOT TELEGRAM
// ==========================================
// Remplacer par votre token en local, ou configurer la variable d'environnement BOT_TOKEN sur Render
const bot = new Telegraf(process.env.BOT_TOKEN || '8203109380:AAGTv_gO0r2DHGr_S8U0AY1nNnWkPu_3o90');

// Menu principal avec boutons sous le message
const mainMenu = Markup.inlineKeyboard([
    [Markup.button.callback('💼 Voir mes Services', 'services')],
    [Markup.button.callback('🎯 Mon Portfolio / Réalisations', 'portfolio')],
    [Markup.button.callback('📩 Me Contacter', 'contact')]
]);

// Commande /start (Accueil du bot)
bot.start((ctx) => {
    const name = ctx.from.first_name;
    ctx.reply(
        `Bonjour ${name} ! 👋\n\nJe suis le bot de présentation de **[Votre Nom / Entreprise]**.\n\nComment puis-je vous aider aujourd'hui ? Choisissez une option ci-dessous :`,
        mainMenu
    );
});

// Action du bouton "Services"
bot.action('services', (ctx) => {
    ctx.editMessageText(
        `💼 **Mes Prestations & Services :**\n\n` +
        `• **Développement Web** : Sites vitrines, e-commerce, applications sur mesure.\n` +
        `• **Design & Identité** : Création de logos, chartes graphiques, maquettes.\n` +
        `• **Consulting** : Optimisation de vos outils et stratégie digitale.\n\n` +
        `*Tarifs sur devis selon vos besoins.*`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.callback('📩 Commander / Demander un devis', 'contact')],
                [Markup.button.callback('⬅️ Retour au Menu', 'main_menu')]
            ])
        }
    );
});

// Action du bouton "Portfolio"
bot.action('portfolio', (ctx) => {
    ctx.editMessageText(
        `🎯 **Mon Portfolio :**\n\n` +
        `Voici quelques exemples de mes derniers projets :\n\n` +
        `🌐 [Site E-commerce - Client A](https://example.com)\n` +
        `📱 [Application Mobile - Client B](https://example.com)\n` +
        `🎨 [Identité Visuelle - Projet C](https://example.com)\n\n` +
        `N'hésitez pas à me poser des questions sur mes réalisations !`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([[Markup.button.callback('⬅️ Retour au Menu', 'main_menu')]])
        }
    );
});

// Action du bouton "Contact"
bot.action('contact', (ctx) => {
    ctx.editMessageText(
        `📩 **Me Contacter :**\n\n` +
        `Pour discuter de votre projet, vous pouvez :\n\n` +
        `💬 M'écrire directement sur Telegram : @VotrePseudoTelegram\n` +
        `📧 Par Email : contact@votre-domaine.com\n\n` +
        `⏱ _Réponse généralement sous 24h._`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([[Markup.button.callback('⬅️ Retour au Menu', 'main_menu')]])
        }
    );
});

// Action pour revenir au menu principal
bot.action('main_menu', (ctx) => {
    ctx.editMessageText(
        `Menu Principal :\n\nQue souhaitez-vous découvrir sur mes services ?`,
        mainMenu
    );
});

// Lancement du bot
bot.launch().then(() => console.log('Bot Telegram démarré avec succès !'));

// Gestion de l'arrêt propre
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));