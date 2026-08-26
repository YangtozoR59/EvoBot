const { Telegraf, Markup } = require('telegraf');
const express = require('express');
const path = require('path');
const fs = require('fs');

// Chargement des variables .env si le fichier existe
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
const WEBSITE_URL = process.env.WEBSITE_URL || 'https://evodevstore.netlify.app';

// Parse JSON
app.use(express.json());

// Fichiers statiques Mini App
app.use(express.static(path.join(__dirname, 'public')));

// Helper pour échapper le HTML pour Telegram
function escapeHtml(text) {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

// Healthcheck pour Render / UptimeRobot
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// ==========================================
// 2. API DE COMMANDE SÉCURISÉE DEPUIS LA MINI APP
// ==========================================
app.post('/api/send-order', async (req, res) => {
  try {
    const { name, email, service, budget, description, urgent } = req.body;

    if (!name || !service) {
      return res.status(400).json({ ok: false, error: 'Nom et service obligatoires.' });
    }

    const chatId = OWNER_CHAT_ID;
    if (!chatId) {
      console.warn('[EvoBot] OWNER_CHAT_ID non configure. Commande enregistree en console.');
      console.log('Commande reçue :', { name, email, service, budget, description, urgent });
      return res.json({ ok: true, note: 'Commande enregistrée localement (OWNER_CHAT_ID absent).' });
    }

    const messageHtml =
      `<b>NOUVELLE DEMANDE DE PROJET — EVODEVS TEAM (-50%)</b>\n\n` +
      `<b>Client :</b> ${escapeHtml(name)}\n` +
      `<b>Contact / Telephone :</b> ${escapeHtml(email || 'Non renseigne')}\n` +
      `<b>Prestation :</b> ${escapeHtml(service)}\n` +
      `<b>Budget Estime :</b> ${escapeHtml(budget || 'Non precise')}\n` +
      `<b>Priorite Express :</b> ${urgent ? '<b>OUI (Express -48h)</b>' : 'Standard'}\n\n` +
      `<b>Details du besoin :</b>\n${escapeHtml(description || 'Aucun detail supplementaire.')}\n\n` +
      `<i>Source : Mini App Evodevs Telegram</i>`;

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

// Fallback SPA universel
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Écoute réseau
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Serveur Evodevs actif sur port ${PORT}`);
});

// ==========================================
// 3. CATALOGUE DES SERVICES (ZERO EMOJIS, PRIX -50%)
// ==========================================
const servicesData = {
  web: {
    title: { fr: 'Site Vitrine Essentiel', en: 'Essential Showcase Site' },
    price: { fr: '60 000 FCFA (au lieu de 120 000 FCFA, ~ $100)', en: '$100 (was $200, ~ 60 000 FCFA)' },
    delay: { fr: '4 a 6 jours ouvres', en: '4 to 6 business days' },
    desc: {
      fr: 'Une presence web moderne pour presenter votre activite et recevoir des prises de contact directes sur WhatsApp et telephone.',
      en: 'A sleek, ultra-fast website optimized for smartphones and slow connections. Perfect for local businesses and independent pros.'
    },
    features: {
      fr: [
        '1 a 3 pages responsives modernes',
        'Bouton WhatsApp direct et appel en 1 clic',
        'Nom de domaine et hebergement 1 an inclus',
        'Referencement Google SEO de base',
        'Garantie 14 jours incluse'
      ],
      en: [
        '1 to 3 fast responsive pages',
        'Direct WhatsApp click-to-chat and call button',
        '1 year free domain and cloud hosting',
        'Core Google SEO setup',
        '14-day warranty included'
      ]
    }
  },

  ecommerce: {
    title: { fr: 'Site Web Pro & Catalogue', en: 'Pro Business Site & Catalog' },
    price: { fr: '125 000 – 200 000 FCFA (~ $200 – $330)', en: '$200 – $330 (~ 125k – 200k FCFA)' },
    delay: { fr: '7 a 10 jours ouvres', en: '7 to 10 business days' },
    desc: {
      fr: 'Site multi-pages avec catalogue interactif de vos produits ou services, formulaires de devis et referencement Google Maps.',
      en: 'Full business platform with interactive catalog, inquiry forms, and Google Maps local SEO.'
    },
    features: {
      fr: [
        'Jusqu\'a 6 pages sur-mesure',
        'Catalogue interactif avec filtres',
        'SEO local et Google My Business',
        'Formulaires de reservation et devis',
        'Formation prise en main incluse'
      ],
      en: [
        'Up to 6 custom pages',
        'Interactive catalog and dynamic filters',
        'Local SEO and Google Business setup',
        'Booking and quote request forms',
        'Video training walkthrough'
      ]
    }
  },

  telegram_app: {
    title: { fr: 'Telegram Mini App E-Commerce', en: 'Telegram Mini App E-Commerce' },
    price: { fr: '175 000 – 325 000 FCFA (~ $285 – $530)', en: '$285 – $530 (~ 175k – 325k FCFA)' },
    delay: { fr: '7 a 12 jours ouvres', en: '7 to 12 business days' },
    desc: {
      fr: 'Votre boutique complete integree dans Telegram : panier, catalogue interactif et reception instantanee des commandes.',
      en: 'Your full online shop embedded inside Telegram: in-app cart, catalog, and real-time order alerts.'
    },
    features: {
      fr: [
        'Interface Telegram WebApp native et fluide',
        'Panier d\'achat dynamique',
        'Alertes commandes instantanees',
        'Gestion simple des articles',
        'Deploiement Cloud securise inclus'
      ],
      en: [
        'Native responsive Telegram WebApp',
        'Interactive shopping cart',
        'Instant order push alerts',
        'Easy inventory updates',
        'Secure Cloud deployment included'
      ]
    }
  },

  design: {
    title: { fr: 'Identite Visuelle & Logo', en: 'Visual Identity & Logo' },
    price: { fr: '30 000 – 60 000 FCFA (~ $50 – $100)', en: '$50 – $100 (~ 30k – 60k FCFA)' },
    delay: { fr: '3 a 5 jours ouvres', en: '3 to 5 business days' },
    desc: {
      fr: 'Creation de votre univers de marque avec un logo vectoriel haute definition et une charte graphique professionnelle.',
      en: 'Build a memorable, trustworthy brand with a high-definition vector logo and full visual guidelines.'
    },
    features: {
      fr: [
        '3 propositions originales de logos',
        'Fichiers vectoriels HD (SVG, PNG, PDF)',
        'Palette de couleurs et typographies',
        'Bannieres reseaux sociaux adaptees',
        'Revisions jusqu\'a entiere validation'
      ],
      en: [
        '3 unique logo concepts',
        'Vector master files (SVG, PNG, PDF)',
        'Color palette and typography guide',
        'Social media cover headers',
        'Unlimited revisions until satisfaction'
      ]
    }
  },

  bot: {
    title: { fr: 'Bot Telegram & Automatisation', en: 'Telegram Bot & Automation' },
    price: { fr: '50 000 – 110 000 FCFA (~ $80 – $180)', en: '$80 – $180 (~ 50k – 110k FCFA)' },
    delay: { fr: '3 a 6 jours ouvres', en: '3 to 6 business days' },
    desc: {
      fr: 'Automatisez vos ventes et votre support client 24h/24 grace a un assistant Telegram connecte a votre activite.',
      en: 'Automate sales inquiries and 24/7 customer support with a custom interactive assistant.'
    },
    features: {
      fr: [
        'Menu interactif et boutons sur-mesure',
        'Alertes en direct pour l\'administrateur',
        'Gestion des reponses automatiques FAQ',
        'Hebergement Cloud securise',
        'Prise en main simple et rapide'
      ],
      en: [
        'Custom interactive commands and menus',
        'Real-time admin notification alerts',
        'Automated FAQ response handler',
        'Secure cloud backend hosting',
        'Quick handover training'
      ]
    }
  },

  maintenance: {
    title: { fr: 'Maintenance & Serenite', en: 'Maintenance & Peace of Mind' },
    price: { fr: '7 500 FCFA / mois (ou 60 000 FCFA / an, ~ $12/m)', en: '$12 / month (or $100 / year)' },
    delay: { fr: 'Support continu', en: 'Continuous support' },
    desc: {
      fr: 'Deleguez toute la technique : hebergement Cloud, sauvegardes regulieres, mises a jour de securite et assistance WhatsApp.',
      en: 'Delegate all technical tasks: cloud hosting, weekly backups, security patches, and direct WhatsApp support.'
    },
    features: {
      fr: [
        'Hebergement Cloud haute disponibilite',
        'Sauvegardes automatiques regulieres',
        'Mises a jour de securite continues',
        'Support technique WhatsApp prioritaire',
        'Modifications mineures mensuelles incluses'
      ],
      en: [
        'High-availability cloud hosting',
        'Automated regular backups',
        'Continuous security patches',
        'Priority WhatsApp support channel',
        'Minor monthly edits included'
      ]
    }
  }
};

// ==========================================
// 4. LOGIQUE DU BOT TELEGRAM (TELEGRAF)
// ==========================================
const bot = new Telegraf(BOT_TOKEN);
const userLang = new Map();

const getLang = (ctx) => userLang.get(ctx.chat?.id) || 'fr';

// Menu Principal
const getMainMenu = (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const buttons = [];

  if (WEBAPP_URL) {
    buttons.push([Markup.button.webApp(isFr ? 'Ouvrir la Mini App (-50%)' : 'Open Mini App (-50%)', WEBAPP_URL)]);
  }

  buttons.push([
    Markup.button.callback(isFr ? 'Catalogue des Services' : 'Services Catalog', 'cmd_services'),
    Markup.button.callback(isFr ? 'Commander un Service' : 'Order a Service', 'cmd_order_menu')
  ]);

  buttons.push([
    Markup.button.url(isFr ? 'Site Web Officiel' : 'Official Website', WEBSITE_URL),
    Markup.button.url(isFr ? 'WhatsApp Direct' : 'WhatsApp Direct', 'https://wa.me/237698448024')
  ]);

  buttons.push([
    Markup.button.callback(isFr ? 'Contact Développeur' : 'Developer Contact', 'cmd_contact'),
    Markup.button.callback(isFr ? 'Switch to English' : 'Passer en Français', isFr ? 'lang_en' : 'lang_fr')
  ]);

  return Markup.inlineKeyboard(buttons);
};

// Menu de sélection des fiches de services
const getServicesMenu = (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  return Markup.inlineKeyboard([
    [Markup.button.callback(isFr ? 'Site Vitrine (60 000 FCFA)' : 'Showcase Site ($100)', 'detail_web')],
    [Markup.button.callback(isFr ? 'Site Pro & Catalogue (125 000 FCFA)' : 'Pro Business Site ($200)', 'detail_ecommerce')],
    [Markup.button.callback(isFr ? 'Mini App Telegram (175 000 FCFA)' : 'Telegram Mini App ($285)', 'detail_telegram_app')],
    [Markup.button.callback(isFr ? 'Identité & Logo (30 000 FCFA)' : 'Logo & Identity ($50)', 'detail_design')],
    [Markup.button.callback(isFr ? 'Bot Telegram (50 000 FCFA)' : 'Telegram Bot ($80)', 'detail_bot')],
    [Markup.button.callback(isFr ? 'Maintenance (7 500 FCFA/mois)' : 'Maintenance ($12/m)', 'detail_maintenance')],
    [
      Markup.button.url(isFr ? 'Simulateur sur le Site' : 'Website Estimator', `${WEBSITE_URL}#simulateur`),
      Markup.button.callback(isFr ? 'Menu Principal' : 'Main Menu', 'main_menu')
    ]
  ]);
};

// Rendu du détail d'un service
function renderServiceDetail(ctx, key) {
  const lang = getLang(ctx);
  const s = servicesData[key];
  if (!s) return;

  const isFr = lang === 'fr';
  const featuresText = s.features[lang].map((f) => `— ${f}`).join('\n');

  const text =
    `<b>${s.title[lang]}</b>\n\n` +
    `<b>Description :</b>\n${s.desc[lang]}\n\n` +
    `<b>Tarif Promotionnel (-50%) :</b> <code>${s.price[lang]}</code>\n` +
    `<b>Delai estime :</b> ${s.delay[lang]}\n\n` +
    `<b>Prestations incluses :</b>\n${featuresText}\n\n` +
    `<i>Choisissez votre mode de commande :</i>`;

  const waUrl = `https://wa.me/237698448024?text=${encodeURIComponent(
    `Bonjour Evodevs, je souhaite commander la prestation : ${s.title[lang]} au tarif promotionnel.`
  )}`;

  const buttons = [
    [Markup.button.callback(isFr ? 'Commander directement ce service' : 'Order this service now', `start_order_${key}`)],
    [
      Markup.button.url(isFr ? 'Discuter sur WhatsApp' : 'Chat on WhatsApp', waUrl),
      Markup.button.url(isFr ? 'Voir sur le Site' : 'View on Website', `${WEBSITE_URL}#services`)
    ],
    [Markup.button.callback(isFr ? 'Retour aux Services' : 'Back to Services', 'cmd_services')]
  ];

  return { text, keyboard: Markup.inlineKeyboard(buttons) };
}

// ---- COMMANDES DU BOT ----

// /start
bot.start((ctx) => {
  const name = ctx.from?.first_name || 'Partenaire';
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const welcomeText = isFr
    ? `Bonjour <b>${escapeHtml(name)}</b>,\n\n` +
      `Bienvenue sur le bot officiel d'<b>Evodevs Team</b>.\n\n` +
      `<b>OFFRE SPECIALE :</b> -50% sur l'ensemble de nos créations de sites web, boutiques Telegram Mini Apps et identités graphiques.\n\n` +
      `Explorez le catalogue, consultez les fiches détaillées de chaque service ou visitez notre site web officiel :`
    : `Hello <b>${escapeHtml(name)}</b>,\n\n` +
      `Welcome to the official <b>Evodevs Team</b> bot.\n\n` +
      `<b>SPECIAL OFFER:</b> -50% OFF on all website builds, Telegram Mini Apps, and brand designs.\n\n` +
      `Explore our catalog, view full service details, or visit our official website:`;

  ctx.reply(welcomeText, {
    parse_mode: 'HTML',
    ...getMainMenu(ctx)
  });
});

// /services
bot.command('services', (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const text = isFr
    ? `<b>Catalogue des Services Evodevs (-50%)</b>\n\n` +
      `Sélectionnez une prestation pour afficher sa fiche détaillée, son délai et son tarif :`
    : `<b>Evodevs Services Catalog (-50% OFF)</b>\n\n` +
      `Select a solution below to view full details, turnaround, and pricing:`;

  ctx.reply(text, {
    parse_mode: 'HTML',
    ...getServicesMenu(ctx)
  });
});

// /site ou /web
bot.command(['site', 'web', 'website'], (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const text = isFr
    ? `<b>Site Web Officiel — Evodevs Team</b>\n\n` +
      `Retrouvez toutes nos réalisations, notre simulateur interactif de prix et nos offres complètes sur notre plateforme web :\n\n` +
      `<b>Lien :</b> ${WEBSITE_URL}`
    : `<b>Official Website — Evodevs Team</b>\n\n` +
      `Explore all our work, live price estimator, and full solutions on our web platform:\n\n` +
      `<b>Link:</b> ${WEBSITE_URL}`;

  ctx.reply(text, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.url(isFr ? 'Visiter le Site Web' : 'Visit Official Website', WEBSITE_URL)],
      [Markup.button.callback(isFr ? 'Menu Principal' : 'Main Menu', 'main_menu')]
    ])
  });
});

// /commander
bot.command(['commander', 'order', 'devis'], (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const text = isFr
    ? `<b>Commander une Solution Evodevs (-50%)</b>\n\n` +
      `Choisissez la prestation que vous désirez commander ci-dessous :`
    : `<b>Order an Evodevs Solution (-50% OFF)</b>\n\n` +
      `Select the solution you would like to order below:`;

  ctx.reply(text, {
    parse_mode: 'HTML',
    ...getServicesMenu(ctx)
  });
});

// /contact
bot.command('contact', (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const text = isFr
    ? `<b>Points de Contact — Evodevs Team</b>\n\n` +
      `<b>WhatsApp :</b> +237 698 44 80 24\n` +
      `<b>Telegram Développeur :</b> @ItzCyd\n` +
      `<b>Site Web :</b> ${WEBSITE_URL}\n` +
      `<b>E-mail :</b> evodevsteam.contact@gmail.com\n` +
      `<b>Bureaux :</b> Ngaoundéré & Yaoundé, Cameroun\n\n` +
      `<i>Réponse garantie sous 2h.</i>`
    : `<b>Contact Channels — Evodevs Team</b>\n\n` +
      `<b>WhatsApp:</b> +237 698 44 80 24\n` +
      `<b>Telegram Developer:</b> @ItzCyd\n` +
      `<b>Website:</b> ${WEBSITE_URL}\n` +
      `<b>Email:</b> evodevsteam.contact@gmail.com\n` +
      `<b>Offices:</b> Cameroon (WAT Timezone)\n\n` +
      `<i>Reply guaranteed within 2 hours.</i>`;

  ctx.reply(text, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.url('WhatsApp (+237 698 44 80 24)', 'https://wa.me/237698448024')],
      [Markup.button.url('Site Web Officiel', WEBSITE_URL)],
      [Markup.button.callback(isFr ? 'Menu Principal' : 'Main Menu', 'main_menu')]
    ])
  });
});

// /help
bot.command('help', (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const text = isFr
    ? `<b>Commandes disponibles :</b>\n\n` +
      `• /start — Menu principal du bot\n` +
      `• /services — Catalogue complet avec fiches détaillées\n` +
      `• /commander — Passer commande\n` +
      `• /site — Accéder au site web officiel\n` +
      `• /contact — Coordonnées directes\n` +
      `• /lang — Changer de langue`
    : `<b>Available Commands:</b>\n\n` +
      `• /start — Main menu\n` +
      `• /services — Full services catalog with details\n` +
      `• /commander — Place an order\n` +
      `• /site — Access official website\n` +
      `• /contact — Direct contact channels\n` +
      `• /lang — Switch language`;

  ctx.reply(text, {
    parse_mode: 'HTML',
    ...getMainMenu(ctx)
  });
});

// /lang
bot.command('lang', (ctx) => {
  ctx.reply('Choisissez votre langue / Select your language :', {
    ...Markup.inlineKeyboard([
      [
        Markup.button.callback('Français', 'lang_fr'),
        Markup.button.callback('English', 'lang_en')
      ]
    ])
  });
});

// ---- CALLBACK ACTIONS ----

bot.action('cmd_services', (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const text = isFr
    ? `<b>Catalogue des Services Evodevs (-50%)</b>\n\n` +
      `Sélectionnez une prestation ci-dessous pour voir la fiche détaillée :`
    : `<b>Evodevs Services Catalog (-50% OFF)</b>\n\n` +
      `Select a service below to view its detailed view:`;

  ctx.editMessageText(text, {
    parse_mode: 'HTML',
    ...getServicesMenu(ctx)
  }).catch(() => {});
});

bot.action('cmd_order_menu', (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const text = isFr
    ? `<b>Choisissez la prestation que vous souhaitez commander :</b>`
    : `<b>Select the solution you want to order:</b>`;

  ctx.editMessageText(text, {
    parse_mode: 'HTML',
    ...getServicesMenu(ctx)
  }).catch(() => {});
});

bot.action('cmd_contact', (ctx) => {
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  const text = isFr
    ? `<b>Points de Contact — Evodevs Team</b>\n\n` +
      `<b>WhatsApp :</b> +237 698 44 80 24\n` +
      `<b>Telegram Développeur :</b> @ItzCyd\n` +
      `<b>Site Web :</b> ${WEBSITE_URL}\n` +
      `<b>E-mail :</b> evodevsteam.contact@gmail.com\n` +
      `<b>Bureaux :</b> Ngaoundéré & Yaoundé, Cameroun\n\n` +
      `<i>Réponse humaine garantie sous 2h.</i>`
    : `<b>Contact Channels — Evodevs Team</b>\n\n` +
      `<b>WhatsApp:</b> +237 698 44 80 24\n` +
      `<b>Telegram Developer:</b> @ItzCyd\n` +
      `<b>Website:</b> ${WEBSITE_URL}\n` +
      `<b>Email:</b> evodevsteam.contact@gmail.com\n\n` +
      `<i>Reply guaranteed within 2 hours.</i>`;

  ctx.editMessageText(text, {
    parse_mode: 'HTML',
    ...Markup.inlineKeyboard([
      [Markup.button.url('WhatsApp (+237 698 44 80 24)', 'https://wa.me/237698448024')],
      [Markup.button.url('Site Web Officiel', WEBSITE_URL)],
      [Markup.button.callback(isFr ? 'Menu Principal' : 'Main Menu', 'main_menu')]
    ])
  }).catch(() => {});
});

// Fiches détaillées des 6 services
['web', 'ecommerce', 'telegram_app', 'design', 'bot', 'maintenance'].forEach((key) => {
  bot.action(`detail_${key}`, (ctx) => {
    const res = renderServiceDetail(ctx, key);
    if (res) {
      ctx.editMessageText(res.text, {
        parse_mode: 'HTML',
        ...res.keyboard
      }).catch(() => {});
    }
  });

  // Commande directe in-chat
  bot.action(`start_order_${key}`, async (ctx) => {
    const lang = getLang(ctx);
    const isFr = lang === 'fr';
    const s = servicesData[key];
    const user = ctx.from;

    const notifAdmin =
      `<b>NOUVELLE INTENTION DE COMMANDE TELEGRAM</b>\n\n` +
      `<b>Client :</b> ${escapeHtml(user.first_name || '')} ${escapeHtml(user.last_name || '')} (@${user.username || 'Sans username'})\n` +
      `<b>Telegram ID :</b> <code>${user.id}</code>\n` +
      `<b>Prestation :</b> ${s.title[lang]}\n` +
      `<b>Tarif :</b> ${s.price[lang]}\n` +
      `<i>Origine : Bouton in-chat Telegram</i>`;

    if (OWNER_CHAT_ID) {
      fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: OWNER_CHAT_ID,
          text: notifAdmin,
          parse_mode: 'HTML'
        })
      }).catch(() => {});
    }

    const confirmText = isFr
      ? `<b>Commande initiée pour : ${s.title.fr}</b>\n\n` +
        `Votre demande a été transmise à notre équipe de développement. Un développeur vous contactera très rapidement.\n\n` +
        `<b>Pour un traitement direct et prioritaire :</b>\nCliquez sur le bouton ci-dessous pour nous envoyer votre message direct sur WhatsApp :`
      : `<b>Order initiated for: ${s.title.en}</b>\n\n` +
        `Your inquiry was routed to the development team. A developer will follow up promptly.\n\n` +
        `<b>For instant priority handling:</b>\nTap below to connect directly with us on WhatsApp:`;

    const waLink = `https://wa.me/237698448024?text=${encodeURIComponent(
      `Bonjour Evodevs, j'ai initié ma commande sur Telegram pour : ${s.title[lang]} (${s.price[lang]}). Je souhaite finaliser les détails.`
    )}`;

    ctx.editMessageText(confirmText, {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        [Markup.button.url(isFr ? 'Finaliser sur WhatsApp (Prioritaire)' : 'Finalize on WhatsApp (Priority)', waLink)],
        [Markup.button.callback(isFr ? 'Retour aux Services' : 'Back to Services', 'cmd_services')],
        [Markup.button.callback(isFr ? 'Menu Principal' : 'Main Menu', 'main_menu')]
      ])
    }).catch(() => {});
  });
});

// Changement de langue
bot.action('lang_fr', (ctx) => {
  userLang.set(ctx.chat.id, 'fr');
  ctx.answerCbQuery('Langue : Français').catch(() => {});
  const name = ctx.from?.first_name || 'Partenaire';
  ctx.editMessageText(
    `Bonjour <b>${escapeHtml(name)}</b>,\n\n` +
    `Bienvenue sur le bot officiel d'<b>Evodevs Team</b>.\n\n` +
    `<b>OFFRE SPECIALE :</b> -50% sur tous nos services web.\n` +
    `Que souhaitez-vous faire ?`,
    {
      parse_mode: 'HTML',
      ...getMainMenu(ctx)
    }
  ).catch(() => {});
});

bot.action('lang_en', (ctx) => {
  userLang.set(ctx.chat.id, 'en');
  ctx.answerCbQuery('Language: English').catch(() => {});
  const name = ctx.from?.first_name || 'Partner';
  ctx.editMessageText(
    `Hello <b>${escapeHtml(name)}</b>,\n\n` +
    `Welcome to the official <b>Evodevs Team</b> bot.\n\n` +
    `<b>SPECIAL OFFER:</b> -50% OFF on all web services.\n` +
    `How can we assist you today?`,
    {
      parse_mode: 'HTML',
      ...getMainMenu(ctx)
    }
  ).catch(() => {});
});

bot.action('main_menu', (ctx) => {
  const name = ctx.from?.first_name || 'Partenaire';
  const lang = getLang(ctx);
  const isFr = lang === 'fr';

  ctx.editMessageText(
    isFr
      ? `Bonjour <b>${escapeHtml(name)}</b>,\n\nQue souhaitez-vous faire ?`
      : `Hello <b>${escapeHtml(name)}</b>,\n\nHow can we help you today?`,
    {
      parse_mode: 'HTML',
      ...getMainMenu(ctx)
    }
  ).catch(() => {});
});

// Lancement sécurisé du bot
bot.launch({ dropPendingUpdates: true })
  .then(() => console.log('Bot Telegram Evodevs lance avec succes !'))
  .catch((err) => {
    console.error('Erreur demarrage bot Telegram :', err.message);
  });

// Arrêt propre
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
