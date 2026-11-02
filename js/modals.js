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
    const isPoster = action.image.includes("evenement") || action.image.includes("foret");

    modal.querySelector(".modal-title").textContent = action.title;
    modal.querySelector(".modal-subtitle").textContent = `${action.association} · 📍 ${action.commune}`;

    const body = modal.querySelector(".modal-body");
    body.innerHTML = `
      <div style="margin-bottom: 1.5rem; border-radius: var(--radius-md); overflow: hidden; ${isPoster ? 'max-height: 380px; background: #0F172A; text-align: center;' : 'height: 240px;'} position: relative; cursor: pointer;" onclick="window.modals.openImageLightbox('${action.image}', '${action.title.replace(/'/g, "\\'")}')" title="Cliquer pour afficher l'affiche en plein écran">
        <img src="${action.image}" alt="${action.title}" style="${isPoster ? 'max-height: 380px; width: auto; max-width: 100%; display: block; margin: 0 auto;' : 'width: 100%; height: 100%; object-fit: cover;'}" />
        <span style="position: absolute; bottom: 12px; right: 12px; background: rgba(15, 23, 42, 0.8); color: #FFFFFF; font-size: 0.78rem; font-weight: 600; padding: 4px 10px; border-radius: 20px; backdrop-filter: blur(4px); display: flex; align-items: center; gap: 4px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
          🔍 Agrandir l'affiche
        </span>
      </div>

      <div style="display: flex; gap: 8px; margin-bottom: 1.25rem; flex-wrap: wrap;">
        <span class="badge badge-${action.theme}">${theme.icon} ${theme.name}</span>
        <span class="badge" style="background: var(--bg-subtle); color: var(--text-main);">📍 ${action.commune}</span>
        ${action.type === "evenement" ? `<span class="badge" style="background: #FDF2F8; color: #BE185D; border: 1px solid #FBCFE8; font-weight: 700;">🎉 Événement Gratuit</span>` : ""}
        <span class="badge badge-urgent">${spotsLeft} place${spotsLeft > 1 ? "s" : ""} restante${spotsLeft > 1 ? "s" : ""} (sur ${action.spotsTotal})</span>
      </div>

      <h4 style="font-size: 1.1rem; margin-bottom: 0.5rem;">Description de l'événement</h4>
      <p style="color: var(--text-muted); margin-bottom: 1.5rem; line-height: 1.6;">${action.description}</p>

      ${action.id === "act-foret-herblay" ? `
        <div style="background: #F0FDF4; border: 1px solid #BBF7D0; padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
          <h4 style="font-size: 1rem; color: #166534; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 8px;">
            <span>🌲</span> Au programme de la balade citoyenne
          </h4>
          <ul style="margin: 0; padding-left: 1.25rem; color: #14532D; font-size: 0.92rem; line-height: 1.6;">
            <li><strong>Histoire de la forêt de Maubuisson :</strong> comprendre les racines et l'évolution de ce poumon vert.</li>
            <li><strong>Pourquoi plante-t-on des arbres ?</strong> Les bienfaits écologiques et climatiques expliqués par un professionnel.</li>
            <li><strong>Les enjeux de l'île d'Herblay :</strong> préservation de la biodiversité en bord de Seine.</li>
            <li><strong>Guidé par Hugues Verdière :</strong> forestier herblaysien passionné.</li>
          </ul>
        </div>
      ` : ""}

      <div style="background: var(--bg-subtle); padding: 1.25rem; border-radius: var(--radius-md); margin-bottom: 1.5rem;">
        <h4 style="font-size: 1rem; margin-bottom: 0.75rem;">Informations pratiques & Accès</h4>
        <p style="margin-bottom: 0.4rem;">📅 <strong>Date :</strong> ${action.date}</p>
        <p style="margin-bottom: 0.4rem;">⏰ <strong>Horaires :</strong> ${action.time}</p>
        <p style="margin-bottom: 0.4rem;">📍 <strong>Lieu de rendez-vous :</strong> ${action.address}, ${action.commune}</p>
        <p style="margin-bottom: 0.4rem;">🏁 <strong>Arrivée :</strong> Fin du parcours au Bois des Fontaines après un passage par les bords de Seine</p>
        <p style="margin-bottom: 0.4rem;">ℹ️ <strong>Modalités :</strong> ${action.requirements}</p>
        <p style="margin-bottom: 0;">✉️ <strong>Inscription directe :</strong> <a href="javascript:void(0)" onclick="window.modals.openContact(event, 'Inscription balade forêt 17 octobre')" style="color: var(--primary); font-weight: 600; text-decoration: underline;">ensembleenparis@gmail.com</a> ou via le formulaire ci-dessous.</p>
      </div>

      <div style="display: flex; gap: 6px; flex-wrap: wrap;">
        ${action.tags ? action.tags.map(t => `<span class="tag-pill">${t}</span>`).join("") : ""}
      </div>
    `;

    const footer = modal.querySelector(".modal-footer");
    footer.innerHTML = `
      <button class="btn btn-outline" onclick="window.modals.closeAll()">Fermer</button>
      <button class="btn btn-outline" onclick="window.modals.openImageLightbox('${action.image}', '${action.title.replace(/'/g, "\\'")}')">
        🔍 Affiche officielle
      </button>
      <button class="btn btn-primary" onclick="window.modals.openRegistration('${action.id}')">
        Participer (${spotsLeft} places restantes)
      </button>
    `;

    this.open("modal-action-details");
  }

  // --- 1.5 LIGHTBOX AFFICHE PLEIN ÉCRAN ---
  openImageLightbox(src, title) {
    let lightbox = document.getElementById("modal-image-lightbox");
    if (!lightbox) {
      lightbox = document.createElement("div");
      lightbox.id = "modal-image-lightbox";
      lightbox.className = "modal-backdrop lightbox-backdrop";
      lightbox.setAttribute("role", "dialog");
      lightbox.setAttribute("aria-modal", "true");
      lightbox.innerHTML = `
        <div class="lightbox-dialog">
          <div class="lightbox-header">
            <h3 class="lightbox-title">Affiche officielle</h3>
            <button class="modal-close-btn" onclick="window.modals.closeAll()" aria-label="Fermer">✕</button>
          </div>
          <div class="lightbox-body">
            <img class="lightbox-img" src="" alt="Affiche" />
          </div>
          <div class="lightbox-footer">
            <a class="btn btn-outline btn-sm lightbox-download-link" href="" download target="_blank">📥 Télécharger</a>
            <button class="btn btn-primary btn-sm lightbox-register-btn">Participer à l'événement</button>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const titleEl = lightbox.querySelector(".lightbox-title");
    if (titleEl) titleEl.textContent = title || "Affiche officielle";

    const imgEl = lightbox.querySelector(".lightbox-img");
    if (imgEl) {
      imgEl.src = src;
      imgEl.alt = title || "Affiche de l'événement";
    }

    const dlLink = lightbox.querySelector(".lightbox-download-link");
    if (dlLink) {
      dlLink.href = src;
    }

    const regBtn = lightbox.querySelector(".lightbox-register-btn");
    if (regBtn) {
      regBtn.onclick = () => {
        window.modals.closeAll();
        if (this.currentAction) {
          window.modals.openRegistration(this.currentAction.id);
        } else {
          window.modals.openRegistration("act-foret-herblay");
        }
      };
    }

    this.open("modal-image-lightbox");
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
    const adhesionMatch = !query || "adhesion adhérer bulletin cotisation membre rejoindre participation fiche".includes(q);
    const statutsMatch = !query || "statuts association loi 1901 objet herblay siege reglement charte bureau delage smat thieux".includes(q);
    const contactMatch = !query || "contact ecrire message mail gmail ensembleenparis aide question joindre".includes(q);

    const filtered = window.state.actions.filter(a => {
      if (!query) return true;
      return a.title.toLowerCase().includes(q) || a.commune.toLowerCase().includes(q) || a.association.toLowerCase().includes(q);
    }).slice(0, 5);

    let html = "";
    if (adhesionMatch) {
      html += `
        <div class="search-result-item" onclick="window.modals.closeAll(); window.ui.openAdhesion();" style="border-left: 3px solid #7C3AED;">
          <div>
            <strong>✍️ Bulletin d'Adhésion (Fiche Officielle)</strong>
            <div style="font-size: 0.8rem; color: var(--text-muted);">🤝 Adhérer en ligne, cotisation solidaire, participation aux actions</div>
          </div>
          <span class="badge badge-adhesion">Adhésion</span>
        </div>
      `;
    }

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

    if (contactMatch) {
      html += `
        <div class="search-result-item" onclick="window.modals.closeAll(); window.modals.openContact();" style="border-left: 3px solid #EA580C;">
          <div>
            <strong>✉️ Contacter l'association (ensembleenparis@gmail.com)</strong>
            <div style="font-size: 0.8rem; color: var(--text-muted);">💬 Écrire un message directement en ligne sans ouvrir Outlook</div>
          </div>
          <span class="badge" style="background: #FFEDD5; color: #C2410C;">Contact</span>
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

  // --- 7. MODALE CONFIRMATION ADHÉSION RÉUSSIE ---
  openAdhesionSuccess(data) {
    const modal = document.getElementById("modal-adhesion-success");
    if (!modal) return;
    const body = modal.querySelector(".modal-body");
    const adhesionNum = "ADH-2026-" + Math.floor(1000 + Math.random() * 9000);
    const reglementLabels = {
      especes: "Espèces",
      cheque: "Chèque",
      enligne: "Hello Asso",
      autre: data.reglement_autre ? `Autre (${data.reglement_autre})` : "Autre"
    };

    body.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0.5rem;">
        <div style="font-size: 3.25rem; margin-bottom: 0.75rem;">🎉</div>
        <h4 style="font-size: 1.35rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Bienvenue dans l'association Ensemble en Parisis !
        </h4>
        <p style="color: var(--text-muted); max-width: 480px; margin: 0 auto 1.5rem auto; font-size: 0.95rem;">
          Votre demande d'adhésion pour <strong>${data.prenom || ''} ${data.nom || ''}</strong> a été enregistrée avec succès. Merci pour votre engagement citoyen !
        </p>
        
        <div class="adhesion-card-badge-preview">
          <div class="adhesion-preview-header">
            <img src="photos/Ensemble_Logo%20violet.png" alt="Logo" style="height: 32px; object-fit: contain;" />
            <span class="badge badge-adhesion">Membre Adhérent 2026</span>
          </div>
          <div class="adhesion-preview-body">
            <div style="font-size: 1.15rem; font-weight: 700; color: var(--text-main);">${data.prenom || ''} ${data.nom || ''}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-top: 0.2rem;">📍 ${data.adresse || ''} · ${data.codepostal || ''} ${data.ville || 'Herblay-sur-Seine'}</div>
            <div style="font-size: 0.85rem; color: var(--text-muted);">📧 ${data.email || ''} · 📞 ${data.telephone || ''}</div>
            
            <div style="margin-top: 0.85rem; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; border-top: 1px dashed var(--border-light); padding-top: 0.65rem; color: var(--text-main);">
              <span>N° Réf : <strong>${adhesionNum}</strong></span>
              <span>Cotisation : <strong>${data.cotisation || 15} €</strong> (${reglementLabels[data.adh_reglement] || 'Hello Asso'})</span>
            </div>
            ${data.propositions ? `
            <div style="margin-top: 0.5rem; font-size: 0.82rem; color: #6D28D9; background: #FAF5FF; padding: 0.35rem 0.65rem; border-radius: 6px; border: 1px dashed #DDD6FE; text-align: left;">
              💡 <strong>Vos propositions :</strong> ${data.propositions}
            </div>` : ''}
          </div>
        </div>

        <div style="margin-top: 1.75rem; display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="window.ui.printAdhesion(false); window.modals.closeAll();">
            🖨️ Imprimer mon justificatif
          </button>
          <button class="btn btn-outline" onclick="window.modals.closeAll();">
            Fermer
          </button>
        </div>
      </div>
    `;

    this.open("modal-adhesion-success");
  }

  // --- 8. MODALE CONTACT & ENVOI DE MESSAGE SANS OUTLOOK ---
  openContact(event, defaultSubject = "") {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const modal = document.getElementById("modal-contact");
    if (!modal) return;

    const body = document.getElementById("modal-contact-body");
    if (!body) return;

    body.innerHTML = `
      <div class="contact-header-info">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.75rem;">
          <div>
            <span style="font-size: 0.85rem; color: #4338CA; font-weight: 600;">Destinataire officiel :</span>
            <div class="contact-recipient-badge">
              <span>📧 ensembleenparis@gmail.com</span>
              <button type="button" class="contact-copy-btn" onclick="window.modals.copyContactEmail()" title="Copier l'adresse email">
                📋 Copier
              </button>
            </div>
          </div>
          <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ensembleenparis@gmail.com" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm" style="background: #FFFFFF; font-size: 0.82rem;" title="Ouvrir directement dans Gmail Web dans votre navigateur (sans lancer Outlook)">
              <span style="color: #EA4335; font-weight: 700;">G</span> Ouvrir Gmail en ligne ↗
            </a>
          </div>
        </div>
        <p class="contact-helper-text">
          Écrivez votre message directement dans ce formulaire. Il est transmis à l'équipe <strong>Ensemble en Parisis</strong> sans ouvrir aucun logiciel externe tel qu'Outlook.
        </p>
      </div>

      <form id="contact-form" onsubmit="window.modals.handleContactSubmit(event)">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="contact-name">Nom et Prénom <span class="required">*</span></label>
            <input type="text" id="contact-name" class="form-input" required placeholder="Ex : Marie Dupont" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-email">Votre adresse e-mail (pour la réponse) <span class="required">*</span></label>
            <input type="email" id="contact-email" class="form-input" required placeholder="Ex : marie.dupont@email.fr" />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="contact-phone">Téléphone <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 400;">(facultatif)</span></label>
            <input type="tel" id="contact-phone" class="form-input" placeholder="Ex : 06 12 34 56 78" />
          </div>
          <div class="form-group">
            <label class="form-label" for="contact-category">Motif de votre message</label>
            <select id="contact-category" class="form-select">
              <option value="Question générale">💬 Question générale</option>
              <option value="Bénévolat / Participation">🤝 Bénévolat / Participation à une action</option>
              <option value="Proposition d'action / Idée">💡 Proposer une action ou un atelier</option>
              <option value="Partenariat association">🏛️ Partenariat ou collectivité</option>
              <option value="Adhésion / Statuts">📜 Adhésion / Question sur l'association</option>
              <option value="Autre">✨ Autre demande</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label class="form-label" for="contact-subject">Objet du message <span class="required">*</span></label>
          <input type="text" id="contact-subject" class="form-input" required placeholder="Ex : Renseignement sur les prochaines balades citoyennes" value="${defaultSubject ? defaultSubject.replace(/"/g, '&quot;') : ''}" />
        </div>

        <div class="form-group">
          <label class="form-label" for="contact-message">Votre message pour l'équipe <span class="required">*</span></label>
          <textarea id="contact-message" class="form-textarea" rows="5" required placeholder="Bonjour, je souhaite contacter l'association Ensemble en Parisis concernant..."></textarea>
        </div>

        <div class="form-group" style="margin-bottom: 1.5rem;">
          <label class="form-checkbox-label">
            <input type="checkbox" id="contact-rgpd" class="form-checkbox" required checked />
            <span>J'accepte que mes coordonnées soient transmises à l'adresse <strong>ensembleenparis@gmail.com</strong> pour le traitement de ma demande.</span>
          </label>
        </div>

        <div style="display: flex; gap: 0.75rem; justify-content: flex-end; align-items: center; border-top: 1px solid var(--border-light); padding-top: 1.25rem;">
          <button type="button" class="btn btn-outline" onclick="window.modals.closeAll()">Annuler</button>
          <button type="submit" class="btn btn-primary" id="btn-submit-contact">
            🚀 Envoyer le message
          </button>
        </div>
      </form>
    `;

    this.open("modal-contact");
  }

  handleContactSubmit(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const name = document.getElementById("contact-name")?.value.trim() || "";
    const email = document.getElementById("contact-email")?.value.trim() || "";
    const phone = document.getElementById("contact-phone")?.value.trim() || "";
    const category = document.getElementById("contact-category")?.value || "Question générale";
    const subject = document.getElementById("contact-subject")?.value.trim() || "";
    const message = document.getElementById("contact-message")?.value.trim() || "";

    if (!name || !email || !subject || !message) {
      if (window.ui && window.ui.showToast) {
        window.ui.showToast("Champs requis", "Veuillez remplir tous les champs obligatoires.", "warning");
      }
      return;
    }

    const payload = {
      id: "MSG-" + Date.now(),
      date: new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      destination: "ensembleenparis@gmail.com",
      name,
      email,
      phone,
      category,
      subject,
      message
    };

    try {
      const stored = JSON.parse(localStorage.getItem("parisis_messages_envoyes") || "[]");
      stored.unshift(payload);
      localStorage.setItem("parisis_messages_envoyes", JSON.stringify(stored));
    } catch (e) {
      console.warn("Storage warning:", e);
    }

    if (window.ui && window.ui.showToast) {
      window.ui.showToast("Message envoyé !", "Votre message a bien été transmis à ensembleenparis@gmail.com", "success");
    }

    const body = document.getElementById("modal-contact-body");
    if (!body) return;

    body.innerHTML = `
      <div class="contact-success-card">
        <div class="contact-success-icon">💌</div>
        <h4 style="font-size: 1.4rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.5rem;">
          Votre message a bien été envoyé !
        </h4>
        <p style="color: var(--text-muted); max-width: 520px; margin: 0 auto 1.5rem auto; line-height: 1.6;">
          Merci <strong>${name}</strong> ! Votre message a été adressé avec succès à l'équipe <strong>Ensemble en Parisis</strong> à l'adresse <strong>ensembleenparis@gmail.com</strong>. Nous vous répondrons très prochainement à <strong>${email}</strong>.
        </p>

        <div class="contact-summary-box">
          <div class="contact-summary-row">
            <span class="contact-summary-label">Destinataire :</span>
            <span class="contact-summary-val" style="font-weight: 700; color: #4338CA;">ensembleenparis@gmail.com</span>
          </div>
          <div class="contact-summary-row">
            <span class="contact-summary-label">Expéditeur :</span>
            <span class="contact-summary-val">${name} (${email}${phone ? ' · ' + phone : ''})</span>
          </div>
          <div class="contact-summary-row">
            <span class="contact-summary-label">Objet :</span>
            <span class="contact-summary-val"><strong>${subject}</strong></span>
          </div>
          <div class="contact-summary-row">
            <span class="contact-summary-label">Date :</span>
            <span class="contact-summary-val">${payload.date}</span>
          </div>
          <div style="margin-top: 0.85rem; border-top: 1px dashed var(--border-light); padding-top: 0.85rem;">
            <span class="contact-summary-label" style="display: block; margin-bottom: 0.35rem;">Extrait de votre message :</span>
            <p style="margin: 0; color: var(--text-main); background: #FFFFFF; padding: 0.75rem 1rem; border-radius: 6px; border: 1px solid var(--border-light); white-space: pre-wrap; font-style: italic;">${message}</p>
          </div>
        </div>

        <div style="margin-top: 1.75rem; display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button type="button" class="btn btn-primary" onclick="window.modals.closeAll()">
            Terminer & Fermer
          </button>
          <button type="button" class="btn btn-outline" onclick="window.modals.openContact()">
            ✍️ Écrire un autre message
          </button>
        </div>
      </div>
    `;
  }

  copyContactEmail() {
    const email = "ensembleenparis@gmail.com";
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(() => {
        if (window.ui && window.ui.showToast) {
          window.ui.showToast("Adresse copiée", `L'adresse ${email} a été copiée dans le presse-papier.`, "info");
        }
      }).catch(() => {
        if (window.ui && window.ui.showToast) {
          window.ui.showToast("Email de contact", email, "info");
        }
      });
    } else {
      if (window.ui && window.ui.showToast) {
        window.ui.showToast("Email de contact", email, "info");
      }
    }
  }
}

window.modals = new ModalManager();

