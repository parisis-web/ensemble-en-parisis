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

window.territoryMap = new TerritoryMap();
