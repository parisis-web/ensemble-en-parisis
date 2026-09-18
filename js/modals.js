/**
 * GESTION DES MODALES, FORMULAIRES WIZARD & DASHBOARDS
 */

class ModalManager {
  constructor() {
    this.activeModal = null;
    this.currentAction = null;
    this.wizardStep = 1;
  }

  open(modalId) {
    this.closeAll();
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add("active");
      this.activeModal = modal;
      document.body.style.overflow = "hidden";
    }
  }

  closeAll() {
    document.querySelectorAll(".modal-backdrop").forEach(m => {
      m.classList.remove("active");
    });
    this.activeModal = null;
    document.body.style.overflow = "auto";
  }

  // --- 1. MODALE DÉTAILS D'UNE ACTION ---
  openDetails(actionId) {
    const action = window.state.actions.find(a => a.id === actionId);
    if (!action) return;
    this.currentAction = action;

    const modal = document.getElementById("modal-action-details");
    const theme = THEMES_DATA[action.theme] || THEMES_DATA.env;
    const spotsLeft = action.spotsTotal - action.spotsTaken;

    modal.querySelector(".modal-title").textContent = action.title;
    modal.querySelector(".modal-subtitle").textContent = `${action.association} · 📍 ${action.commune}`;

    const body = modal.querySelector(".modal-body");
    body.innerHTML = `
      <div style="margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden; height: 240px;">
        <img src="${action.image}" alt="${action.title}" style="width: 100%; height: 100%; object-fit: cover;" />
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 1.25rem; flex-wrap: wrap;">
        <span class="badge badge-${action.theme}">${theme.icon} ${theme.name}</span>
        <span class="badge" style="background: var(--bg-subtle); color: var(--text-main);">📍 ${action.commune}</span>
        <span class="badge badge-urgent">${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""}</span>
      </div>

      <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Description de la mission</h4>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">${action.description}</p>

      <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <h4 style="font-size: 1rem; margin-bottom: 0.75rem;">Informations pratiques</h4>
        <p style="margin-bottom: 0.4rem;">📅 <strong>Date :</strong> ${action.date}</p>
        <p style="margin-bottom: 0.4rem;">⏰ <strong>Horaires :</strong> ${action.time}</p>
        <p style="margin-bottom: 0.4rem;">📍 <strong>Lieu exact :</strong> ${action.address}, ${action.commune}</p>
        <p style="margin-bottom: 0;">ℹ️ <strong>Prérequis :</strong> ${action.requirements}</p>
      </div>

      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
        ${action.tags ? action.tags.map(t => `<span class="tag-pill">${t}</span>`).join("") : ""}
      </div>
    `;

    const footer = modal.querySelector(".modal-footer");
    footer.innerHTML = `
      <button class="btn btn-outline" onclick="window.modals.closeAll()">Fermer</button>
      <button class="btn btn-primary" onclick="window.modals.openRegistration('${action.id}')">
        Participer à cette action (${spotsLeft} places)
      </button>
    `;

    this.open("modal-action-details");
  }

  // --- 2. MODALE D'INSCRIPTION CITOYEN / BÉNÉVOLE ---
  openRegistration(actionId) {
    const action = window.state.actions.find(a => a.id === actionId);
    if (!action) return;
    this.currentAction = action;

    const modal = document.getElementById("modal-registration");
    modal.querySelector(".modal-title").textContent = "Inscription à l'action solidaire";
    modal.querySelector(".modal-subtitle").textContent = `${action.title} · ${action.date}`;

    const body = modal.querySelector(".modal-body");
    body.innerHTML = `
      <div id="reg-form-step-1">
        <div style="background: var(--primary-light); color: var(--primary); padding: 0.75rem 1rem; border-radius: var(--radius-md); margin-bottom: 1.5rem; font-size: 0.88rem;">
          🌿 <strong>Inscription express</strong> sans mot de passe requis. Vos coordonnées sont uniquement transmises à l'association <strong>${action.association}</strong> pour l'organisation terrain.
        </div>

        <form id="volunteer-reg-form" onsubmit="event.preventDefault(); window.modals.submitRegistration();">
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Prénom & Nom <span class="required">*</span></label>
              <input type="text" id="reg-name" class="form-input" value="${window.state.user.name}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Adresse Email <span class="required">*</span></label>
              <input type="email" id="reg-email" class="form-input" value="${window.state.user.email}" required />
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Téléphone mobile <span class="required">*</span></label>
              <input type="tel" id="reg-phone" class="form-input" value="${window.state.user.phone}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Nombre de personnes</label>
              <select id="reg-guests" class="form-select">
                <option value="1">1 bénévole (moi-même)</option>
                <option value="2">2 bénévoles (avec un ami/proche)</option>
                <option value="3">3 bénévoles ou en famille</option>
              </select>
            </div>
          </div>

          <div class="form-group">
            <label class="form-label">Un petit mot pour l'association ? (Optionnel)</label>
            <textarea id="reg-notes" class="form-textarea" placeholder="Ex: Première participation, disponible avec plaisir !"></textarea>
          </div>

          <label class="form-checkbox-label">
            <input type="checkbox" class="form-checkbox" checked required />
            <span>J'accepte de recevoir un rappel par SMS/Email 24h avant l'action.</span>
          </label>
        </form>
      </div>

      <div id="reg-form-step-2" style="display: none;">
        <div class="success-state-wrap">
          <div class="success-icon-wrap">✓</div>
          <h3 class="success-title">Inscription confirmée !</h3>
          <p class="success-desc">
            Merci pour votre engagement ! Vous recevrez un email récapitulatif avec les consignes d'accès.
          </p>

          <div class="calendar-export-card">
            <div style="text-align: left;">
              <strong>📅 Ajouter à mon calendrier</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">${action.date} · ${action.time}</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.modals.downloadICS()">
              Télécharger (.ics)
            </button>
          </div>
        </div>
      </div>
    `;

    const footer = modal.querySelector(".modal-footer");
    footer.innerHTML = `
      <button class="btn btn-outline" onclick="window.modals.closeAll()">Annuler</button>
      <button class="btn btn-primary" onclick="window.modals.submitRegistration()">
        Confirmer mon inscription
      </button>
    `;

    this.open("modal-registration");
  }

  submitRegistration() {
    const nameInput = document.getElementById("reg-name");
    const emailInput = document.getElementById("reg-email");
    if (!nameInput || !nameInput.value || !emailInput || !emailInput.value) {
      window.ui.showToast("Champ requis", "Veuillez renseigner votre nom et email", "warning");
      return;
    }

    if (this.currentAction) {
      window.state.registerToMission(this.currentAction.id, {
        name: nameInput.value,
        email: emailInput.value
      });

      // Basculer vers l'étape de confirmation
      const step1 = document.getElementById("reg-form-step-1");
      const step2 = document.getElementById("reg-form-step-2");
      if (step1 && step2) {
        step1.style.display = "none";
        step2.style.display = "block";
      }

      const modal = document.getElementById("modal-registration");
      const footer = modal.querySelector(".modal-footer");
      footer.innerHTML = `
        <button class="btn btn-primary btn-block" onclick="window.modals.closeAll()">Terminer</button>
      `;

      window.ui.showToast("Bravo !", "Votre inscription est validée avec succès.", "success");
    }
  }

  // Téléchargement du fichier de calendrier .ICS standard
  downloadICS() {
    if (!this.currentAction) return;
    const act = this.currentAction;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Ensemble en Parisis//FR
BEGIN:VEVENT
SUMMARY:${act.title} - ${act.association}
DESCRIPTION:${act.description}
LOCATION:${act.address}, ${act.commune}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `action-${act.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.ui.showToast("Calendrier", "Événement ajouté au calendrier !", "info");
  }

  // --- 3. WIZARD : PROPOSER UNE ACTION (ASSOCIATION / PORTEUR) ---
  openProposeAction() {
    this.wizardStep = 1;
    this.renderWizardStep();
    this.open("modal-propose-action");
  }

  renderWizardStep() {
    const modal = document.getElementById("modal-propose-action");
    const body = modal.querySelector(".modal-body");

    if (this.wizardStep === 1) {
      body.innerHTML = `
        <div class="wizard-steps">
          <div class="wizard-step-item active">
            <div class="wizard-step-circle">1</div>
            <div class="wizard-step-label">Général</div>
          </div>
          <div class="wizard-step-item">
            <div class="wizard-step-circle">2</div>
            <div class="wizard-step-label">Lieu & Date</div>
          </div>
          <div class="wizard-step-item">
            <div class="wizard-step-circle">3</div>
            <div class="wizard-step-label">Consignes</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Thématique de l'action <span class="required">*</span></label>
          <select id="new-action-theme" class="form-select">
            ${Object.values(THEMES_DATA).map(t => `<option value="${t.id}">${t.icon} ${t.name}</option>`).join("")}
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Titre percutant de l'action <span class="required">*</span></label>
          <input type="text" id="new-action-title" class="form-input" placeholder="Ex: Ramassage citoyen d'automne, Soutien scolaire..." required />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Nom de l'association / Collectif <span class="required">*</span></label>
            <input type="text" id="new-action-asso" class="form-input" placeholder="Ex: Parisis Éco-Citoyen" required />
          </div>
          <div class="form-group">
            <label class="form-label">Format de l'action</label>
            <select id="new-action-type" class="form-select">
              <option value="ponctuel">Bénévolat ponctuel (Coup de main)</option>
              <option value="regulier">Bénévolat régulier</option>
              <option value="atelier">Événement & Atelier</option>
              <option value="consultation">Consultation citoyenne</option>
            </select>
          </div>
        </div>
      `;
    } else if (this.wizardStep === 2) {
      body.innerHTML = `
        <div class="wizard-steps">
          <div class="wizard-step-item completed">
            <div class="wizard-step-circle">✓</div>
            <div class="wizard-step-label">Général</div>
          </div>
          <div class="wizard-step-item active">
            <div class="wizard-step-circle">2</div>
            <div class="wizard-step-label">Lieu & Date</div>
          </div>
          <div class="wizard-step-item">
            <div class="wizard-step-circle">3</div>
            <div class="wizard-step-label">Consignes</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Commune du Parisis <span class="required">*</span></label>
            <select id="new-action-commune" class="form-select">
              ${COMMUNES_PARISIS.filter(c => c !== "Toutes les communes").map(c => `<option value="${c}">${c}</option>`).join("")}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label">Adresse / Point de RDV <span class="required">*</span></label>
            <input type="text" id="new-action-address" class="form-input" placeholder="Ex: Parc de la Mairie, Salle des fêtes..." required />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label">Date <span class="required">*</span></label>
            <input type="date" id="new-action-date" class="form-input" required />
          </div>
          <div class="form-group">
            <label class="form-label">Horaires (Ex: 14h00 - 17h00) <span class="required">*</span></label>
            <input type="text" id="new-action-time" class="form-input" placeholder="14h00 - 17h00" required />
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Nombre de bénévoles recherchés</label>
          <input type="number" id="new-action-spots" class="form-input" value="10" min="1" max="100" />
        </div>
      `;
    } else if (this.wizardStep === 3) {
      body.innerHTML = `
        <div class="wizard-steps">
          <div class="wizard-step-item completed">
            <div class="wizard-step-circle">✓</div>
            <div class="wizard-step-label">Général</div>
          </div>
          <div class="wizard-step-item completed">
            <div class="wizard-step-circle">✓</div>
            <div class="wizard-step-label">Lieu & Date</div>
          </div>
          <div class="wizard-step-item active">
            <div class="wizard-step-circle">3</div>
            <div class="wizard-step-label">Consignes</div>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label">Description détaillée de la mission <span class="required">*</span></label>
          <textarea id="new-action-desc" class="form-textarea" placeholder="Expliquez le contexte, les objectifs et ce que feront les bénévoles..." required></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Prérequis & Matériel nécessaire</label>
          <input type="text" id="new-action-req" class="form-input" placeholder="Ex: Gants fournis, prévoir tenue de sport..." />
        </div>

        <div class="form-group">
          <label class="form-label">Email de contact pour les candidatures <span class="required">*</span></label>
          <input type="email" id="new-action-contact" class="form-input" value="contact@association-parisis.fr" required />
        </div>
      `;
    }

    const footer = modal.querySelector(".modal-footer");
    footer.innerHTML = `
      ${this.wizardStep > 1 ? `<button class="btn btn-outline" onclick="window.modals.prevWizardStep()">Précédent</button>` : `<button class="btn btn-outline" onclick="window.modals.closeAll()">Annuler</button>`}
      ${this.wizardStep < 3 ? `<button class="btn btn-primary" onclick="window.modals.nextWizardStep()">Suivant →</button>` : `<button class="btn btn-primary" onclick="window.modals.publishAction()">Publier l'action en ligne 🚀</button>`}
    `;
  }

  nextWizardStep() {
    this.wizardStep++;
    this.renderWizardStep();
  }

  prevWizardStep() {
    this.wizardStep--;
    this.renderWizardStep();
  }

  publishAction() {
    const title = document.getElementById("new-action-title")?.value || "Initiative Citoyenne";
    const desc = document.getElementById("new-action-desc")?.value || "Rejoignez notre action solidaire en Parisis !";
    const theme = document.getElementById("new-action-theme")?.value || "env";
    const asso = document.getElementById("new-action-asso")?.value || "Association Citoyenne";
    const commune = document.getElementById("new-action-commune")?.value || "Cormeilles-en-Parisis";
    const address = document.getElementById("new-action-address")?.value || "Place de la Gare";
    const time = document.getElementById("new-action-time")?.value || "14h00 - 17h00";
    const spots = parseInt(document.getElementById("new-action-spots")?.value || "10", 10);

    const newAction = {
      id: `custom-act-${Date.now()}`,
      title,
      theme,
      type: "ponctuel",
      association: asso,
      associationLogo: "🌟",
      commune,
      address,
      date: "Samedi 5 Septembre 2026",
      time,
      spotsTotal: spots,
      spotsTaken: 1,
      isUrgent: false,
      isWeekend: true,
      image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
      description: desc,
      requirements: "Ouvert à tous avec bonne humeur.",
      accessibility: ["Débutants bienvenus", "Familles"],
      coords: [48.975, 2.20],
      tags: ["#Nouveau", "#EngagementCitoyen"]
    };

    window.state.addAction(newAction);
    this.closeAll();
    window.ui.showToast("Action publiée !", "Votre mission est visible dès maintenant sur la plateforme.", "success");
  }

  // --- 4. ESPACE CITOYEN (DASHBOARD) ---
  openCitizenDashboard() {
    const modal = document.getElementById("modal-citizen-dashboard");
    const user = window.state.user;
    const registered = window.state.actions.filter(a => user.registeredActions.includes(a.id));

    const body = modal.querySelector(".modal-body");
    body.innerHTML = `
      <div class="dashboard-stats-grid">
        <div class="dashboard-stat-card">
          <div class="dashboard-stat-val">${user.hoursContributed}h</div>
          <div class="dashboard-stat-title">Heures solidaires</div>
        </div>
        <div class="dashboard-stat-card">
          <div class="dashboard-stat-val">${user.registeredActions.length}</div>
          <div class="dashboard-stat-title">Missions rejointes</div>
        </div>
        <div class="dashboard-stat-card">
          <div class="dashboard-stat-val">3</div>
          <div class="dashboard-stat-title">Badges débloqués</div>
        </div>
      </div>

      <div class="dashboard-section-title">🏆 Mes Badges Citoyens</div>
      <div class="badge-grid">
        ${CITIZEN_BADGES.map(b => `
          <div class="citizen-badge-item ${b.unlocked ? "" : "locked"}">
            <div class="citizen-badge-icon">${b.icon}</div>
            <div class="citizen-badge-name">${b.name}</div>
            <div style="font-size: 0.7rem; color: var(--text-muted);">${b.desc}</div>
          </div>
        `).join("")}
      </div>

      <div class="dashboard-section-title">📅 Mes Prochaines Actions (${registered.length})</div>
      <div style="display: flex; flex-direction: column; gap: 0.75rem;">
        ${registered.map(act => `
          <div style="background: var(--bg-subtle); padding: 1rem; border-radius: var(--radius-md); display: flex; align-items: center; justify-content: space-between;">
            <div>
              <span class="badge badge-${act.theme}" style="margin-right: 6px;">${THEMES_DATA[act.theme].shortName}</span>
              <strong>${act.title}</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">📍 ${act.commune} · ${act.date} (${act.time})</div>
            </div>
            <button class="btn btn-outline btn-sm" onclick="window.modals.openDetails('${act.id}')">Voir</button>
          </div>
        `).join("")}
      </div>
    `;

    this.open("modal-citizen-dashboard");
  }

  // --- 5. ESPACE ASSOCIATION (DASHBOARD) ---
  openAssoDashboard() {
    const modal = document.getElementById("modal-asso-dashboard");
    const body = modal.querySelector(".modal-body");

    body.innerHTML = `
      <div class="dashboard-stats-grid">
        <div class="dashboard-stat-card">
          <div class="dashboard-stat-val">3</div>
          <div class="dashboard-stat-title">Missions en ligne</div>
        </div>
        <div class="dashboard-stat-card">
          <div class="dashboard-stat-val">28</div>
          <div class="dashboard-stat-title">Bénévoles inscrits</div>
        </div>
        <div class="dashboard-stat-card">
          <div class="dashboard-stat-val">94%</div>
          <div class="dashboard-stat-title">Taux de présence</div>
        </div>
      </div>

      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
        <div class="dashboard-section-title" style="margin-bottom: 0;">👥 Dernières Candidatures reçues</div>
        <button class="btn btn-outline btn-sm" onclick="window.ui.showToast('Export CSV', 'Liste des émargements téléchargée avec succès', 'info')">
          📥 Exporter pour émargement (CSV)
        </button>
      </div>

      <table class="applicant-table">
        <thead>
          <tr>
            <th>Bénévole</th>
            <th>Mission</th>
            <th>Commune</th>
            <th>Date</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Claire Martin</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">claire.m@email.fr</span></td>
            <td>Grand Nettoyage Berges</td>
            <td>Herblay</td>
            <td>22 Août</td>
            <td><span class="badge badge-env">✓ Validé</span></td>
          </tr>
          <tr>
            <td><strong>Thomas Duval</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">t.duval@email.fr</span></td>
            <td>Repair Café Taverny</td>
            <td>Taverny</td>
            <td>23 Août</td>
            <td><span class="badge badge-env">✓ Validé</span></td>
          </tr>
          <tr>
            <td><strong>Sarah Benali</strong><br><span style="font-size: 0.75rem; color: var(--text-muted);">sarah.b@email.fr</span></td>
            <td>Distribution Repas</td>
            <td>Franconville</td>
            <td>22 Août</td>
            <td><span class="badge badge-solidarite">⏳ En attente</span></td>
          </tr>
        </tbody>
      </table>
    `;

    this.open("modal-asso-dashboard");
  }

  // --- 6. RECHERCHE RAPIDE (CMD + K) ---
  openQuickSearch() {
    const modal = document.getElementById("modal-quick-search");
    const input = document.getElementById("quick-search-input");
    this.open("modal-quick-search");
    if (input) {
      input.value = "";
      setTimeout(() => input.focus(), 100);
      this.handleQuickSearch("");
    }
  }

  handleQuickSearch(query) {
    const container = document.getElementById("quick-search-results");
    if (!container) return;

    const q = (query || "").toLowerCase();
    const statutsMatch = !query || "statuts association loi 1901 objet herblay siege reglement charte bureau delage smat thieux".includes(q);

    const filtered = window.state.actions.filter(a => {
      if (!query) return true;
      return a.title.toLowerCase().includes(q) || a.commune.toLowerCase().includes(q) || a.association.toLowerCase().includes(q);
    }).slice(0, 5);

    let html = "";
    if (statutsMatch) {
      html += `
        <div class="search-result-item" onclick="window.modals.closeAll(); window.ui.openStatuts();" style="border-left: 3px solid var(--primary);">
          <div>
            <strong>📜 Statuts Officiels de l'Association (Loi 1901)</strong>
            <div style="font-size: 0.8rem; color: var(--text-muted);">🏛️ 16 articles, siège à Herblay-sur-Seine, gouvernance & membres</div>
          </div>
          <span class="badge badge-citoyennete">Loi 1901</span>
        </div>
      `;
    }

    html += filtered.map(a => `
      <div class="search-result-item" onclick="window.modals.openDetails('${a.id}')">
        <div>
          <strong>${a.title}</strong>
          <div style="font-size: 0.8rem; color: var(--text-muted);">📍 ${a.commune} · ${a.association}</div>
        </div>
        <span class="badge badge-${a.theme}">${THEMES_DATA[a.theme].shortName}</span>
      </div>
    `).join("");

    container.innerHTML = html;
  }
}

window.modals = new ModalManager();

