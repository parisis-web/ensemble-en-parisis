/**
 * GESTIONNAIRE D'AFFICHAGE & RENDU UI (DOM, COMPOSANTS, TOASTS)
 */

class UIManager {
  constructor() {
    this.toastContainer = null;
    this.setupToasts();
  }

  setupToasts() {
    let container = document.querySelector(".toast-container");
    if (!container) {
      container = document.createElement("div");
      container.className = "toast-container";
      document.body.appendChild(container);
    }
    this.toastContainer = container;
  }

  showToast(title, message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        <div class="toast-message">${message}</div>
      </div>
      <button class="toast-close" aria-label="Fermer">✕</button>
    `;

    toast.querySelector(".toast-close").addEventListener("click", () => {
      toast.classList.add("slide-out");
      setTimeout(() => toast.remove(), 300);
    });

    this.toastContainer.appendChild(toast);

    setTimeout(() => {
      if (toast.parentNode) {
        toast.style.animation = "slide-out 0.3s forwards";
        setTimeout(() => toast.remove(), 300);
      }
    }, 4500);
  }

  // Rendu de la grille des 6 thématiques
  renderThemesGrid() {
    const container = document.getElementById("themes-grid-container");
    if (!container) return;

    container.innerHTML = Object.values(THEMES_DATA).map(theme => `
      <div class="theme-card" data-theme="${theme.id}" onclick="window.ui.filterByTheme('${theme.id}')" role="button" tabindex="0">
        <div class="theme-card-top">
          <div class="theme-icon-wrap">${theme.icon}</div>
          <span class="theme-count-pill">${theme.count} actions</span>
        </div>
        <h3 class="theme-card-title">${theme.name}</h3>
        <p class="theme-card-desc">${theme.desc}</p>
        <span class="theme-card-link">
          Explorer les missions <span>→</span>
        </span>
      </div>
    `).join("");
  }

  // Filtrage rapide au clic sur une thématique
  filterByTheme(themeId) {
    window.state.setFilter("theme", themeId);
    const explorerSection = document.getElementById("catalogue-section");
    if (explorerSection) {
      explorerSection.scrollIntoView({ behavior: "smooth" });
    }
    this.showToast("Filtre appliqué", `Affichage des missions pour : ${THEMES_DATA[themeId].name}`, "info");
  }

  // Rendu des actions dans la grille
  renderActions(actions) {
    const grid = document.getElementById("actions-grid-container");
    const countBadge = document.getElementById("results-count-badge");
    if (!grid) return;

    if (countBadge) {
      countBadge.textContent = `${actions.length} action${actions.length > 1 ? "s" : ""} disponible${actions.length > 1 ? "s" : ""}`;
    }

    if (actions.length === 0) {
      grid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: #FFFFFF; border-radius: var(--radius-lg); border: 1px solid var(--border-light);">
          <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
          <h3 style="font-size: 1.3rem; margin-bottom: 0.5rem;">Aucune action trouvée</h3>
          <p style="color: var(--text-muted); margin-bottom: 1.5rem;">Essayez d'élargir vos filtres ou de sélectionner une autre commune.</p>
          <button class="btn btn-outline" onclick="window.state.resetFilters()">Réinitialiser les filtres</button>
        </div>
      `;
      return;
    }

    grid.innerHTML = actions.map(action => {
      const theme = THEMES_DATA[action.theme] || THEMES_DATA.env;
      const spotsLeft = action.spotsTotal - action.spotsTaken;
      const isFav = window.state.favorites.includes(action.id);
      const isRegistered = window.state.user.registeredActions.includes(action.id);
      const percentTaken = Math.round((action.spotsTaken / action.spotsTotal) * 100);

      return `
        <article class="action-card" id="${action.id}">
          <div class="action-card-header">
            <img src="${action.image}" alt="${action.title}" class="action-card-img" loading="lazy" />
            <div class="action-header-badges">
              <span class="badge badge-${action.theme}">
                ${theme.icon} ${theme.shortName}
              </span>
              <button class="action-favorite-btn ${isFav ? "active" : ""}" onclick="window.state.toggleFavorite('${action.id}')" aria-label="Favori">
                ${isFav ? "❤️" : "🤍"}
              </button>
            </div>
          </div>

          <div class="action-card-body">
            <div class="action-org-info">
              <span class="action-org-avatar">${action.associationLogo || "🏢"}</span>
              <span class="action-org-name">${action.association}</span>
            </div>

            <h3 class="action-title">${action.title}</h3>
            <p class="action-description">${action.description}</p>

            <div class="action-meta-list">
              <div class="action-meta-item">
                <span>📍</span>
                <span><strong>${action.commune}</strong> (${action.address})</span>
              </div>
              <div class="action-meta-item">
                <span>📅</span>
                <span>${action.date} · <strong>${action.time}</strong></span>
              </div>
            </div>

            <div class="action-spots-bar-wrap">
              <div class="action-spots-info">
                <span>${action.spotsTaken} inscrits</span>
                <span style="color: ${spotsLeft <= 3 ? "var(--status-urgent)" : "var(--primary)"};">
                  ${spotsLeft > 0 ? `Reste ${spotsLeft} place${spotsLeft > 1 ? "s" : ""}` : "Complet"}
                </span>
              </div>
              <div class="spots-progress-track">
                <div class="spots-progress-fill ${spotsLeft <= 3 ? "almost-full" : ""}" style="width: ${percentTaken}%;"></div>
              </div>
            </div>

            <div class="action-card-footer">
              <button class="btn btn-outline btn-sm" onclick="window.modals.openDetails('${action.id}')">
                Détails
              </button>
              ${isRegistered ? `
                <button class="btn btn-secondary btn-sm" style="flex: 1;" disabled>
                  ✓ Déjà inscrit
                </button>
              ` : `
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="window.modals.openRegistration('${action.id}')">
                  Je participe
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  // Rendu de la vue calendrier
  renderCalendarView(actions) {
    const container = document.getElementById("calendar-view-container");
    if (!container) return;

    // Regrouper par date
    const grouped = {};
    actions.forEach(action => {
      if (!grouped[action.date]) grouped[action.date] = [];
      grouped[action.date].push(action);
    });

    container.innerHTML = `
      <div class="calendar-header">
        <h3 style="font-size: 1.3rem;">📅 Calendrier des prochaines actions solidaires</h3>
        <span class="badge badge-env">${actions.length} événements prévus</span>
      </div>
      <div class="calendar-timeline">
        ${Object.keys(grouped).map(date => `
          <div class="calendar-day-group">
            <div class="calendar-day-title">${date}</div>
            ${grouped[date].map(item => `
              <div class="calendar-action-row">
                <div>
                  <span class="badge badge-${item.theme}" style="margin-right: 8px;">${THEMES_DATA[item.theme].shortName}</span>
                  <strong>${item.title}</strong>
                  <span style="color: var(--text-muted); margin-left: 8px;">📍 ${item.commune} (${item.time})</span>
                </div>
                <button class="btn btn-primary btn-sm" onclick="window.modals.openRegistration('${item.id}')">
                  Participer
                </button>
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    `;
  }

  // Rendu des avis et témoignages
  renderTestimonials() {
    const container = document.getElementById("testimonials-container");
    if (!container) return;

    container.innerHTML = TESTIMONIALS_DATA.map(t => `
      <div class="testimonial-card">
        <p class="testimonial-quote">« ${t.quote} »</p>
        <div class="testimonial-author">
          <img src="${t.avatar}" alt="${t.author}" class="testimonial-avatar" />
          <div>
            <div class="testimonial-name">${t.author}</div>
            <div class="testimonial-role">${t.role}</div>
          </div>
        </div>
      </div>
    `).join("");
  }

  // Remplissage dynamique des sélecteurs de communes
  populateCommunes() {
    const selects = document.querySelectorAll(".commune-select-populate");
    selects.forEach(select => {
      select.innerHTML = COMMUNES_PARISIS.map(c => `
        <option value="${c}">${c}</option>
      `).join("");
    });
  }

  // Animation des compteurs d'impact
  animateCounters() {
    const counters = document.querySelectorAll(".animate-counter");
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute("data-target"), 10);
      let count = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        count += step;
        if (count >= target) {
          count = target;
          clearInterval(timer);
        }
        counter.textContent = count.toLocaleString("fr-FR");
      }, 30);
    });
  }
}

window.ui = new UIManager();
