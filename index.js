const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');
const fs = require('fs');

// Chargement facultatif des variables .env si le fichier existe
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf-8');
  envConfig.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const [key, ...values] = trimmed.split('=');
      if (key && values.length > 0) {
        process.env[key.trim()] = values.join('=').trim();
      }
    }
  });
}

// ==========================================
// 1. CONFIGURATION DU SERVEUR EXPRESS
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN || '8203109380:AAGTv_gO0r2DHGr_S8U0AY1nNnWkPu_3o90';
const OWNER_CHAT_ID = process.env.OWNER_CHAT_ID || '';
const WEBAPP_URL = process.env.WEBAPP_URL || '';

// Parse JSON bodies
app.use(express.json());

// Serve static files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Helper pour échapper les caractères spéciaux HTML
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// ==========================================
// 2. API — PROXY DE COMMANDE SÉCURISÉ
// ==========================================
app.post('/api/send-order', async (req, res) => {
  try {
    const { name, email, service, budget, description, urgent } = req.body;

    if (!name || !service) {
      return res.status(400).json({ ok: false, error: 'Nom et service obligatoires.' });
    }

    const chatId = OWNER_CHAT_ID;
    if (!chatId) {
      console.warn('⚠️ [EvoBot] OWNER_CHAT_ID non configuré. Commande enregistrée en console.');
      console.log('Commande reçue :', { name, email, service, budget, description, urgent });
      return res.json({ ok: true, note: 'Commande enregistrée localement (OWNER_CHAT_ID absent).' });
    }

    const messageHtml =
      `🚀 <b>Nouvelle Demande de Projet — Evodevs Team</b>\n\n` +
      `👤 <b>Client / Nom :</b> ${escapeHtml(name)}\n` +
      `📞 <b>Contact / Téléphone :</b> ${escapeHtml(email || 'Non renseigné')}\n` +
      `💼 <b>Prestation :</b> ${escapeHtml(service)}\n` +
      `💰 <b>Budget Estimé :</b> ${escapeHtml(budget || 'Non précisé')}\n` +
      `⚡ <b>Urgent :</b> ${urgent ? '🔴 <b>OUI (Prioritaire)</b>' : '⚪ Standard'}\n\n` +
      `📝 <b>Détails du besoin :</b>\n${escapeHtml(description || 'Aucun détail supplémentaire.')}\n\n` +
      `🕒 <i>Reçu via la Mini App Evodevs</i>`;

    const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: messageHtml,
        parse_mode: 'HTML'
      })
    });

    const data = await response.json();
    if (!data.ok) {
      console.error('Erreur API Telegram:', data);
      return res.status(500).json({ ok: false, error: data.description || 'Erreur Telegram API.' });
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('Erreur /api/send-order:', err);
    res.status(500).json({ ok: false, error: 'Erreur interne du serveur.' });
  }
});

// Fallback — sert la SPA pour toutes les routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🌐 Serveur Evodevs actif sur http://localhost:${PORT}`);
});

// ==========================================
// 3. CONFIGURATION DU BOT TELEGRAM TELEGRAF
// ==========================================
const bot = new Telegraf(BOT_TOKEN);
const userLang = new Map();

const i18nBot = {
  fr: {
    welcome: (name) =>
      `👋 Bonjour <b>${escapeHtml(name)}</b> !\n\n` +
      `Bienvenue sur le bot officiel d'<b>Evodevs Team</b> 🚀\n\n` +
      `Nous concevons des <b>sites web modernes</b>, des <b>boutiques Telegram</b> et des <b>identités de marque</b> taillées pour booster votre activité.\n\n` +
      `Que souhaitez-vous faire ?`,
    servicesBtn: '💼 Nos Services & Tarifs',
    openShopBtn: '🚀 Ouvrir la Mini App',
    quoteBtn: '📝 Demander un Devis',
    contactBtn: '💬 Contacter un Développeur',
    backMenuBtn: '⬅️ Retour au Menu',
    langSwitched: 'Langue changée en Français 🇫🇷',
    servicesText:
      `💼 <b>Catalogue de Services — Evodevs Team</b>\n\n` +
      `🌐 <b>Site Vitrine Essentiel</b>\n` +
      `• 1-3 pages, WhatsApp direct, domaine + hébergement 1 an\n` +
      `• <i>Tarif : 120 000 FCFA (~ $195)</i>\n\n` +
      `🚀 <b>Site Web Pro & Catalogue</b>\n` +
      `• Multi-pages, catalogue interactif, SEO & Google My Business\n` +
      `• <i>Tarif : 250 000 – 400 000 FCFA (~ $410 – $650)</i>\n\n` +
      `🛍️ <b>Telegram Mini App E-Commerce</b>\n` +
      `• Boutique complète in-app, panier, alertes commandes\n` +
      `• <i>Tarif : 350 000 – 650 000 FCFA (~ $570 – $1 050)</i>\n\n` +
      `🎨 <b>Identité Visuelle & Logo</b>\n` +
      `• Logo vectoriel pro, charte graphique & déclinaisons\n` +
      `• <i>Tarif : 60 000 – 120 000 FCFA (~ $100 – $200)</i>\n\n` +
      `🤖 <b>Bot Telegram & Automatisation</b>\n` +
      `• Réponses auto, menu interactif, notifications 24/7\n` +
      `• <i>Tarif : 100 000 – 220 000 FCFA (~ $165 – $360)</i>\n\n` +
      `🛡️ <b>Maintenance & Sérénité</b>\n` +
      `• Sauvegardes continues, sécurité & support dédié\n` +
      `• <i>Tarif : 15 000 FCFA / mois (ou 120 000 FCFA / an)</i>`,
    contactText:
      `💬 <b>Points de Contact Evodevs Team</b>\n\n` +
      `📲 <b>WhatsApp :</b> +237 698 44 80 24\n` +
      `✈️ <b>Telegram Direct :</b> @ItzCyd\n` +
      `📧 <b>E-mail :</b> evodevsteam.contact@gmail.com\n` +
      `📍 <b>Localisation :</b> Ngaoundéré & Yaoundé, Cameroun\n\n` +
      `<i>Réponse garantie sous 2h en journée.</i>`,
    helpText:
      `ℹ️ <b>Aide & Commandes</b>\n\n` +
      `• /start — Menu principal\n` +
      `• /services — Liste des prestations et tarifs\n` +
      `• /contact — Nos coordonnées directes\n` +
      `• /devis — Demander une estimation de projet\n` +
      `• /lang — Changer de langue (FR / EN)`
  },
  en: {
    welcome: (name) =>
      `👋 Hello <b>${escapeHtml(name)}</b> !\n\n` +
      `Welcome to the official <b>Evodevs Team</b> bot 🚀\n\n` +
      `We build <b>high-performance websites</b>, <b>Telegram stores</b>, and <b>digital brand identities</b> crafted to grow your business.\n\n` +
      `How can we help you today?`,
    servicesBtn: '💼 Our Services & Pricing',
    openShopBtn: '🚀 Open Mini App',
    quoteBtn: '📝 Request a Quote',
    contactBtn: '💬 Contact a Developer',
    backMenuBtn: '⬅️ Back to Menu',
    langSwitched: 'Language switched to English 🇬🇧',
    servicesText:
      `💼 <b>Services & Pricing — Evodevs Team</b>\n\n` +
      `🌐 <b>Essential Showcase Site</b>\n` +
      `• 1-3 responsive pages, WhatsApp direct, 1 yr hosting\n` +
      `• <i>Price: $195 (~ 120 000 FCFA)</i>\n\n` +
      `🚀 <b>Pro Business Website & Catalog</b>\n` +
      `• Multi-pages, dynamic catalog, local SEO setup\n` +
      `• <i>Price: $410 – $650 (~ 250k – 400k FCFA)</i>\n\n` +
      `🛍️ <b>Telegram Mini App E-Commerce</b>\n` +
      `• Full in-app shopping cart, catalog, instant orders\n` +
      `• <i>Price: $570 – $1,050 (~ 350k – 650k FCFA)</i>\n\n` +
      `🎨 <b>Visual Identity & Brand Kit</b>\n` +
      `• Vector logo formats, brand guidelines & social covers\n` +
      `• <i>Price: $100 – $200 (~ 60k – 120k FCFA)</i>\n\n` +
      `🤖 <b>Telegram Bot & Automation</b>\n` +
      `• Custom menu logic, auto-replies, 24/7 alerts\n` +
      `• <i>Price: $165 – $360 (~ 100k – 220k FCFA)</i>\n\n` +
      `🛡️ <b>Maintenance & Peace of Mind</b>\n` +
      `• Cloud hosting, weekly backups & priority support\n` +
      `• <i>Price: $25 / month (or $200 / year)</i>`,
    contactText:
      `💬 <b>Connect with Evodevs Team</b>\n\n` +
      `📲 <b>WhatsApp:</b> +237 698 44 80 24\n` +
      `✈️ <b>Telegram:</b> @ItzCyd\n` +
      `📧 <b>Email:</b> evodevsteam.contact@gmail.com\n` +
      `📍 <b>Location:</b> Cameroon (WAT Timezone)\n\n` +
      `<i>We reply within 2 hours during business hours.</i>`,
    helpText:
      `ℹ️ <b>Help & Commands</b>\n\n` +
      `• /start — Main menu\n` +
      `• /services — Services & pricing list\n` +
      `• /contact — Direct communication channels\n` +
      `• /devis — Request a quote\n` +
      `• /lang — Switch language (EN / FR)`
  }
};

const getLang = (ctx) => userLang.get(ctx.chat?.id) || 'fr';
const t = (ctx, key, ...args) => {
  const lang = getLang(ctx);
  const val = i18nBot[lang][key];
  return typeof val === 'function' ? val(...args) : val;
};

// Menu Principal Inline Keyboard
const getMainMenu = (ctx) => {
  const buttons = [];

  if (WEBAPP_URL) {
    buttons.push([Markup.button.webApp(t(ctx, 'openShopBtn'), WEBAPP_URL)]);
  }

  buttons.push([Markup.button.callback(t(ctx, 'servicesBtn'), 'cmd_services')]);
  buttons.push([
    Markup.button.callback(t(ctx, 'contactBtn'), 'cmd_contact'),
    Markup.button.url('📲 WhatsApp', 'https://wa.me/237698448024')
  ]);
  buttons.push([
    Markup.button.callback('🇫🇷 Français', 'lang_fr'),
    Markup.button.callback('🇬🇧 English', 'lang_en')
  ]);

  return Markup.inlineKeyboard(buttons);
};

// Commande /start
bot.start((ctx) => {
  const name = ctx.from?.first_name || 'Partenaire';
  ctx.reply(t(ctx, 'welcome', name), {
    parse_mode: 'HTML',
    ...getMainMenu(ctx)
  });
});

// Commande /services
bot.command('services', (ctx) => {
  ctx.reply(t(ctx, 'servicesText'), {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      ...(WEBAPP_URL ? [[Markup.button.webApp(t(ctx, 'openShopBtn'), WEBAPP_URL)]] : []),
      [Markup.button.callback(t(ctx, 'backMenuBtn'), 'main_menu')]
    ])
  });
});

// Commande /contact
bot.command('contact', (ctx) => {
  ctx.reply(t(ctx, 'contactText'), {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.url('📲 Échanger sur WhatsApp', 'https://wa.me/237698448024')],
      [Markup.button.callback(t(ctx, 'backMenuBtn'), 'main_menu')]
    ])
  });
});

// Commande /help
bot.command('help', (ctx) => {
  ctx.reply(t(ctx, 'helpText'), {
    parse_mode: 'HTML',
    ...getMainMenu(ctx)
  });
});

// Commande /lang
bot.command('lang', (ctx) => {
  ctx.reply('Choisissez votre langue / Choose your language :', {
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback('🇫🇷 Français', 'lang_fr'),
        Markup.button.callback('🇬🇧 English', 'lang_en')
      ]
    ])
  });
});

// Actions de callback
bot.action('cmd_services', (ctx) => {
  ctx.editMessageText(t(ctx, 'servicesText'), {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      ...(WEBAPP_URL ? [[Markup.button.webApp(t(ctx, 'openShopBtn'), WEBAPP_URL)]] : []),
      [Markup.button.callback(t(ctx, 'backMenuBtn'), 'main_menu')]
    ])
  }).catch(() => {});
});

bot.action('cmd_contact', (ctx) => {
  ctx.editMessageText(t(ctx, 'contactText'), {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.url('📲 Échanger sur WhatsApp', 'https://wa.me/237698448024')],
      [Markup.button.callback(t(ctx, 'backMenuBtn'), 'main_menu')]
    ])
  }).catch(() => {});
});

bot.action('lang_en', (ctx) => {
  userLang.set(ctx.chat.id, 'en');
  ctx.answerCbQuery(t(ctx, 'langSwitched')).catch(() => {});
  const name = ctx.from?.first_name || 'Partner';
  ctx.editMessageText(t(ctx, 'welcome', name), {
    parse_mode: 'HTML',
    ...getMainMenu(ctx)
  }).catch(() => {});
});

bot.action('lang_fr', (ctx) => {
  userLang.set(ctx.chat.id, 'fr');
  ctx.answerCbQuery(t(ctx, 'langSwitched')).catch(() => {});
  const name = ctx.from?.first_name || 'Partenaire';
  ctx.editMessageText(t(ctx, 'welcome', name), {
    parse_mode: 'HTML',
    ...getMainMenu(ctx)
  }).catch(() => {});
});

bot.action('main_menu', (ctx) => {
  const name = ctx.from?.first_name || 'Partenaire';
  ctx.editMessageText(t(ctx, 'welcome', name), {
    parse_mode: 'HTML',
    ...getMainMenu(ctx)
  }).catch(() => {});
});

// Lancement sécurisé du bot Telegraf
bot.launch({ dropPendingUpdates: true })
  .then(() => console.log('🤖 Bot Telegram Evodevs lancé avec succès !'))
  .catch((err) => {
    console.error('⚠️ Impossible de démarrer le bot Telegram (vérifiez BOT_TOKEN) :', err.message);
  });

// Arrêt propre
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
