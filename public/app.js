/* ========================================
   ANONYMOUS EVODEVS SHOP — MINI APP SPA
   ======================================== */

// ---- Telegram WebApp SDK ----
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const i18n = {
  en: {
    nav: { home: 'Home', services: 'Services', policy: 'Policy', about: 'About' },
    home: {
      slogan: 'Your project. Our discretion.|No limits. No trace.|Anonymous digital solutions.|Trust and confidentiality.',
      desc: 'Premium digital solutions.<br>Trust, discretion, and anonymity guaranteed.',
      cta: 'Discover our services',
      chips: ['🔒 Anonymity', '🤫 Discretion', '⚡ Fast', '💎 Premium'],
      stats: ['Projects delivered', 'Satisfied clients', '% Discretion']
    },
    services: {
      title: 'Our Services',
      subtitle: 'Custom digital solutions — legal or unconventional',
      detailBtn: 'View details →',
      timeLabel: 'Estimated time',
      priceLabel: 'Price',
      note: '* Prices may vary depending on project complexity',
      orderBtn: '📩 Order this service'
    },
    policy: {
      title: 'Policy & Terms',
      date: 'Last updated: May 2026',
      sections: [
        { title: '1. Order Process', text: 'All orders are initiated directly via this app. A detailed quote is provided within 24h. The project starts after validation and a deposit (50%). All communications remain in the app.' },
        { title: '2. Delivery Times', text: 'Indicated times are estimates. A precise schedule is defined upon validation. Any delay is communicated in advance via the app.' },
        { title: '3. Payment', text: 'Payment in two installments: 50% on order, 50% on delivery. Accepted methods: cryptocurrencies, bank transfer, and other discrete methods.' },
        { title: '4. Revisions & Modifications', text: 'Two revision cycles are included in the base rate. Any additional modification will be subject to an additional quote.' },
        { title: '5. Intellectual Property', text: 'The source code and deliverables are the client\'s property after full payment. Our internal tools and libraries remain ours.' },
        { title: '6. Confidentiality & Anonymity', text: 'Confidentiality is our absolute priority. No personal data is kept beyond the project. We share no information with third parties. No logs, no trace. Your project stays between us.' },
        { title: '7. Non-Disclosure Policy', text: 'We apply a strict non-disclosure protocol on every project. No client reference is published without explicit agreement. Discretion is total and non-negotiable.' }
      ]
    },
    about: {
      title: 'About',
      subtitle: 'Who are we?',
      intro: '<strong>Anonymous EvoDevs Shop</strong> is a collective of developers and designers operating in the shadows. We provide all types of digital solutions — legal or unconventional — with trust and discretion. No questions, no traces, only results.',
      valuesTitle: '💎 Our Values',
      values: [
        { icon: '🔒', name: 'Anonymity', desc: 'Your identity stays protected' },
        { icon: '🤫', name: 'Discretion', desc: 'No traces, no logs' },
        { icon: '⚡', name: 'Efficiency', desc: 'Fast and reliable delivery' },
        { icon: '💎', name: 'Quality', desc: 'Premium solutions guaranteed' }
      ],
      skillsTitle: '🛠 Our Skills',
      ctaText: '💬 For any request, please use the order form directly in the <strong>Services</strong> tab.',
      ctaBtn: 'View our services'
    },
    order: {
      title: '📩 Order',
      nameLabel: 'Your alias / nickname *',
      namePlaceholder: 'Nickname or alias',
      nameErr: 'This field is required',
      contactLabel: 'Secure contact (optional)',
      contactPlaceholder: 'Telegram, Session, Signal...',
      budgetLabel: 'Estimated budget',
      budgetOptions: ['Select a budget', 'Less than 1 000 €', '1 000 - 3 000 €', '3 000 - 5 000 €', 'More than 5 000 €'],
      descLabel: 'Project description',
      descPlaceholder: 'Describe your project in a few lines... All info remains confidential.',
      urgentLabel: '⚡ Urgent project (extra fee possible)',
      termsLabel: 'I accept the <a href="#" onclick="event.preventDefault();closeModal(\'orderModal\');navigate(\'policy\')" style="color:var(--silver-300);text-decoration:underline;">terms and conditions</a> *',
      submitBtn: 'Send order',
      sending: 'Sending...',
      successTitle: 'Order sent!',
      successMsg: 'Thank you {name}! Your request for <strong>{service}</strong> has been received. We will contact you within 24h via your secure channel.',
      close: 'Close',
      errorAlert: 'Error sending. Please try again.',
      retry: 'Retry'
    },
    data: {
      services: [
        {
          id: 'web', icon: '🌐', name: 'Showcase Website',
          desc: 'Discrete, responsive, and optimized online presence.',
          longDesc: 'We design elegant and performant showcase websites, adapted for all screens. Anonymity and discretion guaranteed for your project.',
          features: ['Mobile-first responsive design', 'Advanced SEO optimization', 'Animations & micro-interactions', 'Secure hosting & deployment', '3 months maintenance included'],
          price: '600 €', delay: '5-7 days'
        },
        {
          id: 'ecommerce', icon: '🛒', name: 'E-commerce Website',
          desc: 'Complete online store with payment and stock management.',
          longDesc: 'Turnkey e-commerce solution with product catalog, cart, multiple payment systems, and real-time order management.',
          features: ['Unlimited product catalog', 'Integrated multiple payments', 'Stock management', 'Administrator dashboard', 'Usage training'],
          price: '1 400 €', delay: '10-15 days'
        },
        {
          id: 'mobile', icon: '📱', name: 'Mobile Application',
          desc: 'Native and cross-platform iOS & Android apps.',
          longDesc: 'Development of performant mobile apps, published on stores or distributed privately according to your needs.',
          features: ['Cross-platform iOS & Android', 'Premium UI/UX', 'Push notifications', 'Backend API included', 'Flexible distribution'],
          price: '3 000 €', delay: '15-30 days'
        },
        {
          id: 'bot', icon: '🤖', name: 'Telegram Bot',
          desc: 'Custom bots and Telegram Mini Apps.',
          longDesc: 'Creation of smart Telegram bots with custom commands, integrated Mini Apps, and advanced automations.',
          features: ['Custom commands', 'Integrated Mini App', 'Database', 'Integrated payments', 'Cloud deployment'],
          price: '300 €', delay: '3-5 days'
        },
        {
          id: 'design', icon: '🎨', name: 'Design & Identity',
          desc: 'Logos, brand guidelines, and UI/UX mockups.',
          longDesc: 'Creation of unique and memorable visual identities. From logo to full brand guidelines, including interface mockups.',
          features: ['3 logo proposals', 'Full brand guidelines', 'HD & vector files', 'Figma UI/UX mockups', 'Style guide'],
          price: '100 €', delay: '3-5 days'
        },
        {
          id: 'custom', icon: '🔧', name: 'Custom Solution',
          desc: 'Any type of digital solution, without limits.',
          longDesc: 'Do you have a specific need? We develop any custom digital solution, in complete discretion and confidentiality. No questions asked.',
          features: ['Needs analysis', '100% custom development', 'Total confidentiality', 'No trace', 'Dedicated and anonymous support'],
          price: 'On quote', delay: 'Variable'
        }
      ]
    }
  },
  fr: {
    nav: { home: 'Accueil', services: 'Services', policy: 'Politique', about: 'À propos' },
    home: {
      slogan: 'Votre projet. Notre discrétion.|Aucune limite. Aucune trace.|Solutions digitales anonymes.|Confiance et confidentialité.',
      desc: 'Solutions digitales premium.<br>Confiance, discrétion et anonymat garantis.',
      cta: 'Découvrir nos services',
      chips: ['🔒 Anonymat', '🤫 Discrétion', '⚡ Rapide', '💎 Premium'],
      stats: ['Projets livrés', 'Clients satisfaits', '% Discrétion']
    },
    services: {
      title: 'Nos Services',
      subtitle: 'Solutions digitales sur mesure — légales ou non conventionnelles',
      detailBtn: 'Voir détails →',
      timeLabel: 'Délai estimé',
      priceLabel: 'Tarif',
      note: '* Les tarifs peuvent varier selon la complexité du projet',
      orderBtn: '📩 Commander ce service'
    },
    policy: {
      title: 'Politique & Conditions',
      date: 'Dernière mise à jour : Mai 2026',
      sections: [
        { title: '1. Processus de commande', text: 'Toute commande est initiée directement via cette application. Un devis détaillé vous est fourni sous 24h. Le projet démarre après validation et versement de l\'acompte (50%). Toutes les communications restent dans l\'application.' },
        { title: '2. Délais de livraison', text: 'Les délais indiqués sont estimatifs. Un calendrier précis est défini lors de la validation. Tout retard est communiqué en amont via l\'application.' },
        { title: '3. Paiement', text: 'Paiement en deux fois : 50% à la commande, 50% à la livraison. Modes de paiement acceptés : crypto-monnaies, virement bancaire, et autres méthodes discrètes à convenir.' },
        { title: '4. Révisions & modifications', text: 'Deux cycles de révisions sont inclus dans le tarif de base. Toute modification supplémentaire fera l\'objet d\'un devis complémentaire.' },
        { title: '5. Propriété intellectuelle', text: 'Le code source et les livrables sont la propriété du client après paiement intégral. Nos outils et bibliothèques internes restent notre propriété.' },
        { title: '6. Confidentialité & Anonymat', text: 'La confidentialité est notre priorité absolue. Aucune donnée personnelle n\'est conservée au-delà du projet. Nous ne partageons aucune information avec des tiers. Aucun journal, aucune trace. Votre projet reste entre vous et nous.' },
        { title: '7. Politique de non-divulgation', text: 'Nous appliquons un strict protocole de non-divulgation sur chaque projet. Aucune référence client n\'est publiée sans accord explicite. La discrétion est totale et non négociable.' }
      ]
    },
    about: {
      title: 'À propos',
      subtitle: 'Qui sommes-nous ?',
      intro: '<strong>Anonymous EvoDevs Shop</strong> est un collectif de développeurs et designers opérant dans l\'ombre. Nous fournissons tout type de solutions digitales — légales ou non conventionnelles — en toute confiance et discrétion. Pas de questions, pas de traces, que des résultats.',
      valuesTitle: '💎 Nos Valeurs',
      values: [
        { icon: '🔒', name: 'Anonymat', desc: 'Votre identité reste protégée' },
        { icon: '🤫', name: 'Discrétion', desc: 'Aucune trace, aucun journal' },
        { icon: '⚡', name: 'Efficacité', desc: 'Livraison rapide et fiable' },
        { icon: '💎', name: 'Qualité', desc: 'Solutions premium garanties' }
      ],
      skillsTitle: '🛠 Nos Compétences',
      ctaText: '💬 Pour toute demande, utilisez directement le formulaire de commande dans l\'onglet <strong>Services</strong>.',
      ctaBtn: 'Voir nos services'
    },
    order: {
      title: '📩 Commander',
      nameLabel: 'Votre pseudo / alias *',
      namePlaceholder: 'Pseudonyme ou alias',
      nameErr: 'Ce champ est requis',
      contactLabel: 'Contact sécurisé (optionnel)',
      contactPlaceholder: 'Telegram, Session, Signal...',
      budgetLabel: 'Budget estimé',
      budgetOptions: ['Sélectionner un budget', 'Moins de 1 000 €', '1 000 - 3 000 €', '3 000 - 5 000 €', 'Plus de 5 000 €'],
      descLabel: 'Description du projet',
      descPlaceholder: 'Décrivez votre projet en quelques lignes... Toutes les infos restent confidentielles.',
      urgentLabel: '⚡ Projet urgent (supplément possible)',
      termsLabel: 'J\'accepte les <a href="#" onclick="event.preventDefault();closeModal(\'orderModal\');navigate(\'policy\')" style="color:var(--silver-300);text-decoration:underline;">conditions générales</a> *',
      submitBtn: 'Envoyer la commande',
      sending: 'Envoi...',
      successTitle: 'Commande envoyée !',
      successMsg: 'Merci {name} ! Votre demande pour <strong>{service}</strong> a été reçue. Nous vous recontacterons sous 24h via votre canal sécurisé.',
      close: 'Fermer',
      errorAlert: 'Erreur lors de l\'envoi. Veuillez réessayer.',
      retry: 'Réessayer'
    },
    data: {
      services: [
        {
          id: 'web', icon: '🌐', name: 'Site Web Vitrine',
          desc: 'Présence en ligne discrète, responsive et optimisée.',
          longDesc: 'Nous concevons des sites web vitrines élégants et performants, adaptés à tous les écrans. Anonymat et discrétion garantis pour votre projet.',
          features: ['Design responsive mobile-first', 'Optimisation SEO avancée', 'Animations & micro-interactions', 'Hébergement & déploiement sécurisé', 'Maintenance 3 mois incluse'],
          price: '600 €', delay: '5-7 jours'
        },
        {
          id: 'ecommerce', icon: '🛒', name: 'Site E-commerce',
          desc: 'Boutique en ligne complète avec paiement et gestion stocks.',
          longDesc: 'Solution e-commerce clé en main avec catalogue produits, panier, systèmes de paiement multiples et gestion des commandes en temps réel.',
          features: ['Catalogue produits illimité', 'Paiements multiples intégrés', 'Gestion des stocks', 'Dashboard administrateur', 'Formation à l\'utilisation'],
          price: '1 400 €', delay: '10-15 jours'
        },
        {
          id: 'mobile', icon: '📱', name: 'Application Mobile',
          desc: 'Apps natives et cross-platform iOS & Android.',
          longDesc: 'Développement d\'applications mobiles performantes, publiées sur les stores ou distribuées en privé selon vos besoins.',
          features: ['Cross-platform iOS & Android', 'UI/UX premium', 'Notifications push', 'API backend incluse', 'Distribution flexible'],
          price: '3 000 €', delay: '15-30 jours'
        },
        {
          id: 'bot', icon: '🤖', name: 'Bot Telegram',
          desc: 'Bots personnalisés et Mini Apps Telegram.',
          longDesc: 'Création de bots Telegram intelligents avec commandes personnalisées, Mini Apps intégrées, et automatisations avancées.',
          features: ['Commandes personnalisées', 'Mini App intégrée', 'Base de données', 'Paiements intégrés', 'Déploiement cloud'],
          price: '300 €', delay: '3-5 jours'
        },
        {
          id: 'design', icon: '🎨', name: 'Design & Identité',
          desc: 'Logos, chartes graphiques et maquettes UI/UX.',
          longDesc: 'Création d\'identités visuelles uniques et mémorables. Du logo à la charte graphique complète, en passant par les maquettes d\'interfaces.',
          features: ['3 propositions de logo', 'Charte graphique complète', 'Fichiers HD & vectoriels', 'Maquettes UI/UX Figma', 'Guide de style'],
          price: '100 €', delay: '3-5 jours'
        },
        {
          id: 'custom', icon: '🔧', name: 'Solution Sur Mesure',
          desc: 'Tout type de solution digitale, sans limites.',
          longDesc: 'Vous avez un besoin spécifique ? Nous développons toute solution digitale sur mesure, en toute discrétion et confidentialité. Aucune question posée.',
          features: ['Analyse de votre besoin', 'Développement 100% sur mesure', 'Confidentialité totale', 'Aucune trace', 'Support dédié et anonyme'],
          price: 'Sur devis', delay: 'Variable'
        }
      ]
    }
  }
};

// ---- State ----
let currentLang = localStorage.getItem('evobot_lang') || 'en';
let currentPage = 'home';
let isDeletingTypewriter = false; // Add state to manage typewriter correctly on re-render

function setLanguage(lang) {
  if (!i18n[lang]) return;
  currentLang = lang;
  localStorage.setItem('evobot_lang', lang);
  document.documentElement.lang = lang;
  updateNavTranslations();
  navigate(currentPage, true);
}

function t(path) {
  return path.split('.').reduce((obj, key) => (obj && obj[key] !== 'undefined') ? obj[key] : null, i18n[currentLang]);
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
  if (langText) langText.textContent = currentLang === 'en' ? 'FR' : 'EN';
}

// ---- Router ----
function navigate(page, skipScroll = false) {
  currentPage = page;
  const appEl = document.getElementById('app');

  // Update nav
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === page);
  });

  // Telegram back button
  if (tg) {
    if (page === 'home') { tg.BackButton.hide(); }
    else { tg.BackButton.show(); tg.BackButton.onClick(() => navigate('home')); }
  }

  // Render page
  switch (page) {
    case 'home': appEl.innerHTML = renderHome(); break;
    case 'services': appEl.innerHTML = renderServices(); break;
    case 'policy': appEl.innerHTML = renderPolicy(); break;
    case 'about': appEl.innerHTML = renderAbout(); break;
  }

  // Post-render hooks
  if (!skipScroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  setupAnimations();
  if (page === 'home') startTypewriter();
  if (page === 'home') animateCounters();
}

// ---- Nav listeners ----
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    if (tg) tg.HapticFeedback?.impactOccurred('light');
    navigate(btn.dataset.page);
  });
});

// ---- Pages ----
function renderHome() {
  const h = t('home');
  const chips = h.chips.map(chip => `<span class="chip">${chip}</span>`).join('');
  return `
    <div class="page active" id="page-home">
      <div class="hero">
        <img src="logo.svg" alt="Anonymous EvoDevs Shop" class="hero-logo animate-in">
        <h1 class="hero-title animate-in">Anonymous EvoDevs Shop</h1>
        <p class="hero-slogan animate-in" id="typewriter"><span class="cursor"></span></p>
        <p class="hero-desc animate-in">${h.desc}</p>
        <button class="btn-cta animate-in" onclick="navigate('services')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          ${h.cta}
        </button>
      </div>

      <div class="chips-row animate-in">
        ${chips}
      </div>

      <div class="stats-grid stagger">
        <div class="stat-card glass animate-in">
          <div class="stat-number" data-count="50">0</div>
          <div class="stat-label">${h.stats[0]}</div>
        </div>
        <div class="stat-card glass animate-in">
          <div class="stat-number" data-count="30">0</div>
          <div class="stat-label">${h.stats[1]}</div>
        </div>
        <div class="stat-card glass animate-in">
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
    <div class="service-card glass-card animate-in" onclick="openServiceDetail('${s.id}')" style="transition-delay:${i * 0.06}s">
      <div class="service-icon">${s.icon}</div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
      <div class="service-delay">⏱ ${s.delay}</div>
      <div class="service-price">${s.price}</div>
      <button class="btn-detail">${txt.detailBtn}</button>
    </div>`).join('');

  return `
    <div class="page active" id="page-services">
      <div class="page-header animate-in">
        <h2>${txt.title}</h2>
        <p>${txt.subtitle}</p>
      </div>
      <div class="services-grid stagger">${cards}</div>
    </div>`;
}

function renderPolicy() {
  const p = t('policy');
  const sectionsHtml = p.sections.map(s => `
    <div class="policy-section glass animate-in">
      <h3>${s.title}</h3>
      <p>${s.text}</p>
    </div>
  `).join('');

  return `
    <div class="page active" id="page-policy">
      <div class="policy-container">
        <div class="page-header animate-in">
          <h2>${p.title}</h2>
          <p class="policy-date">${p.date}</p>
        </div>
        ${sectionsHtml}
      </div>
    </div>`;
}

function renderAbout() {
  const a = t('about');
  const valuesHtml = a.values.map(v => `
    <div class="value-card glass-card animate-in">
      <div class="value-icon">${v.icon}</div>
      <div class="value-name">${v.name}</div>
      <div class="value-desc">${v.desc}</div>
    </div>
  `).join('');

  return `
    <div class="page active" id="page-about">
      <div class="page-header animate-in">
        <h2>${a.title}</h2>
        <p>${a.subtitle}</p>
      </div>

      <div class="about-intro glass animate-in">
        <p>${a.intro}</p>
      </div>

      <h3 class="section-title animate-in">${a.valuesTitle}</h3>
      <div class="values-grid stagger">
        ${valuesHtml}
      </div>

      <h3 class="section-title animate-in">${a.skillsTitle}</h3>
      <div class="tech-stack stagger">
        <span class="tech-badge glass animate-in">⚛️ React</span>
        <span class="tech-badge glass animate-in">🟢 Node.js</span>
        <span class="tech-badge glass animate-in">🐍 Python</span>
        <span class="tech-badge glass animate-in">📱 Flutter</span>
        <span class="tech-badge glass animate-in">🎨 Figma</span>
        <span class="tech-badge glass animate-in">🤖 Bots</span>
        <span class="tech-badge glass animate-in">🗄 Databases</span>
        <span class="tech-badge glass animate-in">☁️ Cloud</span>
      </div>

      <div class="about-cta glass animate-in">
        <p class="about-cta-text">${a.ctaText}</p>
        <button class="btn-cta" onclick="navigate('services')" style="margin-top:12px;">
          ${a.ctaBtn}
        </button>
      </div>
    </div>`;
}

// ---- Service Detail Modal ----
function openServiceDetail(id) {
  const svcs = t('data.services');
  const txt = t('services');
  const s = svcs.find(x => x.id === id);
  if (!s) return;
  if (tg) tg.HapticFeedback?.impactOccurred('medium');

  const featuresHtml = s.features.map(f => `<li>${f}</li>`).join('');
  document.getElementById('serviceModalBody').innerHTML = `
    <div class="modal-header">
      <span class="modal-icon">${s.icon}</span>
      <div><h3>${s.name}</h3></div>
    </div>
    <p class="modal-long-desc">${s.longDesc}</p>
    <ul class="features-list">${featuresHtml}</ul>
    <div class="detail-info-row glass">
      <div><span class="detail-info-label">${txt.priceLabel}</span></div>
      <div><span class="detail-info-value">${s.price}</span></div>
    </div>
    <div class="detail-info-row glass">
      <div><span class="detail-info-label">${txt.timeLabel}</span></div>
      <div><span class="detail-info-value">${s.delay}</span></div>
    </div>
    <p class="detail-note">${txt.note}</p>
    <button class="btn-order" onclick="openOrderForm('${s.id}')">
      ${txt.orderBtn}
    </button>`;

  showModal('serviceModal');
}

// ---- Order Form Modal ----
function openOrderForm(serviceId) {
  const svcs = t('data.services');
  const txt = t('order');
  const s = svcs.find(x => x.id === serviceId);
  closeModal('serviceModal');
  setTimeout(() => {
    document.getElementById('orderModalBody').innerHTML = `
      <h3 style="font-size:18px;font-weight:700;color:var(--silver-100);margin-bottom:4px;">${txt.title}</h3>
      <p style="font-size:13px;color:var(--silver-500);margin-bottom:20px;">${s ? s.name : 'Service'}</p>
      <form id="orderForm" onsubmit="submitOrder(event, '${serviceId}')">
        <div class="form-group">
          <label class="form-label">${txt.nameLabel}</label>
          <input type="text" class="form-input" name="name" placeholder="${txt.namePlaceholder}" required>
          <div class="form-error" id="err-name">${txt.nameErr}</div>
        </div>
        <div class="form-group">
          <label class="form-label">${txt.contactLabel}</label>
          <input type="text" class="form-input" name="email" placeholder="${txt.contactPlaceholder}">
        </div>
        <div class="form-group">
          <label class="form-label">${txt.budgetLabel}</label>
          <select class="form-select" name="budget">
            ${txt.budgetOptions.map((opt, i) => `<option value="${i === 0 ? '' : opt}">${opt}</option>`).join('')}
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">${txt.descLabel}</label>
          <textarea class="form-textarea" name="description" placeholder="${txt.descPlaceholder}"></textarea>
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" name="urgent">
            <span class="form-checkbox-label">${txt.urgentLabel}</span>
          </label>
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" name="terms" required>
            <span class="form-checkbox-label">${txt.termsLabel}</span>
          </label>
        </div>
        <button type="submit" class="btn-order" id="submitBtn">
          ${txt.submitBtn}
        </button>
      </form>`;
    showModal('orderModal');
  }, 350);
}

async function submitOrder(e, serviceId) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const txt = t('order');
  
  // Find English base service name for backend consistency
  const enSvcs = i18n.en.data.services;
  const currSvcs = t('data.services');
  const currS = currSvcs.find(x => x.id === serviceId);
  const enS = enSvcs.find(x => x.id === serviceId);

  btn.disabled = true;
  btn.innerHTML = `<div class="spinner" style="width:20px;height:20px;margin:0;border-width:2px;"></div> ${txt.sending}`;

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    service: enS ? enS.name : serviceId, // Send English name to backend
    budget: form.budget.value,
    description: form.description.value.trim(),
    urgent: form.urgent.checked
  };

  try {
    const res = await fetch('/api/send-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await res.json();

    if (result.ok) {
      if (tg) tg.HapticFeedback?.notificationOccurred('success');
      
      const successMsg = txt.successMsg
        .replace('{name}', data.name)
        .replace('{service}', currS ? currS.name : serviceId);

      document.getElementById('orderModalBody').innerHTML = `
        <div class="success-screen">
          <div class="success-icon">✅</div>
          <h3 class="success-title">${txt.successTitle}</h3>
          <p class="success-msg">${successMsg}</p>
          <button class="btn-cta" onclick="closeModal('orderModal')">${txt.close}</button>
        </div>`;
    } else {
      throw new Error(result.error || 'Erreur');
    }
  } catch (err) {
    if (tg) tg.HapticFeedback?.notificationOccurred('error');
    btn.disabled = false;
    btn.textContent = txt.retry;
    alert(txt.errorAlert);
  }
}

// ---- Modal Helpers ----
function showModal(id) {
  const el = document.getElementById(id);
  el.classList.add('show');
  el.addEventListener('click', function handler(e) {
    if (e.target === el) { closeModal(id); el.removeEventListener('click', handler); }
  });
}

function closeModal(id) {
  document.getElementById(id).classList.remove('show');
}

// ---- Typewriter ----
function startTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const h = t('home');
  const phrases = h.slogan.split('|');
  
  if (window._typewriterTimeout) clearTimeout(window._typewriterTimeout);
  
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function tick() {
    // Stop if page changed
    if (currentPage !== 'home' || !document.getElementById('typewriter')) return;
    
    const phrase = phrases[phraseIdx];
    if (!isDeleting) {
      el.innerHTML = phrase.substring(0, charIdx + 1) + '<span class="cursor"></span>';
      charIdx++;
      if (charIdx === phrase.length) {
        isDeleting = true;
        window._typewriterTimeout = setTimeout(tick, 2000);
        return;
      }
      window._typewriterTimeout = setTimeout(tick, 60);
    } else {
      el.innerHTML = phrase.substring(0, charIdx - 1) + '<span class="cursor"></span>';
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        window._typewriterTimeout = setTimeout(tick, 400);
        return;
      }
      window._typewriterTimeout = setTimeout(tick, 30);
    }
  }
  window._typewriterTimeout = setTimeout(tick, 800);
}

// ---- Counter Animation ----
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseInt(el.dataset.count);
    const duration = 1500;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + '+';
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ---- IntersectionObserver Animations ----
function setupAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
}

// ---- Ripple Effect ----
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.btn-cta, .btn-order, .btn-detail, .btn-contact');
  if (!btn) return;
  const ripple = document.createElement('span');
  ripple.className = 'ripple';
  const rect = btn.getBoundingClientRect();
  ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
  ripple.style.left = (e.clientX - rect.left - Math.max(rect.width, rect.height) / 2) + 'px';
  ripple.style.top = (e.clientY - rect.top - Math.max(rect.width, rect.height) / 2) + 'px';
  btn.appendChild(ripple);
  setTimeout(() => ripple.remove(), 600);
});

// ---- Init ----
document.documentElement.lang = currentLang;
updateNavTranslations();
navigate('home');
