/* ========================================
   ANONYMOUS EVODEVS SHOP — MINI APP SPA
   ======================================== */

// ---- Telegram WebApp SDK ----
const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

// ---- Services Data ----
const SERVICES = [
  {
    id: 'web', icon: '🌐', name: 'Site Web Vitrine',
    desc: 'Présence en ligne discrète, responsive et optimisée.',
    longDesc: 'Nous concevons des sites web vitrines élégants et performants, adaptés à tous les écrans. Anonymat et discrétion garantis pour votre projet.',
    features: ['Design responsive mobile-first', 'Optimisation SEO avancée', 'Animations & micro-interactions', 'Hébergement & déploiement sécurisé', 'Maintenance 3 mois incluse'],
    price: '1 200 €', delay: '5-7 jours'
  },
  {
    id: 'ecommerce', icon: '🛒', name: 'Site E-commerce',
    desc: 'Boutique en ligne complète avec paiement et gestion stocks.',
    longDesc: 'Solution e-commerce clé en main avec catalogue produits, panier, systèmes de paiement multiples et gestion des commandes en temps réel.',
    features: ['Catalogue produits illimité', 'Paiements multiples intégrés', 'Gestion des stocks', 'Dashboard administrateur', 'Formation à l\'utilisation'],
    price: '3 500 €', delay: '10-15 jours'
  },
  {
    id: 'mobile', icon: '📱', name: 'Application Mobile',
    desc: 'Apps natives et cross-platform iOS & Android.',
    longDesc: 'Développement d\'applications mobiles performantes, publiées sur les stores ou distribuées en privé selon vos besoins.',
    features: ['Cross-platform iOS & Android', 'UI/UX premium', 'Notifications push', 'API backend incluse', 'Distribution flexible'],
    price: '5 000 €', delay: '15-30 jours'
  },
  {
    id: 'bot', icon: '🤖', name: 'Bot Telegram',
    desc: 'Bots personnalisés et Mini Apps Telegram.',
    longDesc: 'Création de bots Telegram intelligents avec commandes personnalisées, Mini Apps intégrées, et automatisations avancées.',
    features: ['Commandes personnalisées', 'Mini App intégrée', 'Base de données', 'Paiements intégrés', 'Déploiement cloud'],
    price: '800 €', delay: '3-5 jours'
  },
  {
    id: 'design', icon: '🎨', name: 'Design & Identité',
    desc: 'Logos, chartes graphiques et maquettes UI/UX.',
    longDesc: 'Création d\'identités visuelles uniques et mémorables. Du logo à la charte graphique complète, en passant par les maquettes d\'interfaces.',
    features: ['3 propositions de logo', 'Charte graphique complète', 'Fichiers HD & vectoriels', 'Maquettes UI/UX Figma', 'Guide de style'],
    price: '900 €', delay: '3-5 jours'
  },
  {
    id: 'custom', icon: '🔧', name: 'Solution Sur Mesure',
    desc: 'Tout type de solution digitale, sans limites.',
    longDesc: 'Vous avez un besoin spécifique ? Nous développons toute solution digitale sur mesure, en toute discrétion et confidentialité. Aucune question posée.',
    features: ['Analyse de votre besoin', 'Développement 100% sur mesure', 'Confidentialité totale', 'Aucune trace', 'Support dédié et anonyme'],
    price: 'Sur devis', delay: 'Variable'
  }
];

// ---- State ----
let currentPage = 'home';

// ---- Router ----
function navigate(page) {
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
  return `
    <div class="page active" id="page-home">
      <div class="hero">
        <img src="logo.svg" alt="Anonymous EvoDevs Shop" class="hero-logo animate-in">
        <h1 class="hero-title animate-in">Anonymous EvoDevs Shop</h1>
        <p class="hero-slogan animate-in" id="typewriter"><span class="cursor"></span></p>
        <p class="hero-desc animate-in">
          Solutions digitales premium.<br>
          Confiance, discrétion et anonymat garantis.
        </p>
        <button class="btn-cta animate-in" onclick="navigate('services')">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          Découvrir nos services
        </button>
      </div>

      <div class="chips-row animate-in">
        <span class="chip">🔒 Anonymat</span>
        <span class="chip">🤫 Discrétion</span>
        <span class="chip">⚡ Rapide</span>
        <span class="chip">💎 Premium</span>
      </div>

      <div class="stats-grid stagger">
        <div class="stat-card glass animate-in">
          <div class="stat-number" data-count="50">0</div>
          <div class="stat-label">Projets livrés</div>
        </div>
        <div class="stat-card glass animate-in">
          <div class="stat-number" data-count="30">0</div>
          <div class="stat-label">Clients satisfaits</div>
        </div>
        <div class="stat-card glass animate-in">
          <div class="stat-number" data-count="100">0</div>
          <div class="stat-label">% Discrétion</div>
        </div>
      </div>
    </div>`;
}

function renderServices() {
  const cards = SERVICES.map((s, i) => `
    <div class="service-card glass-card animate-in" onclick="openServiceDetail('${s.id}')" style="transition-delay:${i * 0.06}s">
      <div class="service-icon">${s.icon}</div>
      <div class="service-name">${s.name}</div>
      <div class="service-desc">${s.desc}</div>
      <div class="service-delay">⏱ ${s.delay}</div>
      <div class="service-price">${s.price}</div>
      <button class="btn-detail">Voir détails →</button>
    </div>`).join('');

  return `
    <div class="page active" id="page-services">
      <div class="page-header animate-in">
        <h2>Nos Services</h2>
        <p>Solutions digitales sur mesure — légales ou non conventionnelles</p>
      </div>
      <div class="services-grid stagger">${cards}</div>
    </div>`;
}

function renderPolicy() {
  return `
    <div class="page active" id="page-policy">
      <div class="policy-container">
        <div class="page-header animate-in">
          <h2>Politique & Conditions</h2>
          <p class="policy-date">Dernière mise à jour : Mai 2026</p>
        </div>

        <div class="policy-section glass animate-in">
          <h3>1. Processus de commande</h3>
          <p>Toute commande est initiée directement via cette application. Un devis détaillé vous est fourni sous 24h. Le projet démarre après validation et versement de l'acompte (50%). Toutes les communications restent dans l'application.</p>
        </div>
        <div class="policy-section glass animate-in">
          <h3>2. Délais de livraison</h3>
          <p>Les délais indiqués sont estimatifs. Un calendrier précis est défini lors de la validation. Tout retard est communiqué en amont via l'application.</p>
        </div>
        <div class="policy-section glass animate-in">
          <h3>3. Paiement</h3>
          <p>Paiement en deux fois : 50% à la commande, 50% à la livraison. Modes de paiement acceptés : crypto-monnaies, virement bancaire, et autres méthodes discrètes à convenir.</p>
        </div>
        <div class="policy-section glass animate-in">
          <h3>4. Révisions & modifications</h3>
          <p>Deux cycles de révisions sont inclus dans le tarif de base. Toute modification supplémentaire fera l'objet d'un devis complémentaire.</p>
        </div>
        <div class="policy-section glass animate-in">
          <h3>5. Propriété intellectuelle</h3>
          <p>Le code source et les livrables sont la propriété du client après paiement intégral. Nos outils et bibliothèques internes restent notre propriété.</p>
        </div>
        <div class="policy-section glass animate-in">
          <h3>6. Confidentialité & Anonymat</h3>
          <p>La confidentialité est notre priorité absolue. Aucune donnée personnelle n'est conservée au-delà du projet. Nous ne partageons aucune information avec des tiers. Aucun journal, aucune trace. Votre projet reste entre vous et nous.</p>
        </div>
        <div class="policy-section glass animate-in">
          <h3>7. Politique de non-divulgation</h3>
          <p>Nous appliquons un strict protocole de non-divulgation sur chaque projet. Aucune référence client n'est publiée sans accord explicite. La discrétion est totale et non négociable.</p>
        </div>
      </div>
    </div>`;
}

function renderAbout() {
  return `
    <div class="page active" id="page-about">
      <div class="page-header animate-in">
        <h2>À propos</h2>
        <p>Qui sommes-nous ?</p>
      </div>

      <div class="about-intro glass animate-in">
        <p><strong>Anonymous EvoDevs Shop</strong> est un collectif de développeurs et designers opérant dans l'ombre. Nous fournissons tout type de solutions digitales — légales ou non conventionnelles — en toute confiance et discrétion. Pas de questions, pas de traces, que des résultats.</p>
      </div>

      <h3 class="section-title animate-in">💎 Nos Valeurs</h3>
      <div class="values-grid stagger">
        <div class="value-card glass-card animate-in">
          <div class="value-icon">🔒</div>
          <div class="value-name">Anonymat</div>
          <div class="value-desc">Votre identité reste protégée</div>
        </div>
        <div class="value-card glass-card animate-in">
          <div class="value-icon">🤫</div>
          <div class="value-name">Discrétion</div>
          <div class="value-desc">Aucune trace, aucun journal</div>
        </div>
        <div class="value-card glass-card animate-in">
          <div class="value-icon">⚡</div>
          <div class="value-name">Efficacité</div>
          <div class="value-desc">Livraison rapide et fiable</div>
        </div>
        <div class="value-card glass-card animate-in">
          <div class="value-icon">💎</div>
          <div class="value-name">Qualité</div>
          <div class="value-desc">Solutions premium garanties</div>
        </div>
      </div>

      <h3 class="section-title animate-in">🛠 Nos Compétences</h3>
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
        <p class="about-cta-text">💬 Pour toute demande, utilisez directement le formulaire de commande dans l'onglet <strong>Services</strong>.</p>
        <button class="btn-cta" onclick="navigate('services')" style="margin-top:12px;">
          Voir nos services
        </button>
      </div>
    </div>`;
}

// ---- Service Detail Modal ----
function openServiceDetail(id) {
  const s = SERVICES.find(x => x.id === id);
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
      <div><span class="detail-info-label">Tarif</span></div>
      <div><span class="detail-info-value">${s.price}</span></div>
    </div>
    <div class="detail-info-row glass">
      <div><span class="detail-info-label">Délai estimé</span></div>
      <div><span class="detail-info-value">${s.delay}</span></div>
    </div>
    <p class="detail-note">* Les tarifs peuvent varier selon la complexité du projet</p>
    <button class="btn-order" onclick="openOrderForm('${s.id}')">
      📩 Commander ce service
    </button>`;

  showModal('serviceModal');
}

// ---- Order Form Modal ----
function openOrderForm(serviceId) {
  const s = SERVICES.find(x => x.id === serviceId);
  closeModal('serviceModal');
  setTimeout(() => {
    document.getElementById('orderModalBody').innerHTML = `
      <h3 style="font-size:18px;font-weight:700;color:var(--silver-100);margin-bottom:4px;">📩 Commander</h3>
      <p style="font-size:13px;color:var(--silver-500);margin-bottom:20px;">${s ? s.name : 'Service'}</p>
      <form id="orderForm" onsubmit="submitOrder(event, '${serviceId}')">
        <div class="form-group">
          <label class="form-label">Votre pseudo / alias *</label>
          <input type="text" class="form-input" name="name" placeholder="Pseudonyme ou alias" required>
          <div class="form-error" id="err-name">Ce champ est requis</div>
        </div>
        <div class="form-group">
          <label class="form-label">Contact sécurisé (optionnel)</label>
          <input type="text" class="form-input" name="email" placeholder="Telegram, Session, Signal...">
        </div>
        <div class="form-group">
          <label class="form-label">Budget estimé</label>
          <select class="form-select" name="budget">
            <option value="">Sélectionner un budget</option>
            <option value="< 100 €">Moins de 100 €</option>
            <option value="100 - 300 €">100 - 300 €</option>
            <option value="300 - 500 €">300 - 500 €</option>
            <option value="> 500 €">Plus de 500 €</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Description du projet</label>
          <textarea class="form-textarea" name="description" placeholder="Décrivez votre projet en quelques lignes... Toutes les infos restent confidentielles."></textarea>
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" name="urgent">
            <span class="form-checkbox-label">⚡ Projet urgent (supplément possible)</span>
          </label>
        </div>
        <div class="form-group">
          <label class="form-checkbox">
            <input type="checkbox" name="terms" required>
            <span class="form-checkbox-label">J'accepte les <a href="#" onclick="event.preventDefault();closeModal('orderModal');navigate('policy')" style="color:var(--silver-300);text-decoration:underline;">conditions générales</a> *</span>
          </label>
        </div>
        <button type="submit" class="btn-order" id="submitBtn">
          Envoyer la commande
        </button>
      </form>`;
    showModal('orderModal');
  }, 350);
}

async function submitOrder(e, serviceId) {
  e.preventDefault();
  const form = e.target;
  const btn = document.getElementById('submitBtn');
  const s = SERVICES.find(x => x.id === serviceId);

  btn.disabled = true;
  btn.innerHTML = '<div class="spinner" style="width:20px;height:20px;margin:0;border-width:2px;"></div> Envoi...';

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    service: s ? s.name : serviceId,
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
      document.getElementById('orderModalBody').innerHTML = `
        <div class="success-screen">
          <div class="success-icon">✅</div>
          <h3 class="success-title">Commande envoyée !</h3>
          <p class="success-msg">Merci ${data.name} ! Votre demande pour <strong>${data.service}</strong> a été reçue. Nous vous recontacterons sous 24h via votre canal sécurisé.</p>
          <button class="btn-cta" onclick="closeModal('orderModal')">Fermer</button>
        </div>`;
    } else {
      throw new Error(result.error || 'Erreur');
    }
  } catch (err) {
    if (tg) tg.HapticFeedback?.notificationOccurred('error');
    btn.disabled = false;
    btn.textContent = 'Réessayer';
    alert('Erreur lors de l\'envoi. Veuillez réessayer.');
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
  const phrases = [
    'Votre projet. Notre discrétion.',
    'Aucune limite. Aucune trace.',
    'Solutions digitales anonymes.',
    'Confiance et confidentialité.'
  ];
  let phraseIdx = 0, charIdx = 0, isDeleting = false;

  function tick() {
    const phrase = phrases[phraseIdx];
    if (!isDeleting) {
      el.innerHTML = phrase.substring(0, charIdx + 1) + '<span class="cursor"></span>';
      charIdx++;
      if (charIdx === phrase.length) {
        isDeleting = true;
        setTimeout(tick, 2000);
        return;
      }
      setTimeout(tick, 60);
    } else {
      el.innerHTML = phrase.substring(0, charIdx - 1) + '<span class="cursor"></span>';
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 30);
    }
  }
  setTimeout(tick, 800);
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
navigate('home');
