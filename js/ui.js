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

  // Rendu de la grille des 6 piliers d'action
  renderThemesGrid() {
    const container = document.getElementById("themes-grid-container");
    if (!container) return;

    container.innerHTML = Object.values(THEMES_DATA).map(theme => {
      return `
      <div class="theme-card" data-theme="${theme.id}" onclick="window.ui.filterByTheme('${theme.id}')" role="button" tabindex="0">
        <h3 class="theme-card-title">${theme.name}</h3>
        <p class="theme-card-desc">${theme.desc}</p>
      </div>
    `;
    }).join("");
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
      const isPoster = action.image && (action.image.includes("evenement") || action.image.includes("foret"));

      return `
        <article class="action-card ${action.isFeatured ? "action-card-featured" : ""}" id="${action.id}">
          <div class="action-card-header" onclick="window.modals.openDetails('${action.id}')" style="cursor: pointer;" title="Voir les détails de l'action">
            <img src="${action.image}" alt="${action.title}" class="action-card-img" loading="lazy" />
            <div class="action-header-badges">
              <span class="badge badge-${action.theme}">
                ${theme.icon} ${theme.shortName}
              </span>
              <div style="display: flex; gap: 6px; align-items: center;">
                ${isPoster ? `
                  <button class="action-poster-badge" onclick="event.stopPropagation(); window.modals.openImageLightbox('${action.image}', '${action.title.replace(/'/g, "\\'")}')" title="Agrandir l'affiche officielle">
                    🔍 Affiche
                  </button>
                ` : ""}
                ${action.type === "evenement" ? `
                  <span class="badge" style="background: rgba(253, 242, 248, 0.95); color: #BE185D; border: 1px solid #FBCFE8; font-weight: 700; font-size: 0.72rem; padding: 2px 7px;">
                    GRATUIT
                  </span>
                ` : ""}
                <button class="action-favorite-btn ${isFav ? "active" : ""}" onclick="event.stopPropagation(); window.state.toggleFavorite('${action.id}')" aria-label="Favori">
                  ${isFav ? "❤️" : "🤍"}
                </button>
              </div>
            </div>
          </div>

          <div class="action-card-body">
            <div class="action-org-info">
              <span class="action-org-avatar">${action.associationLogo || "🏢"}</span>
              <span class="action-org-name">${action.association}</span>
            </div>

            <h3 class="action-title" onclick="window.modals.openDetails('${action.id}')" style="cursor: pointer;">${action.title}</h3>
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
              ${isPoster ? `
                <button class="btn btn-outline btn-sm" onclick="window.modals.openImageLightbox('${action.image}', '${action.title.replace(/'/g, "\\'")}')" title="Voir l'affiche en plein écran">
                  🖼️ Affiche
                </button>
              ` : ""}
              ${isRegistered ? `
                <button class="btn btn-secondary btn-sm" style="flex: 1;" disabled>
                  ✓ Déjà inscrit
                </button>
              ` : `
                <button class="btn btn-primary btn-sm" style="flex: 1;" onclick="window.modals.openRegistration('${action.id}')">
                  ${action.type === "evenement" ? "Participer" : "Je participe"}
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
    document.body.classList.add("is-printing-statuts");
    this.toggleStatutsSection(true);
    this.expandAllArticles();
    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove("is-printing-statuts");
      }, 500);
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

  // ==========================================================================
  // GESTION & RENDU DU BULLETIN D'ADHÉSION OFFICIEL - VOLET DÉPLIABLE & SIGNATURE
  // ==========================================================================
  initAdhesion() {
    this.isAdhesionExpanded = false;
    this.hasAdhesionSignature = false;
    this.setupAdhesionDefaults();
    this.initAdhesionSignature();
    this.setupAdhesionListeners();

    if (window.location.hash === "#adhesion-section") {
      this.toggleAdhesionSection(true);
    }
  }

  setupAdhesionDefaults() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    const dateInput = document.getElementById("adh-fait-le");
    if (dateInput) {
      dateInput.value = `${day}/${month}/${year}`;
    }

    const cityInput = document.getElementById("adh-fait-a");
    if (cityInput && !cityInput.value) {
      cityInput.value = "Herblay-sur-Seine";
    }

    // Pré-remplir avec les informations de l'utilisateur si existantes
    if (window.state && window.state.user) {
      const user = window.state.user;
      const nomInput = document.getElementById("adh-nom");
      const prenomInput = document.getElementById("adh-prenom");
      const emailInput = document.getElementById("adh-email");
      const telInput = document.getElementById("adh-telephone");

      if (nomInput && prenomInput && user.name) {
        const parts = user.name.split(" ");
        if (parts.length > 1) {
          prenomInput.value = parts[0];
          nomInput.value = parts.slice(1).join(" ");
        } else {
          nomInput.value = user.name;
        }
      }
      if (emailInput && user.email) emailInput.value = user.email;
      if (telInput && user.phone) telInput.value = user.phone;
    }

    const cotisFixe = document.getElementById("adh-cotisation-fixe-radio");
    if (cotisFixe) cotisFixe.checked = true;
    const cotisLibre = document.getElementById("adh-cotisation-libre-radio");
    if (cotisLibre) cotisLibre.checked = false;
    const cotisLibreVal = document.getElementById("adh-cotisation-libre");
    if (cotisLibreVal) cotisLibreVal.value = "";
    const cotisVal = document.getElementById("adh-cotisation");
    if (cotisVal) cotisVal.value = "15";

    this.togglePropositions(true);
  }

  toggleAdhesionSection(forceOpen) {
    const wrapper = document.getElementById("adhesion-collapsible-wrapper");
    const toggleBtn = document.getElementById("adhesion-toggle-main-btn");
    const btnText = document.getElementById("adhesion-toggle-btn-text");
    const summaryCard = document.getElementById("adhesion-summary-card");

    if (forceOpen !== undefined) {
      this.isAdhesionExpanded = forceOpen;
    } else {
      this.isAdhesionExpanded = !this.isAdhesionExpanded;
    }

    if (wrapper) {
      if (this.isAdhesionExpanded) {
        wrapper.style.display = "block";
        wrapper.classList.add("is-open");
        setTimeout(() => this.resizeAdhesionCanvas(), 100);
      } else {
        wrapper.style.display = "none";
        wrapper.classList.remove("is-open");
      }
    }

    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", this.isAdhesionExpanded ? "true" : "false");
      if (this.isAdhesionExpanded) {
        toggleBtn.classList.add("is-active");
      } else {
        toggleBtn.classList.remove("is-active");
      }
    }

    if (btnText) {
      btnText.textContent = this.isAdhesionExpanded
        ? "Replier la fiche d'adhésion"
        : "Déplier la fiche d'adhésion officielle";
    }

    if (summaryCard) {
      if (this.isAdhesionExpanded) {
        summaryCard.classList.add("is-expanded");
      } else {
        summaryCard.classList.remove("is-expanded");
      }
    }
  }

  openAdhesion(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    this.toggleAdhesionSection(true);
    const section = document.getElementById("adhesion-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  initAdhesionSignature() {
    const canvas = document.getElementById("adhesion-signature-pad");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const hint = document.getElementById("adhesion-sig-hint");
    let isDrawing = false;

    this.resizeAdhesionCanvas();

    const getPos = (e) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      if (e.touches && e.touches.length > 0) {
        return {
          x: (e.touches[0].clientX - rect.left) * scaleX,
          y: (e.touches[0].clientY - rect.top) * scaleY
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY
      };
    };

    const startDraw = (e) => {
      isDrawing = true;
      const pos = getPos(e);
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.strokeStyle = "#1E3A8A";
      ctx.lineWidth = 2.5;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      if (hint) hint.style.display = "none";
      this.hasAdhesionSignature = true;
    };

    const draw = (e) => {
      if (!isDrawing) return;
      if (e.cancelable && e.type.startsWith("touch")) e.preventDefault();
      const pos = getPos(e);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
    };

    const stopDraw = () => {
      isDrawing = false;
    };

    canvas.addEventListener("mousedown", startDraw);
    canvas.addEventListener("mousemove", draw);
    window.addEventListener("mouseup", stopDraw);

    canvas.addEventListener("touchstart", startDraw, { passive: false });
    canvas.addEventListener("touchmove", draw, { passive: false });
    window.addEventListener("touchend", stopDraw);

    window.addEventListener("resize", () => {
      if (this.isAdhesionExpanded) {
        this.resizeAdhesionCanvas();
      }
    });
  }

  resizeAdhesionCanvas() {
    const canvas = document.getElementById("adhesion-signature-pad");
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width > 0 && (canvas.width !== rect.width || canvas.height !== rect.height)) {
      canvas.width = rect.width;
      canvas.height = rect.height || 130;
    }
  }

  clearAdhesionSignature() {
    const canvas = document.getElementById("adhesion-signature-pad");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const hint = document.getElementById("adhesion-sig-hint");
    if (hint) hint.style.display = "block";
    this.hasAdhesionSignature = false;
    this.showToast("Signature effacée", "Vous pouvez signer à nouveau.", "info");
  }

  printAdhesion(blank = false) {
    this.toggleAdhesionSection(true);
    document.body.classList.add("is-printing-adhesion");

    const form = document.getElementById("adhesion-form");
    const savedValues = {};

    if (blank && form) {
      const inputs = form.querySelectorAll("input");
      inputs.forEach(input => {
        savedValues[input.id || input.name] = input.value;
        if (input.type === "text" || input.type === "email" || input.type === "tel" || input.type === "number") {
          input.value = "";
        } else if (input.type === "checkbox" || input.type === "radio") {
          input.checked = false;
        }
      });
      this.clearAdhesionSignature();
    }

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        document.body.classList.remove("is-printing-adhesion");
        if (blank && form) {
          this.setupAdhesionDefaults();
          const inputs = form.querySelectorAll("input");
          inputs.forEach(input => {
            const id = input.id || input.name;
            if (savedValues[id] !== undefined) {
              input.value = savedValues[id];
            }
          });
        }
      }, 500);
    }, 250);
  }

  submitAdhesion(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }

    const form = document.getElementById("adhesion-form");
    if (!form) return;

    const formData = new FormData(form);
    const data = {
      nom: formData.get("nom"),
      prenom: formData.get("prenom"),
      adresse: formData.get("adresse"),
      codepostal: formData.get("codepostal"),
      ville: formData.get("ville"),
      telephone: formData.get("telephone"),
      email: formData.get("email"),
      adh_type: formData.get("adh_type"),
      cotisation: (formData.get("adh_cotisation_type") === "libre" && formData.get("cotisation_libre"))
        ? formData.get("cotisation_libre")
        : (formData.get("cotisation") || "15"),
      adh_reglement: formData.get("adh_reglement"),
      reglement_autre: formData.get("reglement_autre"),
      participation: formData.getAll("participation"),
      propositions: formData.get("propositions") || "",
      fait_a: formData.get("fait_a"),
      fait_le: formData.get("fait_le"),
      submittedAt: new Date().toISOString()
    };

    if (!data.nom || !data.prenom || !data.adresse || !data.email) {
      this.showToast("Formulaire incomplet", "Veuillez renseigner vos coordonnées obligatoires.", "error");
      return;
    }

    // Sauvegarde dans l'état global
    if (window.state) {
      window.state.saveMembership(data);
    }

    this.showToast("Adhésion validée !", `Bienvenue ${data.prenom} parmi les membres d'Ensemble en Parisis.`, "success");

    // Afficher la modale de confirmation avec la carte de membre
    if (window.modals) {
      window.modals.openAdhesionSuccess(data);
    }
  }

  togglePropositions(isActive) {
    const row = document.getElementById("adhesion-propositions-row");
    const input = document.getElementById("adh-propositions");
    const card = document.getElementById("card-part-idees");
    if (!row) return;

    if (isActive) {
      row.classList.remove("is-disabled");
      if (card) card.classList.add("is-checked");
      if (input) input.disabled = false;
    } else {
      row.classList.add("is-disabled");
      if (card) card.classList.remove("is-checked");
      if (input) input.disabled = true;
    }
  }

  appendProposition(text) {
    const input = document.getElementById("adh-propositions");
    const check = document.getElementById("adh-part-idees");
    if (check) check.checked = true;
    this.togglePropositions(true);
    if (!input) return;

    const trimmed = input.value.trim();
    if (trimmed) {
      if (!trimmed.toLowerCase().includes(text.toLowerCase())) {
        input.value = trimmed + ", " + text;
      }
    } else {
      input.value = text;
    }
    input.focus();
  }

  resetAdhesionForm() {
    const form = document.getElementById("adhesion-form");
    if (form) form.reset();
    this.clearAdhesionSignature();
    this.setupAdhesionDefaults();
    this.showToast("Réinitialisation", "Le formulaire d'adhésion a été remis à zéro.", "info");
  }

  setupAdhesionListeners() {
    window.addEventListener("hashchange", () => {
      if (window.location.hash === "#adhesion-section") {
        this.toggleAdhesionSection(true);
      }
    });
  }

  // ==========================================================================
  // GESTION DE LA CARTE DU TERRITOIRE & DÉCOUVERTE DES COMMUNES DU PARISIS
  // ==========================================================================
  openCarteTerritoire(event) {
    if (event && event.preventDefault) {
      event.preventDefault();
    }
    const section = document.getElementById("carte-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    if (window.communesMap) {
      window.communesMap.invalidateSize();
    }
  }

  renderCommuneInfoPanel(communeId) {
    const panel = document.getElementById("commune-info-panel");
    if (!panel) return;

    if (!communeId) {
      panel.innerHTML = `
        <div class="commune-panel-default">
          <div class="commune-panel-icon-hero">🗺️</div>
          <h3 class="commune-panel-title">Territoire de la Boucle du Parisis</h3>
          <p class="commune-panel-desc">
            10 communes interconnectées pour une dynamique citoyenne, solidaire et écologique dans le Val-d'Oise (95).
          </p>
          <div class="commune-panel-stats-grid">
            <div class="commune-stat-box">
              <span class="commune-stat-num">10</span>
              <span class="commune-stat-lbl">Communes</span>
            </div>
            <div class="commune-stat-box">
              <span class="commune-stat-num">280k+</span>
              <span class="commune-stat-lbl">Habitants</span>
            </div>
            <div class="commune-stat-box">
              <span class="commune-stat-num">120+</span>
              <span class="commune-stat-lbl">Associations</span>
            </div>
            <div class="commune-stat-box">
              <span class="commune-stat-num">15+</span>
              <span class="commune-stat-lbl">Tiers-Lieux & Jardins</span>
            </div>
          </div>
          <div class="commune-panel-hint">
            👉 <em>Cliquez sur une commune sur la carte ou dans la liste pour afficher ses spécificités et ses missions.</em>
          </div>
        </div>
      `;
      return;
    }

    const commune = COMMUNES_TERRITOIRE_DATA.find(c => c.id === communeId);
    if (!commune) return;

    const hubs = (typeof TERRITOIRE_HUBS_DATA !== "undefined")
      ? TERRITOIRE_HUBS_DATA.filter(h => h.commune === commune.name)
      : [];

    panel.innerHTML = `
      <div class="commune-panel-active">
        <div class="commune-panel-header">
          <div class="commune-panel-title-wrap">
            <span class="commune-panel-badge-icon" style="background: ${commune.color}20; color: ${commune.color};">${commune.icon}</span>
            <div>
              <h3 class="commune-panel-title">${commune.name}</h3>
              <span class="commune-panel-sub">Code Postal : <strong>${commune.codePostal}</strong> · ${commune.population}</span>
            </div>
          </div>
          <button class="btn btn-ghost btn-xs" onclick="window.communesMap.resetView()" title="Réinitialiser la vue">
            ✕
          </button>
        </div>

        <p class="commune-panel-desc">${commune.description}</p>

        <div class="commune-panel-stats-row">
          <div class="commune-mini-stat">
            <strong>${commune.actionsCount}</strong> missions actives
          </div>
          <div class="commune-mini-stat">
            <strong>${commune.associationsCount}</strong> associations
          </div>
          <div class="commune-mini-stat">
            <strong>${hubs.length}</strong> lieux citoyens
          </div>
        </div>

        ${hubs.length > 0 ? `
          <div class="commune-panel-hubs-section">
            <h4 class="commune-hubs-title">📍 Lieux & Espaces Partagés</h4>
            <div class="commune-hubs-list">
              ${hubs.map(h => `
                <div class="commune-hub-item">
                  <span class="commune-hub-icon">${h.icon}</span>
                  <div>
                    <strong>${h.name}</strong>
                    <div style="font-size: 0.8rem; color: var(--text-muted);">${h.desc}</div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : ""}

        <div class="commune-panel-cta-wrap">
          <button class="btn btn-primary btn-block" onclick="window.ui.filterByCommuneFromMap('${commune.name}')">
            🚀 Voir les missions à ${commune.name} →
          </button>
        </div>
      </div>
    `;

    // Mettre à jour l'état actif dans la grille de cartes
    const cards = document.querySelectorAll(".commune-discover-card");
    cards.forEach(card => {
      card.classList.toggle("is-active", card.getAttribute("data-commune-id") === communeId);
    });
  }

  renderCommunesCardsGrid() {
    const container = document.getElementById("communes-cards-grid");
    if (!container || typeof COMMUNES_TERRITOIRE_DATA === "undefined") return;

    container.innerHTML = COMMUNES_TERRITOIRE_DATA.map(commune => `
      <div class="commune-discover-card" data-commune-id="${commune.id}" onclick="window.communesMap.selectCommune('${commune.id}')">
        <div class="commune-card-top">
          <span class="commune-card-icon" style="background: ${commune.color}15; color: ${commune.color};">${commune.icon}</span>
          <span class="badge" style="background: var(--bg-subtle); color: var(--text-main); font-weight: 700;">${commune.codePostal}</span>
        </div>
        <h4 class="commune-card-name">${commune.name}</h4>
        <div class="commune-card-meta">
          <span>👥 ${commune.population}</span>
          <span>⚡ ${commune.actionsCount} missions</span>
        </div>
        <div class="commune-card-spots">
          ${commune.keySpots.slice(0, 2).map(spot => `<span class="commune-spot-pill">• ${spot}</span>`).join("")}
        </div>
        <div class="commune-card-actions">
          <button class="btn btn-ghost btn-xs" onclick="event.stopPropagation(); window.communesMap.selectCommune('${commune.id}');">
            📍 Zoomer
          </button>
          <button class="btn btn-primary btn-xs" onclick="event.stopPropagation(); window.ui.filterByCommuneFromMap('${commune.name}');">
            Missions →
          </button>
        </div>
      </div>
    `).join("");
  }

  filterByCommuneFromMap(communeName) {
    if (window.state) {
      window.state.setFilter("commune", communeName);
    }
    const catalogue = document.getElementById("catalogue-section");
    if (catalogue) {
      catalogue.scrollIntoView({ behavior: "smooth" });
    }
    this.showToast("Filtre Territoire", `Missions filtrées pour : ${communeName}`, "info");
  }
}

window.ui = new UIManager();

