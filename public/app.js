/* ========================================
   EVODEVS TEAM — TELEGRAM MINI APP SPA
   ======================================== */

// ---- Telegram WebApp SDK ----
const tg = window.Telegram?.WebApp;
if (tg) {
  try {
    tg.ready();
    tg.expand();
  } catch (e) {
    console.log('Telegram SDK Init note:', e);
  }
}

function haptic(type = 'light') {
  if (tg && tg.HapticFeedback) {
    try {
      if (type === 'success') tg.HapticFeedback.notificationOccurred('success');
      else if (type === 'error') tg.HapticFeedback.notificationOccurred('error');
      else tg.HapticFeedback.impactOccurred(type);
    } catch (e) {}
  }
}

const i18n = {
  fr: {
    nav: { home: 'Accueil', services: 'Services', policy: 'Engagements', about: 'À propos' },
    home: {
      slogan: 'Solutions Web Haute Performance.|Telegram Mini Apps & Boutiques.|Design & Identités de Marque.|Excellence et Rapidité.',
      desc: 'Développements web sur-mesure et applications Telegram taillées pour développer votre activité en Afrique et dans le monde.',
      cta: 'Découvrir nos services',
      chips: ['⚡ Rapide', '📱 100% Mobile', '💸 MoMo & OM', '💎 Qualité Pro'],
      stats: ['Projets Livrés', 'Satisfaction Client', '% Disponibilité']
    },
    services: {
      title: 'Nos Services & Tarifs',
      subtitle: 'Des solutions concrètes avec des livrables clairs et sans frais cachés',
      detailBtn: 'Voir détails & commander →',
      timeLabel: 'Délai estimé',
      priceLabel: 'Tarif indicatif',
      note: '* Devis précis et personnalisé fourni sous 24h',
      orderBtn: '📝 Commander ce service'
    },
    policy: {
      title: 'Nos Engagements & Méthode',
      date: 'Mise à jour : Août 2026',
      sections: [
        { title: '1. Cadrage & Devis Gratuit', text: 'Chaque projet démarre par un échange sur vos besoins et vos objectifs. Un devis transparent et sans surprise vous est transmis sous 24h.' },
        { title: '2. Acompte & Modalités de Paiement', text: 'Acompte de 40% pour démarrer le développement. Le solde est réglé uniquement à la livraison finale après vos retours et validation. Paiements acceptés : MTN MoMo, Orange Money, virement bancaire ou cryptos.' },
        { title: '3. Respect des Délais', text: 'Nous nous engageons sur un calendrier clair (5 à 14 jours selon l\'envergure du projet). Un suivi régulier vous est partagé sur WhatsApp ou Telegram.' },
        { title: '4. Garantie & Ajustements Inclus', text: 'Tous nos forfaits incluent 14 jours de garantie offerte après mise en ligne pour tout ajustement mineur.' },
        { title: '5. Propriété & Code Source', text: 'À la livraison intégrale, vous êtes 100% propriétaire de vos contenus, domaines et livrables créés.' },
        { title: '6. Confidentialité des Données', text: 'Vos données et stratégies commerciales restent strictement confidentielles et ne sont jamais divulguées.' }
      ]
    },
    about: {
      title: 'À propos',
      subtitle: 'Qui sommes-nous ?',
      intro: '<strong>Evodevs Team</strong> est un collectif de développeurs et designers spécialisé dans la création d\'outils numériques performants pour entrepreneurs, commerçants et PME.',
      valuesTitle: '💎 Nos Piliers',
      values: [
        { icon: '⚡', name: 'Performance', desc: 'Sites ultra-rapides optimisés même en 3G' },
        { icon: '📱', name: 'Mobile-First', desc: 'Expérience fluide sur smartphones' },
        { icon: '🤝', name: 'Proximité', desc: 'Échanges directs et réactifs sur WhatsApp' },
        { icon: '🛡️', name: 'Fiabilité', desc: 'Code propre, sécurisé et pérenne' }
      ],
      skillsTitle: '🛠 Technologies Maîtrisées',
      ctaText: '💬 Vous avez une idée de projet ? Commandez directement en quelques clics.',
      ctaBtn: 'Voir le catalogue'
    },
    order: {
      title: '📝 Demande de Projet',
      nameLabel: 'Votre Nom ou Entreprise *',
      namePlaceholder: 'Ex: Paul Martin / StorePME',
      nameErr: 'Veuillez renseigner ce champ',
      contactLabel: 'Numéro WhatsApp / Téléphone *',
      contactPlaceholder: 'Ex: +237 6XX XX XX XX',
      contactErr: 'Veuillez renseigner votre contact',
      budgetLabel: 'Budget estimé (FCFA)',
      budgetOptions: ['Sélectionner une tranche', '100k - 200k FCFA', '200k - 400k FCFA', '400k - 800k FCFA', '+ 800k FCFA'],
      descLabel: 'Description du besoin',
      descPlaceholder: 'Décrivez vos fonctionnalités clés, vos délais...',
      urgentLabel: '⚡ Projet urgent (délai express)',
      termsLabel: 'J\'accepte les <a href="#" onclick="event.preventDefault();closeModal(\'orderModal\');navigate(\'policy\')" style="color:var(--accent-light);text-decoration:underline;">engagements de service</a> *',
      submitBtn: 'Envoyer la demande',
      sending: 'Envoi en cours...',
      successTitle: 'Demande Reçue !',
      successMsg: 'Merci <strong>{name}</strong> ! Votre demande pour <strong>{service}</strong> a bien été enregistrée. Notre équipe vous contactera sous 2h.',
      close: 'Fermer',
      errorAlert: 'Erreur lors de l\'envoi. Veuillez vérifier votre connexion ou nous contacter directement sur WhatsApp.',
      retry: 'Réessayer'
    },
    data: {
      services: [
        {
          id: 'web',
          icon: '🌐',
          name: 'Site Vitrine Essentiel',
          desc: '1 à 3 pages responsives, WhatsApp direct, domaine et hébergement 1 an.',
          longDesc: 'Idéal pour les indépendants et commerçants souhaitant une présence en ligne propre, rapide et facilement trouvable sur Google.',
          features: ['1 à 3 pages sur-mesure', 'Bouton WhatsApp & appel direct', 'Hébergement & domaine 1 an inclus', 'Optimisé pour connexions lentes', 'Garantie 14 jours offerte'],
          price: '120 000 FCFA (~ $195)',
          delay: '4-7 jours'
        },
        {
          id: 'ecommerce',
          icon: '🚀',
          name: 'Site Web Pro & Catalogue',
          desc: 'Site multi-sections, catalogue interactif, formulaire avancé et référencement SEO.',
          longDesc: 'Pour les entreprises en pleine expansion nécessitant un catalogue complet de produits ou services, avec une architecture pensée pour la conversion.',
          features: ['Jusqu\'à 6 pages sur-mesure', 'Catalogue dynamique & galerie', 'SEO local & Google My Business', 'Design personnalisé & animations', 'Formation prise en main incluse'],
          price: '250k – 400k FCFA (~ $410 – $650)',
          delay: '7-14 jours'
        },
        {
          id: 'telegram_app',
          icon: '🛍️',
          name: 'Telegram Mini App E-Commerce',
          desc: 'Boutique complète au sein de Telegram : catalogue, panier et commandes en direct.',
          longDesc: 'Permettez à votre communauté d\'acheter vos produits sans quitter Telegram. Une expérience d\'achat instantanée, fluide et moderne.',
          features: ['Interface Telegram WebApp native', 'Panier d\'achat interactif', 'Transmission instantanée des commandes', 'Gestion simple des articles', 'Notifications automatiques'],
          price: '350k – 650k FCFA (~ $570 – $1 050)',
          delay: '7-12 jours'
        },
        {
          id: 'design',
          icon: '🎨',
          name: 'Identité Visuelle & Logo',
          desc: 'Logo vectoriel professionnel, charte graphique et déclinaisons réseaux sociaux.',
          longDesc: 'Construisez une image de marque forte et professionnelle qui inspire confiance auprès de vos futurs clients.',
          features: ['3 propositions de logos originaux', 'Fichiers vectoriels HD (SVG, PNG, PDF)', 'Palette de couleurs & typographies', 'Bannières réseaux sociaux', 'Révisions incluses'],
          price: '60k – 120k FCFA (~ $100 – $200)',
          delay: '3-5 jours'
        },
        {
          id: 'bot',
          icon: '🤖',
          name: 'Bot Telegram & Automatisation',
          desc: 'Bot sur-mesure pour réponses automatiques, prise de commandes et alertes 24/7.',
          longDesc: 'Automatisez votre service client et gagnez du temps grâce à un assistant Telegram réactif connecté à votre activité.',
          features: ['Menu interactif et commandes sur-mesure', 'Notifications administrateur en direct', 'Déploiement serveur sécurisé', 'Support multilingue possible', 'Maintenance initiale incluse'],
          price: '100k – 220k FCFA (~ $165 – $360)',
          delay: '3-6 jours'
        },
        {
          id: 'maintenance',
          icon: '🛡️',
          name: 'Maintenance & Sérénité',
          desc: 'Hébergement haute disponibilité, sauvegardes hebdomadaires et support dédié.',
          longDesc: 'Déléguez la partie technique pour vous concentrer sur vos ventes. Nous veillons sur la vitesse et la sécurité de votre site.',
          features: ['Hébergement Cloud haute performance', 'Sauvegardes automatiques régulières', 'Mises à jour de sécurité', 'Support technique prioritaire', 'Modifications mineures incluses'],
          price: '15 000 FCFA / mois (~ $25/m)',
          delay: 'En continu'
        }
      ]
    }
  },

  en: {
    nav: { home: 'Home', services: 'Services', policy: 'Commitments', about: 'About' },
    home: {
      slogan: 'High-Performance Web Solutions.|Telegram Mini Apps & Stores.|Brand Design & Identity.|Speed and Excellence.',
      desc: 'Tailored websites and Telegram applications engineered to scale your business across Africa and worldwide.',
      cta: 'Explore our services',
      chips: ['⚡ High Speed', '📱 100% Mobile', '💸 MoMo & OM Ready', '💎 Pro Quality'],
      stats: ['Delivered Projects', 'Customer Satisfaction', '% Uptime']
    },
    services: {
      title: 'Our Services & Pricing',
      subtitle: 'Clear packages with tangible deliverables and zero hidden fees',
      detailBtn: 'View details & order →',
      timeLabel: 'Estimated timeline',
      priceLabel: 'Indicative pricing',
      note: '* Accurate personalized quote provided within 24h',
      orderBtn: '📝 Order this service'
    },
    policy: {
      title: 'Our Commitments & Workflow',
      date: 'Updated: August 2026',
      sections: [
        { title: '1. Scoping & Free Quote', text: 'Every project starts with a clear assessment of your goals. A comprehensive quote is delivered within 24h.' },
        { title: '2. Deposit & Milestone Payments', text: '40% deposit to initiate development. Balance is paid upon final delivery and client approval. Payments: MTN MoMo, Orange Money, bank wire or crypto.' },
        { title: '3. Punctual Delivery', text: 'We commit to realistic deadlines (5 to 14 days). Regular progress checkpoints are shared on WhatsApp or Telegram.' },
        { title: '4. Warranty & Adjustments Included', text: 'All packages include a 14-day warranty period for post-launch minor adjustments.' },
        { title: '5. 100% IP Ownership', text: 'Upon final settlement, you own 100% of your source code, domains, and graphic assets.' },
        { title: '6. Confidentiality', text: 'Your business details and assets remain strictly confidential.' }
      ]
    },
    about: {
      title: 'About Us',
      subtitle: 'Who are we?',
      intro: '<strong>Evodevs Team</strong> is a collective of specialized engineers and designers building modern digital tools for ambitious businesses and entrepreneurs.',
      valuesTitle: '💎 Core Pillars',
      values: [
        { icon: '⚡', name: 'Performance', desc: 'Ultra-fast loading even on slow 3G networks' },
        { icon: '📱', name: 'Mobile-First', desc: 'Seamless experience on all smartphones' },
        { icon: '🤝', name: 'Direct Support', desc: 'Fast human chat via WhatsApp' },
        { icon: '🛡️', name: 'Reliability', desc: 'Clean, secure, and maintainable codebase' }
      ],
      skillsTitle: '🛠 Technologies',
      ctaText: '💬 Ready to launch your project? Order online in a few clicks.',
      ctaBtn: 'View services'
    },
    order: {
      title: '📝 Project Request',
      nameLabel: 'Your Name or Company *',
      namePlaceholder: 'e.g. Paul Martin / TechCorp',
      nameErr: 'Please fill in this field',
      contactLabel: 'WhatsApp / Phone Number *',
      contactPlaceholder: 'e.g. +237 6XX XX XX XX',
      contactErr: 'Please provide your contact info',
      budgetLabel: 'Estimated Budget',
      budgetOptions: ['Select a range', '$150 - $350', '$350 - $650', '$650 - $1,200', '+ $1,200'],
      descLabel: 'Project Description',
      descPlaceholder: 'Describe your key requirements, timelines...',
      urgentLabel: '⚡ Urgent project (priority turnaround)',
      termsLabel: 'I accept the <a href="#" onclick="event.preventDefault();closeModal(\'orderModal\');navigate(\'policy\')" style="color:var(--accent-light);text-decoration:underline;">terms of service</a> *',
      submitBtn: 'Submit Request',
      sending: 'Submitting...',
      successTitle: 'Request Received!',
      successMsg: 'Thank you <strong>{name}</strong>! Your inquiry for <strong>{service}</strong> has been logged. Our team will contact you within 2 hours.',
      close: 'Close',
      errorAlert: 'Submission failed. Please check your network or message us directly on WhatsApp.',
      retry: 'Retry'
    },
    data: {
      services: [
        {
          id: 'web',
          icon: '🌐',
          name: 'Essential Showcase Site',
          desc: '1-3 responsive pages, direct WhatsApp, 1 year domain & hosting included.',
          longDesc: 'Perfect for local merchants and professionals needing a sleek, credible web presence.',
          features: ['1-3 custom responsive pages', 'Direct WhatsApp & click-to-call', '1 year hosting & domain included', 'Optimized for slow connections', '14-day warranty included'],
          price: '$195 (~ 120 000 FCFA)',
          delay: '4-7 days'
        },
        {
          id: 'ecommerce',
          icon: '🚀',
          name: 'Pro Business Site & Catalog',
          desc: 'Multi-page website, dynamic catalog, custom inquiry forms, and local SEO.',
          longDesc: 'For structured businesses looking to showcase a full catalog of products or services.',
          features: ['Up to 6 custom pages', 'Dynamic product/service catalog', 'Local SEO & Google Business setup', 'Tailored UI & micro-interactions', 'Handover training walkthrough'],
          price: '$410 – $650 (~ 250k – 400k FCFA)',
          delay: '7-14 days'
        },
        {
          id: 'telegram_app',
          icon: '🛍️',
          name: 'Telegram Mini App E-Commerce',
          desc: 'Full store inside Telegram: in-app cart, catalog, and real-time order alerts.',
          longDesc: 'Sell directly to your Telegram community with an instant, frictionless checkout experience.',
          features: ['Native Telegram WebApp interface', 'Interactive shopping cart', 'Instant order routing to seller', 'Easy catalog updates', 'Automated alerts'],
          price: '$570 – $1,050 (~ 350k – 650k FCFA)',
          delay: '7-12 days'
        },
        {
          id: 'design',
          icon: '🎨',
          name: 'Visual Identity & Logo',
          desc: 'Vector logo design, complete brand guidelines, and social media assets.',
          longDesc: 'Build a distinctive, memorable brand identity that instills confidence in your audience.',
          features: ['3 original logo concepts', 'Vector master files (SVG, PNG, PDF)', 'Color palette & typography guide', 'Social media headers', 'Revisions included'],
          price: '$100 – $200 (~ 60k – 120k FCFA)',
          delay: '3-5 days'
        },
        {
          id: 'bot',
          icon: '🤖',
          name: 'Telegram Bot & Automation',
          desc: 'Custom bots for automated FAQs, lead capture, and instant notifications.',
          longDesc: 'Streamline your customer interactions and save hours with a dedicated automated assistant.',
          features: ['Custom commands & menus', 'Real-time admin push alerts', 'Secure cloud hosting', 'Bilingual support ready', 'Handover & maintenance'],
          price: '$165 – $360 (~ 100k – 220k FCFA)',
          delay: '3-6 days'
        },
        {
          id: 'maintenance',
          icon: '🛡️',
          name: 'Maintenance & Peace of Mind',
          desc: 'High-speed cloud hosting, weekly backups, and dedicated priority support.',
          longDesc: 'Focus on growing your revenue while our team maintains security, uptime, and updates.',
          features: ['High-availability cloud hosting', 'Automated regular backups', 'Security monitoring & patching', 'Priority technical support', 'Minor monthly updates included'],
          price: '$25 / month (or $200 / year)',
          delay: 'Continuous'
        }
      ]
    }
  }
};

// ---- State ----
let currentLang = localStorage.getItem('evobot_lang') || 'fr';
let currentPage = 'home';
let selectedService = null;
let typewriterInterval = null;

function setLanguage(lang) {
  if (!i18n[lang]) return;
  haptic('selection');
  currentLang = lang;
  localStorage.setItem('evobot_lang', lang);
  document.documentElement.lang = lang;
  updateNavTranslations();
  navigate(currentPage, true);
}

function t(path) {
  return path.split('.').reduce((obj, key) => (obj && obj[key] !== undefined) ? obj[key] : null, i18n[currentLang]);
}

function updateNavTranslations() {
  const navTexts = i18n[currentLang].nav;
  const homeBtn = document.querySelector('#nav-home span');
  const servicesBtn = document.querySelector('#nav-services span');
  const policyBtn = document.querySelector('#nav-policy span');
  const aboutBtn = document.querySelector('#nav-about span');
  if (homeBtn) homeBtn.textContent = navTexts.home;
  if (servicesBtn) servicesBtn.textContent = navTexts.services;
  if (policyBtn) policyBtn.textContent = navTexts.policy;
  if (aboutBtn) aboutBtn.textContent = navTexts.about;

  const langText = document.getElementById('lang-text');
  if (langText) langText.textContent = currentLang === 'fr' ? 'EN' : 'FR';
}

// ---- Router ----
function navigate(page, skipScroll = false) {
  currentPage = page;
  const appEl = document.getElementById('app');

  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  if (tg && tg.BackButton) {
    if (page === 'home') {
      tg.BackButton.hide();
    } else {
      tg.BackButton.show();
      tg.BackButton.onClick(() => navigate('home'));
    }
  }

  switch (page) {
    case 'home':
      appEl.innerHTML = renderHome();
      break;
    case 'services':
      appEl.innerHTML = renderServices();
      break;
    case 'policy':
      appEl.innerHTML = renderPolicy();
      break;
    case 'about':
      appEl.innerHTML = renderAbout();
      break;
  }

  if (!skipScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  if (page === 'home') {
    startTypewriter();
    animateCounters();
  }
}

// Nav clicks
document.querySelectorAll('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    haptic('light');
    navigate(btn.dataset.page);
  });
});

// ---- Views ----
function renderHome() {
  const h = t('home');
  const chipsHtml = h.chips.map((chip) => `<span class="chip">${chip}</span>`).join('');

  return `
    <div class="page active" id="page-home">
      <div class="hero">
        <div class="hero-logo-wrap">
          <img src="logo.svg" alt="Evodevs Team" class="hero-logo" />
        </div>
        <h1 class="hero-title">Evo<span>devs</span> Team</h1>
        <p class="hero-slogan" id="typewriter"><span class="cursor"></span></p>
        <p class="hero-desc">${h.desc}</p>
        <div class="hero-actions-row">
          <button class="btn-cta" onclick="haptic('impact');navigate('services')">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            ${h.cta}
          </button>
        </div>
      </div>

      <div class="chips-row">
        ${chipsHtml}
      </div>

      <div class="stats-grid">
        <div class="stat-card glass">
          <div class="stat-number" data-count="35">0</div>
          <div class="stat-label">${h.stats[0]}</div>
        </div>
        <div class="stat-card glass">
          <div class="stat-number" data-count="99">0</div>
          <div class="stat-label">${h.stats[1]} %</div>
        </div>
        <div class="stat-card glass">
          <div class="stat-number" data-count="100">0</div>
          <div class="stat-label">${h.stats[2]}</div>
        </div>
      </div>
    </div>`;
}

function renderServices() {
  const svcs = t('data.services');
  const txt = t('services');

  const cards = svcs.map((s, i) => `
    <div class="service-card glass-card" onclick="openServiceDetail('${s.id}')">
      <div class="service-header">
        <div class="service-icon">${s.icon}</div>
        <span class="service-tag">${s.delay}</span>
      </div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
      <div class="service-price">${s.price}</div>
      <button class="btn-detail">${txt.detailBtn}</button>
    </div>
  `).join('');

  return `
    <div class="page active" id="page-services">
      <div class="page-header">
        <h2>${txt.title}</h2>
        <p>${txt.subtitle}</p>
      </div>
      <div class="services-grid">${cards}</div>
    </div>`;
}

function renderPolicy() {
  const p = t('policy');
  const sectionsHtml = p.sections.map((s) => `
    <div class="policy-section glass">
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </div>
  `).join('');

  return `
    <div class="page active" id="page-policy">
      <div class="policy-container">
        <div class="page-header">
          <h2>${p.title}</h2>
          <p class="policy-date">${p.date}</p>
        </div>
        ${sectionsHtml}
      </div>
    </div>`;
}

function renderAbout() {
  const a = t('about');
  const valuesHtml = a.values.map((v) => `
    <div class="value-card glass-card">
      <div class="value-icon">${v.icon}</div>
      <div class="value-name">${v.name}</div>
      <div class="value-desc">${v.desc}</div>
    </div>
  `).join('');

  return `
    <div class="page active" id="page-about">
      <div class="about-container">
        <div class="page-header">
          <h2>${a.title}</h2>
          <p>${a.subtitle}</p>
        </div>

        <div class="about-intro glass">
          <p>${a.intro}</p>
        </div>

        <h3 class="section-subtitle">${a.valuesTitle}</h3>
        <div class="values-grid">${valuesHtml}</div>

        <div class="about-cta glass">
          <p>${a.ctaText}</p>
          <button class="btn-cta" onclick="haptic('impact');navigate('services')">${a.ctaBtn} →</button>
        </div>
      </div>
    </div>`;
}

// ---- Modals & Orders ----
function openServiceDetail(serviceId) {
  haptic('selection');
  const svcs = t('data.services');
  const s = svcs.find((item) => item.id === serviceId);
  if (!s) return;
  selectedService = s;

  const txt = t('services');
  const featuresHtml = s.features.map((f) => `<li>✓ ${f}</li>`).join('');

  const modalBody = document.getElementById('serviceModalBody');
  modalBody.innerHTML = `
    <div class="modal-header">
      <div class="modal-icon">${s.icon}</div>
      <h3>${s.name}</h3>
      <div class="modal-price">${s.price}</div>
      <div class="modal-delay">⏱ ${txt.timeLabel} : <strong>${s.delay}</strong></div>
    </div>
    <div class="modal-desc"><p>${s.longDesc}</p></div>
    <ul class="modal-features">${featuresHtml}</ul>
    <button class="btn-order-modal" onclick="openOrderModal('${s.id}')">
      ${txt.orderBtn}
    </button>
  `;

  openModal('serviceModal');
}

function openOrderModal(serviceId) {
  haptic('selection');
  closeModal('serviceModal');
  const svcs = t('data.services');
  const s = svcs.find((item) => item.id === serviceId) || svcs[0];
  selectedService = s;

  const o = t('order');
  const budgetOptionsHtml = o.budgetOptions.map((opt) => `<option value="${opt}">${opt}</option>`).join('');

  const modalBody = document.getElementById('orderModalBody');
  modalBody.innerHTML = `
    <div class="modal-header">
      <h3>${o.title} — ${s.name}</h3>
    </div>
    <form id="orderForm" onsubmit="submitOrder(event)">
      <div class="form-field">
        <label>${o.nameLabel}</label>
        <input type="text" id="order-name" placeholder="${o.namePlaceholder}" required />
      </div>
      <div class="form-field">
        <label>${o.contactLabel}</label>
        <input type="text" id="order-contact" placeholder="${o.contactPlaceholder}" required />
      </div>
      <div class="form-field">
        <label>${o.budgetLabel}</label>
        <select id="order-budget">${budgetOptionsHtml}</select>
      </div>
      <div class="form-field">
        <label>${o.descLabel}</label>
        <textarea id="order-desc" rows="3" placeholder="${o.descPlaceholder}"></textarea>
      </div>
      <div class="form-check">
        <label>
          <input type="checkbox" id="order-urgent" />
          <span>${o.urgentLabel}</span>
        </label>
      </div>
      <button type="submit" id="btn-submit-order" class="btn-submit-order">
        ${o.submitBtn}
      </button>
    </form>
  `;

  openModal('orderModal');
}

function openModal(id) {
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
}

function closeModal(id) {
  haptic('light');
  const modal = document.getElementById(id);
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

async function submitOrder(e) {
  e.preventDefault();
  haptic('impact');

  const name = document.getElementById('order-name').value.trim();
  const contact = document.getElementById('order-contact').value.trim();
  const budget = document.getElementById('order-budget').value;
  const description = document.getElementById('order-desc').value.trim();
  const urgent = document.getElementById('order-urgent').checked;

  const o = t('order');
  const submitBtn = document.getElementById('btn-submit-order');
  submitBtn.disabled = true;
  submitBtn.textContent = o.sending;

  const payload = {
    name,
    email: contact,
    service: selectedService?.name || 'Prestation Web',
    budget,
    description,
    urgent
  };

  try {
    const res = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (!data.ok && !data.note) {
      throw new Error(data.error || 'Erreur API');
    }

    haptic('success');
    const modalBody = document.getElementById('orderModalBody');
    modalBody.innerHTML = `
      <div class="order-success">
        <div class="success-icon">✅</div>
        <h3>${o.successTitle}</h3>
        <p>${o.successMsg.replace('{name}', name).replace('{service}', selectedService?.name || '')}</p>
        <button class="btn-cta" onclick="closeModal('orderModal')">${o.close}</button>
      </div>
    `;
  } catch (err) {
    console.error('Submit error:', err);
    haptic('error');
    alert(o.errorAlert);
    submitBtn.disabled = false;
    submitBtn.textContent = o.submitBtn;
  }
}

// ---- Typewriter Animation ----
function startTypewriter() {
  if (typewriterInterval) clearInterval(typewriterInterval);
  const el = document.getElementById('typewriter');
  if (!el) return;

  const slogans = (t('home.slogan') || '').split('|');
  let sIndex = 0;
  let cIndex = 0;
  let isDeleting = false;

  typewriterInterval = setInterval(() => {
    const current = slogans[sIndex];
    if (!current) return;

    if (!isDeleting) {
      el.innerHTML = current.substring(0, cIndex + 1) + '<span class="cursor"></span>';
      cIndex++;
      if (cIndex === current.length) {
        isDeleting = true;
        clearInterval(typewriterInterval);
        setTimeout(startTypewriter, 1800);
      }
    } else {
      el.innerHTML = current.substring(0, cIndex - 1) + '<span class="cursor"></span>';
      cIndex--;
      if (cIndex === 0) {
        isDeleting = false;
        sIndex = (sIndex + 1) % slogans.length;
      }
    }
  }, isDeleting ? 30 : 60);
}

// ---- Counter Animation ----
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach((el) => {
    const target = parseInt(el.dataset.count, 10) || 0;
    let current = 0;
    const step = Math.max(1, Math.floor(target / 25));
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = current;
      }
    }, 30);
  });
}

// ---- Init ----
document.addEventListener('DOMContentLoaded', () => {
  updateNavTranslations();
  navigate(currentPage);
});
