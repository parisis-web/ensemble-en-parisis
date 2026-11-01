/**
 * GESTION DE LA CARTE INTERACTIVE (LEAFLET / OPENSTREETMAP)
 */

class TerritoryMap {
  constructor(containerId = "leaflet-map") {
    this.containerId = containerId;
    this.map = null;
    this.markersGroup = null;
    this.isInitialized = false;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container || this.isInitialized) return;

    // Coordonnées du centre du Parisis (entre Cormeilles, Franconville et Herblay)
    const parisisCenter = [48.985, 2.195];

    // Initialiser la carte Leaflet
    this.map = L.map(this.containerId, {
      center: parisisCenter,
      zoom: 12,
      scrollWheelZoom: false
    });

    // Fond de carte OpenStreetMap avec un style moderne (CartoDB Positron)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19
    }).addTo(this.map);

    this.markersGroup = L.layerGroup().addTo(this.map);
    this.isInitialized = true;

    // Rendre les marqueurs initiaux
    this.renderMarkers(window.state.getFilteredActions());
  }

  // Créer une icône personnalisée selon la thématique
  createThemeIcon(themeKey) {
    const theme = THEMES_DATA[themeKey] || THEMES_DATA.env;
    return L.divIcon({
      className: "custom-map-pin",
      html: `
        <div style="
          background-color: ${theme.color};
          width: 38px;
          height: 38px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          border: 2.5px solid #FFFFFF;
          cursor: pointer;
        ">
          <span style="
            transform: rotate(45deg);
            font-size: 16px;
            display: block;
          ">${theme.icon}</span>
        </div>
      `,
      iconSize: [38, 38],
      iconAnchor: [19, 38],
      popupAnchor: [0, -36]
    });
  }

  // Mettre à jour les marqueurs en fonction des actions filtrées
  renderMarkers(actions) {
    if (!this.map || !this.markersGroup) return;

    this.markersGroup.clearLayers();

    actions.forEach(action => {
      if (!action.coords || action.coords.length !== 2) return;

      const theme = THEMES_DATA[action.theme] || THEMES_DATA.env;
      const marker = L.marker(action.coords, {
        icon: this.createThemeIcon(action.theme)
      });

      // Contenu de la popup
      const popupHtml = `
        <div style="font-family: var(--font-body); min-width: 220px; padding: 4px;">
          <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
            <span style="background: ${theme.bgColor}; color: ${theme.textColor}; font-size: 11px; font-weight: 700; padding: 2px 8px; border-radius: 12px;">
              ${theme.shortName}
            </span>
            <span style="font-size: 12px; color: #64748B;">📍 ${action.commune}</span>
          </div>
          <h4 style="font-size: 13px; font-weight: 700; margin: 0 0 6px 0; line-height: 1.3; color: #0F172A;">
            ${action.title}
          </h4>
          <p style="font-size: 11px; color: #64748B; margin-bottom: 8px;">
            📅 ${action.date} (${action.time})
          </p>
          <button onclick="window.modals.openRegistration('${action.id}')" style="
            width: 100%;
            background: #059669;
            color: #FFFFFF;
            border: none;
            padding: 6px 12px;
            font-size: 12px;
            font-weight: 700;
            border-radius: 6px;
            cursor: pointer;
          ">
            Participer (${action.spotsTotal - action.spotsTaken} places)
          </button>
        </div>
      `;

      marker.bindPopup(popupHtml);
      this.markersGroup.addLayer(marker);
    });
  }

  // Redimensionner la carte lors du basculement d'onglet
  invalidateSize() {
    if (this.map) {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 150);
    }
  }
}

/**
 * CARTE DÉDIÉE DU TERRITOIRE & DES COMMUNES DU PARISIS
 */
class CommunesTerritoryMap {
  constructor(containerId = "territory-communes-map") {
    this.containerId = containerId;
    this.map = null;
    this.communesLayer = null;
    this.hubsLayer = null;
    this.zonesLayer = null;
    this.currentHubFilter = "all";
    this.selectedCommuneId = null;
    this.isInitialized = false;
  }

  init() {
    const container = document.getElementById(this.containerId);
    if (!container || this.isInitialized) return;

    const parisisCenter = [48.998, 2.205];

    this.map = L.map(this.containerId, {
      center: parisisCenter,
      zoom: 12,
      minZoom: 11,
      maxZoom: 17,
      scrollWheelZoom: false
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/">CARTO</a>',
      maxZoom: 19
    }).addTo(this.map);

    this.zonesLayer = L.layerGroup().addTo(this.map);
    this.communesLayer = L.layerGroup().addTo(this.map);
    this.hubsLayer = L.layerGroup().addTo(this.map);

    this.renderZonesAndCommunes();
    this.renderHubs(this.currentHubFilter);
    this.isInitialized = true;
  }

  createCommuneIcon(commune) {
    const isSelected = this.selectedCommuneId === commune.id;
    return L.divIcon({
      className: `commune-map-marker ${isSelected ? 'is-selected' : ''}`,
      html: `
        <div class="commune-pin-bubble" style="border-color: ${commune.color};">
          <span class="commune-pin-icon">${commune.icon}</span>
          <div class="commune-pin-text">
            <strong class="commune-pin-name">${commune.name}</strong>
            <span class="commune-pin-badge" style="background: ${commune.color}20; color: ${commune.color};">
              ${commune.codePostal} · ${commune.actionsCount} actions
            </span>
          </div>
        </div>
      `,
      iconSize: [160, 48],
      iconAnchor: [80, 24],
      popupAnchor: [0, -26]
    });
  }

  createHubIcon(hub) {
    const typeColors = {
      jardin: { bg: "#16A34A", text: "#FFFFFF" },
      solidarite: { bg: "#EA580C", text: "#FFFFFF" },
      "tiers-lieu": { bg: "#0284C7", text: "#FFFFFF" },
      education: { bg: "#7C3AED", text: "#FFFFFF" },
      mairie: { bg: "#3B0764", text: "#FFFFFF" }
    };
    const style = typeColors[hub.type] || { bg: "#059669", text: "#FFFFFF" };

    return L.divIcon({
      className: "hub-map-pin",
      html: `
        <div class="hub-pin-inner" style="background: ${style.bg}; box-shadow: 0 4px 10px ${style.bg}60;" title="${hub.name}">
          <span>${hub.icon}</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -18]
    });
  }

  renderZonesAndCommunes() {
    if (!this.map || !this.zonesLayer || !this.communesLayer) return;

    this.zonesLayer.clearLayers();
    this.communesLayer.clearLayers();

    if (typeof COMMUNES_TERRITOIRE_DATA === "undefined") return;

    COMMUNES_TERRITOIRE_DATA.forEach(commune => {
      // 1. Zone circulaire douce de rayonnement
      const circle = L.circle(commune.coords, {
        radius: 1200,
        color: commune.color,
        weight: 1.5,
        opacity: 0.7,
        fillColor: commune.color,
        fillOpacity: this.selectedCommuneId === commune.id ? 0.22 : 0.08
      });

      circle.on("click", () => {
        this.selectCommune(commune.id, true);
      });

      circle.on("mouseover", () => {
        circle.setStyle({ fillOpacity: 0.25, weight: 2.5 });
      });

      circle.on("mouseout", () => {
        circle.setStyle({
          fillOpacity: this.selectedCommuneId === commune.id ? 0.22 : 0.08,
          weight: this.selectedCommuneId === commune.id ? 2.5 : 1.5
        });
      });

      this.zonesLayer.addLayer(circle);

      // 2. Marqueur interactif de la commune
      const marker = L.marker(commune.coords, {
        icon: this.createCommuneIcon(commune),
        zIndexOffset: 100
      });

      marker.on("click", () => {
        this.selectCommune(commune.id, true);
      });

      this.communesLayer.addLayer(marker);
    });
  }

  renderHubs(filterType = "all") {
    if (!this.map || !this.hubsLayer || typeof TERRITOIRE_HUBS_DATA === "undefined") return;

    this.hubsLayer.clearLayers();

    const filtered = TERRITOIRE_HUBS_DATA.filter(hub => {
      if (filterType === "all") return true;
      return hub.type === filterType;
    });

    filtered.forEach(hub => {
      const marker = L.marker(hub.coords, {
        icon: this.createHubIcon(hub),
        zIndexOffset: 50
      });

      const popupContent = `
        <div class="hub-popup-content">
          <div class="hub-popup-header">
            <span class="hub-popup-icon">${hub.icon}</span>
            <div>
              <h4 class="hub-popup-title">${hub.name}</h4>
              <span class="hub-popup-commune">📍 ${hub.commune}</span>
            </div>
          </div>
          <p class="hub-popup-desc">${hub.desc}</p>
          <button class="btn btn-primary btn-xs" onclick="window.state.setFilter('commune', '${hub.commune}'); document.getElementById('catalogue-section')?.scrollIntoView({ behavior: 'smooth' });">
            Voir les actions à ${hub.commune} →
          </button>
        </div>
      `;

      marker.bindPopup(popupContent);
      this.hubsLayer.addLayer(marker);
    });
  }

  selectCommune(communeId, flyTo = true) {
    this.selectedCommuneId = communeId;
    const commune = COMMUNES_TERRITOIRE_DATA.find(c => c.id === communeId);
    if (!commune) return;

    if (flyTo && this.map) {
      this.map.flyTo(commune.coords, 14, { duration: 1.2 });
    }

    this.renderZonesAndCommunes();

    if (window.ui && typeof window.ui.renderCommuneInfoPanel === "function") {
      window.ui.renderCommuneInfoPanel(communeId);
    }
  }

  filterHubs(type) {
    this.currentHubFilter = type;
    const buttons = document.querySelectorAll(".territory-hub-filter-btn");
    buttons.forEach(btn => {
      btn.classList.toggle("active", btn.getAttribute("data-hub-type") === type);
    });
    this.renderHubs(type);
  }

  resetView() {
    this.selectedCommuneId = null;
    if (this.map) {
      this.map.flyTo([48.998, 2.205], 12, { duration: 1 });
    }
    this.renderZonesAndCommunes();
    if (window.ui && typeof window.ui.renderCommuneInfoPanel === "function") {
      window.ui.renderCommuneInfoPanel(null);
    }
  }

  invalidateSize() {
    if (this.map) {
      setTimeout(() => {
        this.map.invalidateSize();
      }, 150);
    }
  }
}

window.territoryMap = new TerritoryMap();
window.communesMap = new CommunesTerritoryMap();
