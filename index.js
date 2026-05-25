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
            return res.status(400).json({ ok: false, error: 'Nom et service requis.' });
        }

        const chatId = OWNER_CHAT_ID;
        if (!chatId) {
            console.warn('⚠️ OWNER_CHAT_ID non configuré, commande non envoyée via Telegram.');
            return res.json({ ok: true, warning: 'OWNER_CHAT_ID non configuré.' });
        }

        const message =
            `📩 *Nouvelle Commande !*\n\n` +
            `👤 *Client :* ${name}\n` +
            `📧 *Email :* ${email || 'Non renseigné'}\n` +
            `💼 *Service :* ${service}\n` +
            `💰 *Budget :* ${budget || 'Non précisé'}\n` +
            `${urgent ? '🔴 *URGENT*\n' : ''}` +
            `\n📝 *Description :*\n${description || 'Aucune description'}`;

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
            return res.status(500).json({ ok: false, error: 'Erreur Telegram API.' });
        }

        res.json({ ok: true });
    } catch (err) {
        console.error('Erreur /api/send-order:', err);
        res.status(500).json({ ok: false, error: 'Erreur serveur.' });
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

// Menu principal avec boutons sous le message
const getMainMenu = () => {
    const buttons = [
        [Markup.button.callback('💼 Voir nos Services', 'services')],
        [Markup.button.callback('📩 Nous Contacter', 'contact')]
    ];

    // Ajouter le bouton WebApp si l'URL est configurée
    if (WEBAPP_URL) {
        buttons.unshift([Markup.button.webApp('🚀 Ouvrir la Mini App', WEBAPP_URL)]);
    }

    return Markup.inlineKeyboard(buttons);
};

// Commande /start (Accueil du bot)
bot.start((ctx) => {
    const name = ctx.from.first_name;
    ctx.reply(
        `Bonjour ${name} ! 👋\n\nJe suis le bot officiel d'*Evodevs Team*.\n\nNous concevons des solutions digitales sur mesure : sites web, apps mobiles, bots Telegram, design UI/UX et plus encore.\n\nComment puis-je vous aider ?`,
        { parse_mode: 'Markdown', ...getMainMenu() }
    );
});

// Action du bouton "Services"
bot.action('services', (ctx) => {
    ctx.editMessageText(
        `💼 *Nos Prestations & Services :*\n\n` +
        `• *Développement Web* : Sites vitrines, e-commerce, applications sur mesure.\n` +
        `• *Applications Mobiles* : Apps natives et cross-platform.\n` +
        `• *Bots Telegram* : Bots personnalisés, Mini Apps intégrées.\n` +
        `• *Design & Identité* : Logos, chartes graphiques, maquettes UI/UX.\n` +
        `• *Consulting* : Optimisation de vos outils et stratégie digitale.\n\n` +
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



// Action du bouton "Contact"
bot.action('contact', (ctx) => {
    ctx.editMessageText(
        `📩 *Nous Contacter :*\n\n` +
        `Pour discuter de votre projet, vous pouvez :\n\n` +
        `💬 Telegram : @ItzCyd\n` +
        `📧 Email : calebyangcyd@gmail.com\n` +
        `🌐 Portfolio : https://itzcyd.vercel.app\n\n` +
        `⏱ _Réponse généralement sous 24h._`,
        {
            parse_mode: 'Markdown',
            ...Markup.inlineKeyboard([
                [Markup.button.url('🌐 Voir le Portfolio', 'https://itzcyd.vercel.app')],
                [Markup.button.callback('⬅️ Retour au Menu', 'main_menu')]
            ])
        }
    );
});

// Action pour revenir au menu principal
bot.action('main_menu', (ctx) => {
    ctx.editMessageText(
        `Menu Principal :\n\nQue souhaitez-vous découvrir sur nos services ?`,
        getMainMenu()
    );
});

// Lancement du bot
bot.launch().then(() => console.log('🤖 Bot Telegram démarré avec succès !'));

// Gestion de l'arrêt propre
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));