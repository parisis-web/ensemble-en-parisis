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

  // ==========================================================================
  // GESTION & RENDU DES STATUTS DE L'ASSOCIATION (LOI 1901) - VOLET DÉPLIABLE
  // ==========================================================================
  initStatuts() {
    this.isStatutsExpanded = false;
    this.currentStatutsCategory = "all";
    this.currentStatutsSearch = "";
    this.renderStatutsTabs();
    this.renderStatuts();
    this.setupStatutsListeners();

    // Vérifier si un lien d'ancrage direct (#statuts-section ou #article-X) est présent
    if (window.location.hash === "#statuts-section") {
      this.toggleStatutsSection(true);
    } else if (window.location.hash.startsWith("#article-")) {
      const artNum = parseInt(window.location.hash.replace("#article-", ""), 10);
      if (!isNaN(artNum)) {
        setTimeout(() => this.openArticle(artNum), 300);
      }
    }
  }

  toggleStatutsSection(forceOpen) {
    const wrapper = document.getElementById("statuts-collapsible-wrapper");
    const toggleBtn = document.getElementById("statuts-toggle-main-btn");
    const btnText = document.getElementById("statuts-toggle-btn-text");
    const summaryCard = document.getElementById("statuts-summary-card");

    if (forceOpen !== undefined) {
      this.isStatutsExpanded = forceOpen;
    } else {
      this.isStatutsExpanded = !this.isStatutsExpanded;
    }

    if (wrapper) {
      if (this.isStatutsExpanded) {
        wrapper.style.display = "block";
        wrapper.classList.add("is-open");
      } else {
        wrapper.style.display = "none";
        wrapper.classList.remove("is-open");
      }
    }

    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", this.isStatutsExpanded ? "true" : "false");
      if (this.isStatutsExpanded) {
        toggleBtn.classList.add("is-active");
      } else {
        toggleBtn.classList.remove("is-active");
      }
    }

    if (btnText) {
      btnText.textContent = this.isStatutsExpanded
        ? "Replier les statuts officiels"
        : "Déplier les statuts officiels (16 articles)";
    }

    if (summaryCard) {
      if (this.isStatutsExpanded) {
        summaryCard.classList.add("is-expanded");
      } else {
        summaryCard.classList.remove("is-expanded");
      }
    }
  }

  openStatuts(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.toggleStatutsSection(true);
    const section = document.getElementById("statuts-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  openArticle(num) {
    this.toggleStatutsSection(true);
    if (this.currentStatutsCategory !== "all" && this.currentStatutsCategory !== "signataires") {
      this.currentStatutsCategory = "all";
      this.renderStatutsTabs();
      this.renderStatuts();
    }

    setTimeout(() => {
      const artElement = document.getElementById(`article-${num}`);
      if (artElement) {
        artElement.open = true;
        artElement.scrollIntoView({ behavior: "smooth", block: "center" });
        artElement.classList.add("highlight-article");
        setTimeout(() => artElement.classList.remove("highlight-article"), 2000);
      }
    }, 150);
  }

  expandAllArticles() {
    this.toggleStatutsSection(true);
    const detailsList = document.querySelectorAll("#statuts-articles-container .statuts-accordion-card");
    detailsList.forEach(det => det.open = true);
    this.showToast("Statuts", "Tous les articles sont maintenant dépliés.", "info");
  }

  collapseAllArticles() {
    const detailsList = document.querySelectorAll("#statuts-articles-container .statuts-accordion-card");
    detailsList.forEach(det => det.open = false);
    this.showToast("Statuts", "Tous les articles ont été repliés.", "info");
  }

  renderStatutsTabs() {
    const tabsContainer = document.getElementById("statuts-tabs-nav");
    if (!tabsContainer || typeof STATUTS_DATA === "undefined") return;

    tabsContainer.innerHTML = STATUTS_DATA.categories.map(cat => {
      const isActive = (this.currentStatutsCategory || "all") === cat.id;
      let count = "";
      if (cat.id === "all") count = `(${STATUTS_DATA.articles.length})`;
      else if (cat.id === "signataires") count = `(${STATUTS_DATA.signataires.length})`;
      else {
        const catCount = STATUTS_DATA.articles.filter(a => a.category === cat.id).length;
        count = `(${catCount})`;
      }

      return `
        <button class="statuts-tab-btn ${isActive ? 'active' : ''}" data-category="${cat.id}" onclick="window.ui.filterStatutsCategory('${cat.id}')">
          <span class="statuts-tab-icon">${cat.icon}</span>
          <span class="statuts-tab-text">${cat.label.replace(/^[^\s]+\s/, '')}</span>
          <span class="statuts-tab-badge">${count}</span>
        </button>
      `;
    }).join("");
  }

  filterStatutsCategory(categoryId) {
    this.currentStatutsCategory = categoryId;
    this.renderStatutsTabs();
    this.renderStatuts();
  }

  searchStatuts(query) {
    this.currentStatutsSearch = (query || "").trim().toLowerCase();
    if (this.currentStatutsSearch && !this.isStatutsExpanded) {
      this.toggleStatutsSection(true);
    }
    this.renderStatuts();
  }

  renderStatuts() {
    const container = document.getElementById("statuts-articles-container");
    if (!container || typeof STATUTS_DATA === "undefined") return;

    const category = this.currentStatutsCategory || "all";
    const query = this.currentStatutsSearch || "";

    // Filtrer les articles
    let articles = STATUTS_DATA.articles;
    if (category !== "all" && category !== "signataires") {
      articles = articles.filter(a => a.category === category);
    }

    if (query) {
      articles = articles.filter(a => 
        a.title.toLowerCase().includes(query) || 
        a.content.toLowerCase().includes(query) ||
        `article ${a.num}`.includes(query)
      );
    }

    let html = "";

    // Si on a choisi l'onglet des signataires
    if (category === "signataires") {
      html = this.renderSignaturesBlock();
      container.innerHTML = html;
      return;
    }

    if (articles.length === 0) {
      html = `
        <div class="statuts-empty-state">
          <div style="font-size: 2.5rem; margin-bottom: 0.5rem;">🔍</div>
          <h4>Aucun article ne correspond à votre recherche "${query}"</h4>
          <p>Essayez avec d'autres termes comme « adhésion », « siège », « bureau » ou « cotisation ».</p>
          <button class="btn btn-outline btn-sm" onclick="window.ui.searchStatuts(''); const input = document.getElementById('statuts-search-input'); if(input) input.value='';">
            Réinitialiser la recherche
          </button>
        </div>
      `;
      container.innerHTML = html;
      return;
    }

    // Si recherche active, ouvrir tous les articles correspondants par défaut
    const shouldOpenByDefault = Boolean(query);

    html = articles.map(art => {
      // Trouver la catégorie pour afficher un badge
      const catObj = STATUTS_DATA.categories.find(c => c.id === art.category);
      const catLabel = catObj ? catObj.label.replace(/^[^\s]+\s/, '') : "";

      return `
        <details class="statuts-accordion-card" id="article-${art.num}" ${shouldOpenByDefault ? 'open' : ''}>
          <summary class="statuts-accordion-header">
            <div class="statuts-accordion-title-group">
              <span class="statuts-num-badge">Art. ${art.num}</span>
              <h3 class="statuts-article-title">${art.title}</h3>
              ${catLabel ? `<span class="statuts-category-chip">${catLabel}</span>` : ''}
            </div>
            <div class="statuts-accordion-actions">
              <button type="button" class="statuts-copy-btn" onclick="event.stopPropagation(); event.preventDefault(); window.ui.copyArticleLink(${art.num})" title="Copier le lien direct vers cet article" aria-label="Copier le lien">
                🔗
              </button>
              <span class="statuts-accordion-chevron" aria-hidden="true">▼</span>
            </div>
          </summary>
          <div class="statuts-article-body">
            ${art.content}
          </div>
        </details>
      `;
    }).join("");

    // Si onglet "all", afficher le bloc des signatures à la fin
    if (category === "all" && !query) {
      html += this.renderSignaturesBlock();
    }

    container.innerHTML = html;
  }

  renderSignaturesBlock() {
    if (typeof STATUTS_DATA === "undefined") return "";
    return `
      <div class="statuts-signatures-section" id="statuts-signatures">
        <div class="statuts-signatures-header">
          <div class="signatures-stamp-badge">
            <span class="stamp-icon">⚖️</span>
            <div>
              <strong>Statuts certifiés & adoptés</strong>
              <div style="font-size: 0.8rem; color: var(--text-muted);">Fait à Herblay-sur-Seine · Le ${STATUTS_DATA.dateValidation}</div>
            </div>
          </div>
          <p class="signatures-intro">
            En foi de quoi, les présents statuts ont été formellement adoptés et signés par les membres du bureau fondateur :
          </p>
        </div>

        <div class="signatures-grid">
          ${STATUTS_DATA.signataires.map(s => `
            <div class="signature-card">
              <div class="signature-role">${s.role}</div>
              <div class="signature-name">${s.nom}</div>
              <div class="signature-handwritten">${s.signature}</div>
              <div class="signature-stamp">✓ Original signé</div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  copyArticleLink(num) {
    const url = `${window.location.origin}${window.location.pathname}#article-${num}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url);
    }
    this.showToast("Lien copié !", `Lien direct vers l'article ${num} copié dans le presse-papier.`, "info");
  }

  printStatuts() {
    // S'assurer que le volet et tous les articles sont ouverts avant l'impression
    this.toggleStatutsSection(true);
    this.expandAllArticles();
    setTimeout(() => {
      window.print();
    }, 250);
  }

  setupStatutsListeners() {
    const searchInput = document.getElementById("statuts-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.searchStatuts(e.target.value);
      });
    }

    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#statuts-section") {
        this.toggleStatutsSection(true);
      } else if (window.location.hash.startsWith("#article-")) {
        const artNum = parseInt(window.location.hash.replace("#article-", ""), 10);
        if (!isNaN(artNum)) {
          this.openArticle(artNum);
        }
      }
    });
  }
}

window.ui = new UIManager();

