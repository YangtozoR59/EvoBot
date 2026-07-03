const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');

// ==========================================
// 1. CONFIGURATION DU SERVEUR EXPRESS
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN || '8203109380:AAGTv_gO0r2DHGr_S8U0AY1nNnWkPu_3o90';
const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID || '';
const WEBAPP_URL = process.env.WEBAPP_URL || 'https://evobot-9ho6.onrender.com';

// Parse JSON bodies
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// ==========================================
// 2. API — PROXY POUR ENVOYER LES COMMANDES
// ==========================================
app.post('/api/send-order', async (req, res) => {
    try {
        const { name, email, service, budget, description, urgent } = req.body;

        if (!name || !service) {
            return res.status(400).json({ ok: false, error: 'Name and service required.' });
        }

        const chatId = OWNER_CHAT_ID;
        if (!chatId) {
            console.warn('⚠️ OWNER_CHAT_ID non configuré, commande non envoyée via Telegram.');
            return res.json({ ok: true, warning: 'OWNER_CHAT_ID non configuré.' });
        }

        const message =
            `📩 *New Order !*\n\n` +
            `🕵️ *Alias :* ${name}\n` +
            `🔐 *Secure Contact :* ${email || 'Not provided'}\n` +
            `💼 *Service :* ${service}\n` +
            `💰 *Budget :* ${budget || 'Not specified'}\n` +
            `${urgent ? '🔴 *URGENT*\n' : ''}` +
            `\n📝 *Description :*\n${description || 'No description'}`;

        const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(telegramUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });

        const data = await response.json();
        if (!data.ok) {
            console.error('Telegram API error:', data);
            return res.status(500).json({ ok: false, error: 'Telegram API error.' });
        }

        res.json({ ok: true });
    } catch (err) {
        console.error('Erreur /api/send-order:', err);
        res.status(500).json({ ok: false, error: 'Server error.' });
    }
});

// Fallback — sert index.html pour toutes les routes non-API
app.get('{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});

// ==========================================
// 3. CONFIGURATION DU BOT TELEGRAM
// ==========================================
const bot = new Telegraf(BOT_TOKEN);
const userLang = new Map(); // Store language preferences by chatId

const i18nBot = {
    en: {
        welcome: name => `Welcome ${name} 🕵️\n\n*Anonymous EvoDevs Shop*\n\nCustom digital solutions — with complete trust and discretion.\n\nOpen the Shop to discover our services and place an order.`,
        servicesBtn: '💼 View our Services',
        openShopBtn: '🚀 Open Shop',
        backMenuBtn: '⬅️ Back to Menu',
        servicesText: `💼 *Our Services :*\n\n` +
            `• *Showcase Website* — 600€\n` +
            `• *E-commerce Website* — 1400€\n` +
            `• *Mobile Application* — 3000€\n` +
            `• *Telegram Bot* — 300€\n` +
            `• *Design & Identity* — 100€\n` +
            `• *Custom Solution* — On quote\n\n` +
            `🔒 _Open the Shop to order discreetly._`,
        menuText: `Main Menu :\n\nWhat would you like to discover about our services?`,
        langSwitched: 'Language switched to English 🇬🇧'
    },
    fr: {
        welcome: name => `Bienvenue ${name} 🕵️\n\n*Anonymous EvoDevs Shop*\n\nSolutions digitales sur mesure — en toute confiance et discrétion.\n\nOuvrez le Shop pour découvrir nos services et passer commande.`,
        servicesBtn: '💼 Voir nos Services',
        openShopBtn: '🚀 Ouvrir le Shop',
        backMenuBtn: '⬅️ Retour au Menu',
        servicesText: `💼 *Nos Services :*\n\n` +
            `• *Site Web Vitrine* — 600€\n` +
            `• *Site E-commerce* — 1400€\n` +
            `• *Application Mobile* — 3000€\n` +
            `• *Bot Telegram* — 300€\n` +
            `• *Design & Identité* — 100€\n` +
            `• *Solution Sur Mesure* — Sur devis\n\n` +
            `🔒 _Ouvrez le Shop pour commander en toute discrétion._`,
        menuText: `Menu Principal :\n\nQue souhaitez-vous découvrir sur nos services ?`,
        langSwitched: 'Langue changée en Français 🇫🇷'
    }
};

const getLang = ctx => userLang.get(ctx.chat?.id) || 'en';
const t = (ctx, key, ...args) => {
    const val = i18nBot[getLang(ctx)][key];
    return typeof val === 'function' ? val(...args) : val;
};

// Menu principal avec boutons sous le message
const getMainMenu = (ctx) => {
    const buttons = [
        [Markup.button.callback(t(ctx, 'servicesBtn'), 'services')]
    ];
    if (WEBAPP_URL) {
        buttons.unshift([Markup.button.webApp(t(ctx, 'openShopBtn'), WEBAPP_URL)]);
    }
    buttons.push([
        Markup.button.callback('🇬🇧 EN', 'lang_en'),
        Markup.button.callback('🇫🇷 FR', 'lang_fr')
    ]);
    return Markup.inlineKeyboard(buttons);
};

// Commande /start (Accueil du bot)
bot.start((ctx) => {
    const name = ctx.from.first_name;
    ctx.reply(t(ctx, 'welcome', name), { parse_mode: 'Markdown', ...getMainMenu(ctx) });
});

bot.action('lang_en', (ctx) => {
    userLang.set(ctx.chat.id, 'en');
    ctx.answerCbQuery(t(ctx, 'langSwitched'));
    ctx.editMessageText(t(ctx, 'menuText'), getMainMenu(ctx));
});

bot.action('lang_fr', (ctx) => {
    userLang.set(ctx.chat.id, 'fr');
    ctx.answerCbQuery(t(ctx, 'langSwitched'));
    ctx.editMessageText(t(ctx, 'menuText'), getMainMenu(ctx));
});

// Action du bouton "Services"
bot.action('services', (ctx) => {
    ctx.editMessageText(
        t(ctx, 'servicesText'),
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                ...(WEBAPP_URL ? [[Markup.button.webApp(t(ctx, 'openShopBtn'), WEBAPP_URL)]] : []),
                [Markup.button.callback(t(ctx, 'backMenuBtn'), 'main_menu')]
            ])
        }
    );
});

// Action pour revenir au menu principal
bot.action('main_menu', (ctx) => {
    ctx.editMessageText(t(ctx, 'menuText'), getMainMenu(ctx));
});

// Lancement du bot
bot.launch().then(() => console.log('🤖 Bot Telegram démarré avec succès !'));

// Gestion de l'arrêt propre
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));