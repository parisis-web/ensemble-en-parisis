/**
 * APPLICATION PRINCIPALE & INITIALISATION - ENSEMBLE EN PARISIS
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("🌟 Ensemble en Parisis - Application Initialized");

  // 1. Initialiser les sélecteurs de communes et la grille de thématiques
  window.ui.populateCommunes();
  window.ui.renderThemesGrid();
  window.ui.renderTestimonials();

  // 2. Initialiser la carte Leaflet
  window.territoryMap.init();

  // 3. Premier rendu des actions
  const initialActions = window.state.getFilteredActions();
  window.ui.renderActions(initialActions);
  window.ui.renderCalendarView(initialActions);
  window.territoryMap.renderMarkers(initialActions);
  window.ui.animateCounters();

  // 4. Souscription aux changements du State
  window.state.subscribe((state) => {
    const filtered = state.getFilteredActions();
    window.ui.renderActions(filtered);
    window.ui.renderCalendarView(filtered);
    window.territoryMap.renderMarkers(filtered);
  });

  // 5. Configuration des filtres de la barre Hero
  const heroQuery = document.getElementById("hero-search-query");
  const heroCommune = document.getElementById("hero-search-commune");
  const heroTheme = document.getElementById("hero-search-theme");
  const heroSearchBtn = document.getElementById("hero-search-btn");

  if (heroSearchBtn) {
    heroSearchBtn.addEventListener("click", () => {
      if (heroQuery) window.state.setFilter("query", heroQuery.value);
      if (heroCommune) window.state.setFilter("commune", heroCommune.value);
      if (heroTheme) window.state.setFilter("theme", heroTheme.value);

      const catalogue = document.getElementById("catalogue-section");
      if (catalogue) catalogue.scrollIntoView({ behavior: "smooth" });
    });
  }

  // 6. Configuration des filtres du Catalogue
  const filterQuery = document.getElementById("filter-query");
  const filterCommune = document.getElementById("filter-commune");
  const filterType = document.getElementById("filter-type");
  const filterAvailability = document.getElementById("filter-availability");

  if (filterQuery) {
    filterQuery.addEventListener("input", (e) => {
      window.state.setFilter("query", e.target.value);
    });
  }

  if (filterCommune) {
    filterCommune.addEventListener("change", (e) => {
      window.state.setFilter("commune", e.target.value);
    });
  }

  if (filterType) {
    filterType.addEventListener("change", (e) => {
      window.state.setFilter("type", e.target.value);
    });
  }

  if (filterAvailability) {
    filterAvailability.addEventListener("change", (e) => {
      window.state.setFilter("availability", e.target.value);
    });
  }

  // 7. Boutons de basculement d'affichage (Grille, Carte, Calendrier)
  const viewBtns = document.querySelectorAll(".view-toggle-btn");
  const gridContainer = document.getElementById("actions-grid-container");
  const mapContainer = document.getElementById("map-view-container");
  const calContainer = document.getElementById("calendar-view-container");

  viewBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      viewBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const view = btn.getAttribute("data-view");
      window.state.setView(view);

      if (gridContainer) gridContainer.style.display = view === "grid" ? "grid" : "none";
      if (mapContainer) mapContainer.style.display = view === "map" ? "block" : "none";
      if (calContainer) calContainer.style.display = view === "calendar" ? "block" : "none";

      if (view === "map") {
        window.territoryMap.invalidateSize();
      }
    });
  });

  // 8. Raccourcis clavier globaux (Cmd/Ctrl + K pour la recherche, Escape pour fermer)
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      window.modals.openQuickSearch();
    }
    if (e.key === "Escape") {
      window.modals.closeAll();
    }
  });

  // Recherche dans la modale rapide
  const quickSearchInput = document.getElementById("quick-search-input");
  if (quickSearchInput) {
    quickSearchInput.addEventListener("input", (e) => {
      window.modals.handleQuickSearch(e.target.value);
    });
  }

  // Formulaire Newsletter
  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("newsletter-email");
      if (email && email.value) {
        window.ui.showToast("Merci !", `Vous êtes bien inscrit(e) à la lettre d'information avec ${email.value}`, "success");
        email.value = "";
      }
    });
  }
});
