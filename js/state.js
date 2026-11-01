/**
 * GESTIONNAIRE D'ÉTAT (STATE MANAGEMENT & LOCAL STORAGE)
 */

class AppState {
  constructor() {
    this.STORAGE_KEY_ACTIONS = "ensemble_parisis_actions";
    this.STORAGE_KEY_USER = "ensemble_parisis_user";
    this.STORAGE_KEY_FAVORITES = "ensemble_parisis_favorites";

    // Initialisation des données locales
    this.actions = this.loadActions();
    this.user = this.loadUser();
    this.favorites = this.loadFavorites();

    // État des filtres
    this.filters = {
      query: "",
      commune: "Toutes les communes",
      theme: "all",
      type: "all",
      availability: "all",
      accessibility: []
    };

    // Mode d'affichage actif : 'grid' | 'map' | 'calendar'
    this.activeView = "grid";

    // Listeners pour les abonnements
    this.listeners = [];
  }

  // Charger les actions (fusion données initiales + créations utilisateur)
  loadActions() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_ACTIONS);
      if (stored) {
        const parsed = JSON.parse(stored);
        const customOnly = parsed.filter(p => !INITIAL_ACTIONS.some(init => init.id === p.id));
        return [...INITIAL_ACTIONS, ...customOnly];
      }
    } catch (e) {
      console.warn("Erreur chargement actions localStorage", e);
    }
    return [...INITIAL_ACTIONS];
  }

  // Sauvegarder une nouvelle action créée par l'utilisateur / association
  addAction(newAction) {
    const customActions = [];
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_ACTIONS);
      if (stored) {
        customActions.push(...JSON.parse(stored));
      }
      customActions.unshift(newAction);
      localStorage.setItem(this.STORAGE_KEY_ACTIONS, JSON.stringify(customActions));
    } catch (e) {
      console.warn("Erreur sauvegarde action", e);
    }

    this.actions.unshift(newAction);
    this.notify();
  }

  // Profil & Inscriptions de l'utilisateur
  loadUser() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_USER);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Erreur profil utilisateur", e);
    }
    return {
      name: "Claire Martin",
      email: "claire.martin@email.fr",
      phone: "06 12 34 56 78",
      hoursContributed: 14,
      missionsCompleted: 4,
      registeredActions: ["act-1", "act-4"],
      badges: CITIZEN_BADGES
    };
  }

  saveUser() {
    try {
      localStorage.setItem(this.STORAGE_KEY_USER, JSON.stringify(this.user));
    } catch (e) {
      console.warn("Erreur sauvegarde utilisateur", e);
    }
    this.notify();
  }

  registerToMission(actionId, volunteerData) {
    const action = this.actions.find(a => a.id === actionId);
    if (!action) return false;

    if (!this.user.registeredActions.includes(actionId)) {
      this.user.registeredActions.push(actionId);
      this.user.hoursContributed += 3;
      action.spotsTaken = Math.min(action.spotsTotal, action.spotsTaken + 1);
      this.saveUser();
      return true;
    }
    return false;
  }

  // Gestion des favoris
  loadFavorites() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY_FAVORITES);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Erreur favoris", e);
    }
    return ["act-2"];
  }

  toggleFavorite(actionId) {
    if (this.favorites.includes(actionId)) {
      this.favorites = this.favorites.filter(id => id !== actionId);
    } else {
      this.favorites.push(actionId);
    }
    try {
      localStorage.setItem(this.STORAGE_KEY_FAVORITES, JSON.stringify(this.favorites));
    } catch (e) {
      console.warn("Erreur sauvegarde favoris", e);
    }
    this.notify();
  }

  // Mise à jour des filtres
  setFilter(key, value) {
    this.filters[key] = value;
    this.notify();
  }

  resetFilters() {
    this.filters = {
      query: "",
      commune: "Toutes les communes",
      theme: "all",
      type: "all",
      availability: "all",
      accessibility: []
    };
    this.notify();
  }

  setView(viewName) {
    this.activeView = viewName;
    this.notify();
  }

  // Obtenir les actions filtrées
  getFilteredActions() {
    return this.actions.filter(action => {
      // 1. Filtre mot-clé
      if (this.filters.query) {
        const q = this.filters.query.toLowerCase();
        const matchesTitle = action.title.toLowerCase().includes(q);
        const matchesDesc = action.description.toLowerCase().includes(q);
        const matchesAsso = action.association.toLowerCase().includes(q);
        const matchesTags = action.tags && action.tags.some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesDesc && !matchesAsso && !matchesTags) return false;
      }

      // 2. Filtre commune
      if (this.filters.commune && this.filters.commune !== "Toutes les communes") {
        if (action.commune !== this.filters.commune) return false;
      }

      // 3. Filtre thématique
      if (this.filters.theme && this.filters.theme !== "all") {
        if (action.theme !== this.filters.theme) return false;
      }

      // 4. Filtre type
      if (this.filters.type && this.filters.type !== "all") {
        if (this.filters.type === "atelier") {
          if (action.type !== "atelier" && action.type !== "evenement") return false;
        } else if (action.type !== this.filters.type) {
          return false;
        }
      }

      // 5. Filtre disponibilité
      if (this.filters.availability && this.filters.availability !== "all") {
        if (this.filters.availability === "weekend" && !action.isWeekend) return false;
        if (this.filters.availability === "urgent" && !action.isUrgent) return false;
      }

      return true;
    });
  }

  // Gestion des adhésions
  saveMembership(membershipData) {
    try {
      localStorage.setItem("ensemble_parisis_membership", JSON.stringify(membershipData));
      if (this.user) {
        this.user.isMember = true;
        this.user.membershipDate = new Date().toISOString();
        this.saveUser();
      }
    } catch (e) {
      console.warn("Erreur sauvegarde adhésion", e);
    }
    this.notify();
  }

  getMembership() {
    try {
      const stored = localStorage.getItem("ensemble_parisis_membership");
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Erreur lecture adhésion", e);
    }
    return null;
  }

  // Système d'écoute et d'événements
  subscribe(callback) {
    this.listeners.push(callback);
  }

  notify() {
    this.listeners.forEach(cb => cb(this));
  }
}

// Instance globale du State
window.state = new AppState();
