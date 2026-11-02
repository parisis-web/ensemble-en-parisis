/**
 * DONNÉES LOCALES & CATALOGUE - ENSEMBLE EN PARISIS
 */

const THEMES_DATA = {
  env: {
    id: "env",
    name: "Environnement & Transition",
    shortName: "Environnement",
    icon: "🌱",
    color: "#16A34A",
    bgColor: "#DCFCE7",
    textColor: "#14532D",
    desc: "Ramassages citoyens, jardins partagés, ateliers zéro déchet, compostage et mobilités douces.",
    count: 14
  },
  solidarite: {
    id: "solidarite",
    name: "Solidarité & Aide aux personnes",
    shortName: "Solidarité",
    icon: "🤝",
    color: "#EA580C",
    bgColor: "#FFEDD5",
    textColor: "#7C2D12",
    desc: "Maraudes, aide aux personnes âgées isolées, banques alimentaires et inclusion sociale.",
    count: 22
  },
  citoyennete: {
    id: "citoyennete",
    name: "Vie locale & Citoyenneté",
    shortName: "Vie locale",
    icon: "🏛️",
    color: "#0284C7",
    bgColor: "#E0F2FE",
    textColor: "#0C4A6E",
    desc: "Conseils de quartier, concertations, balades de redécouverte de la nature et entraide locale.",
    count: 9
  },
  education: {
    id: "education",
    name: "Éducation & Transmission",
    shortName: "Éducation",
    icon: "📚",
    color: "#7C3AED",
    bgColor: "#EDE9FE",
    textColor: "#4C1D95",
    desc: "Soutien scolaire, ateliers d'inclusion numérique, partages de savoirs intergénérationnels.",
    count: 9
  },
  sante: {
    id: "sante",
    name: "Santé, Bien-être & Prévention",
    shortName: "Santé & Prévention",
    icon: "🩺",
    color: "#E11D48",
    bgColor: "#FFE4E6",
    textColor: "#881337",
    desc: "Sensibilisation, ateliers santé mentale & physique, formation aux gestes de premiers secours.",
    count: 6
  },
  culture: {
    id: "culture",
    name: "Culture, Sport & Loisirs solidaires",
    shortName: "Culture & Sport",
    icon: "🎭",
    color: "#D97706",
    bgColor: "#FEF3C7",
    textColor: "#78350F",
    desc: "Initiations sportives gratuites, événements culturels accessibles à tous et tiers-lieux vivants.",
    count: 18
  }
};

const COMMUNES_PARISIS = [
  "Toutes les communes",
  "Cormeilles-en-Parisis",
  "Herblay-sur-Seine",
  "Franconville",
  "Taverny",
  "Sannois",
  "Montigny-lès-Cormeilles",
  "Beauchamp",
  "Saint-Leu-la-Forêt",
  "Bessancourt",
  "Pierrelaye"
];

const COMMUNES_TERRITOIRE_DATA = [
  {
    id: "herblay",
    name: "Herblay-sur-Seine",
    codePostal: "95220",
    population: "32 150 hab.",
    coords: [48.9904, 2.1648],
    icon: "🌊",
    color: "#059669",
    description: "Bordée par la Seine, ville dynamique accueillant le siège officiel de l'association Ensemble en Parisis et de multiples initiatives citoyennes.",
    associationsCount: 42,
    actionsCount: 7,
    keySpots: ["Quai du Génie", "Jardin Partagé des Cailloux Gris", "Espace André Malraux", "Mairie d'Herblay"]
  },
  {
    id: "cormeilles",
    name: "Cormeilles-en-Parisis",
    codePostal: "95240",
    population: "25 400 hab.",
    coords: [48.9735, 2.2023],
    icon: "🌿",
    color: "#7C3AED",
    description: "Entre collines et carrières réaménagées, pôle culturel et éducatif très engagé dans l'inclusion numérique et la transition verte.",
    associationsCount: 35,
    actionsCount: 5,
    keySpots: ["Médiathèque L'Éclipse", "Fort de Cormeilles", "Théâtre du Cormier", "Jardin des Saveurs"]
  },
  {
    id: "franconville",
    name: "Franconville",
    codePostal: "95130",
    population: "37 300 hab.",
    coords: [48.9892, 2.2285],
    icon: "🤝",
    color: "#EA580C",
    description: "Cœur urbain et solidaire du Parisis avec de fortes actions d'entraide de quartier, de banques alimentaires et de soutien aux aînés.",
    associationsCount: 48,
    actionsCount: 8,
    keySpots: ["Centre Social Épine Guyon", "Espace Saint-Exupéry", "Parc Cadet de Vaux", "Maison de la Solidarité"]
  },
  {
    id: "taverny",
    name: "Taverny",
    codePostal: "95150",
    population: "27 100 hab.",
    coords: [49.0270, 2.2270],
    icon: "🛠️",
    color: "#0284C7",
    description: "Au pied de la forêt de Montmorency, moteur de l'économie circulaire avec son Repair Café réputé et ses ateliers de réemploi.",
    associationsCount: 39,
    actionsCount: 6,
    keySpots: ["Repair Café & FabLab", "Médiathèque Les Temps Modernes", "Maison des Jeunes", "Porte de Forêt"]
  },
  {
    id: "sannois",
    name: "Sannois",
    codePostal: "95110",
    population: "26 500 hab.",
    coords: [48.9715, 2.2575],
    icon: "🏛️",
    color: "#D97706",
    description: "Commune historique dominée par son moulin, très active dans le lien intergénérationnel, les épiceries solidaires et la culture locale.",
    associationsCount: 33,
    actionsCount: 4,
    keySpots: ["Maison de Quartier Gambetta", "Moulin de Sannois", "Centre Cyrano", "Jardin Pédagogique"]
  },
  {
    id: "montigny",
    name: "Montigny-lès-Cormeilles",
    codePostal: "95370",
    population: "22 200 hab.",
    coords: [48.9950, 2.1960],
    icon: "🌻",
    color: "#16A34A",
    description: "Territoire en pleine mutation urbaine et écologique, foisonnant de jardins familiaux et de collectifs jeunesse.",
    associationsCount: 29,
    actionsCount: 5,
    keySpots: ["Centre Culturel Picasso", "Jardin Solidaire du Village", "Espace Nelson Mandela", "Maison de Quartier"]
  },
  {
    id: "beauchamp",
    name: "Beauchamp",
    codePostal: "95250",
    population: "8 900 hab.",
    coords: [49.0145, 2.1905],
    icon: "🏡",
    color: "#E11D48",
    description: "Ville à taille humaine avec un tissu associatif très soudé, axé sur la solidarité de proximité et la biodiversité.",
    associationsCount: 18,
    actionsCount: 3,
    keySpots: ["Maison des Jeunes & de la Culture", "Salle des Fêtes", "Jardin de la Mairie"]
  },
  {
    id: "saint-leu",
    name: "Saint-Leu-la-Forêt",
    codePostal: "95320",
    population: "16 200 hab.",
    coords: [49.0180, 2.2470],
    icon: "🌲",
    color: "#059669",
    description: "Cadre préservé et résidentiel au riche patrimoine artistique, développant des projets d'éco-mobilité et d'artisanat solidaire.",
    associationsCount: 25,
    actionsCount: 4,
    keySpots: ["Maison Pour Tous", "Espace Clairefontaine", "Sentiers de Forêt"]
  },
  {
    id: "bessancourt",
    name: "Bessancourt",
    codePostal: "95550",
    population: "8 100 hab.",
    coords: [49.0380, 2.2180],
    icon: "🌱",
    color: "#16A34A",
    description: "Pionnière de la transition écologique avec son éco-quartier exemplaire et ses initiatives d'agriculture urbaine.",
    associationsCount: 17,
    actionsCount: 3,
    keySpots: ["Éco-Quartier des Meuniers", "Espace Bérenger", "Verger Citoyen"]
  },
  {
    id: "pierrelaye",
    name: "Pierrelaye",
    codePostal: "95480",
    population: "9 700 hab.",
    coords: [49.0220, 2.1520],
    icon: "🌳",
    color: "#0284C7",
    description: "Aux portes de la future forêt de Maubuisson, carrefour de projets d'inclusion par le sport et de renaturation.",
    associationsCount: 20,
    actionsCount: 3,
    keySpots: ["Centre Social Georges Brassens", "Parc des Sports", "Maison de la Plaine"]
  }
];

const TERRITOIRE_HUBS_DATA = [
  // Jardins Partagés & Écologie
  { id: "hub-1", name: "Jardin Partagé des Cailloux Gris", commune: "Herblay-sur-Seine", type: "jardin", icon: "🌱", coords: [48.9920, 2.1580], desc: "Potager collectif, permaculture et compostage partagé." },
  { id: "hub-2", name: "Jardin Solidaire du Village", commune: "Montigny-lès-Cormeilles", type: "jardin", icon: "🌱", coords: [48.9965, 2.1930], desc: "Production locale redistribuée aux habitants et ateliers pédagogiques." },
  { id: "hub-3", name: "Verger Citoyen & Ruches", commune: "Bessancourt", type: "jardin", icon: "🍎", coords: [49.0390, 2.2150], desc: "Arbres fruitiers partagés et initiation à l'apiculture." },
  { id: "hub-4", name: "Quai du Génie - Éco-Berges", commune: "Herblay-sur-Seine", type: "jardin", icon: "🌊", coords: [48.9868, 2.1554], desc: "Point de ralliement des ramassages citoyens le long de la Seine." },

  // Solidarité & Centres Sociaux
  { id: "hub-5", name: "Centre Social Épine Guyon", commune: "Franconville", type: "solidarite", icon: "🍲", coords: [48.9892, 2.2285], desc: "Distribution alimentaire, épicerie sociale et aide aux démarches." },
  { id: "hub-6", name: "Maison de Quartier Gambetta", commune: "Sannois", type: "solidarite", icon: "🤝", coords: [48.9715, 2.2575], desc: "Accueil de jour, écrivain public et permanences bénévoles." },
  { id: "hub-7", name: "Centre Social Georges Brassens", commune: "Pierrelaye", type: "solidarite", icon: "🤝", coords: [49.0220, 2.1520], desc: "Activités familiales, soutien à la parentalité et entraide." },

  // Tiers-Lieux & Repair Cafés
  { id: "hub-8", name: "Repair Café & FabLab Parisis", commune: "Taverny", type: "tiers-lieu", icon: "🛠️", coords: [49.0260, 2.2250], desc: "Ateliers de réparation d'électroménager, vélo et impression 3D." },
  { id: "hub-9", name: "MJC / Espace Coopératif", commune: "Beauchamp", type: "tiers-lieu", icon: "🎨", coords: [49.0145, 2.1905], desc: "Espace de coworking citoyen, bricolage et scène ouverte." },
  { id: "hub-10", name: "Maison Pour Tous Saint-Leu", commune: "Saint-Leu-la-Forêt", type: "tiers-lieu", icon: "🏠", coords: [49.0180, 2.2470], desc: "Tiers-lieu intergénérationnel et ateliers de transmission de savoirs." },

  // Médiathèques & Éducation
  { id: "hub-11", name: "Médiathèque L'Éclipse", commune: "Cormeilles-en-Parisis", type: "education", icon: "📖", coords: [48.9735, 2.2023], desc: "Ateliers robotique, soutien scolaire et club de lecture solidaire." },
  { id: "hub-12", name: "Médiathèque Les Temps Modernes", commune: "Taverny", type: "education", icon: "📚", coords: [49.0280, 2.2290], desc: "Espace numérique inclusif et grainothèque citoyenne." },

  // Mairies & Siège Associatif
  { id: "hub-13", name: "Siège Ensemble en Parisis", commune: "Herblay-sur-Seine", type: "mairie", icon: "🏛️", coords: [48.9930, 2.1620], desc: "Siège officiel de l'association (151 av. de la Chesnaie) et permanences." },
  { id: "hub-14", name: "Hôtel de Ville & Maison des Asso", commune: "Franconville", type: "mairie", icon: "🏛️", coords: [48.9880, 2.2310], desc: "Hôtel de Ville et guichet associatif de Franconville." },
  { id: "hub-15", name: "Esplanade des Frères Lumière (Départ Balade)", commune: "Herblay-sur-Seine", type: "jardin", icon: "🌲", coords: [48.9875, 2.1570], desc: "Point de départ de la balade citoyenne 'Redécouverte de la Forêt Herblaysienne' avec Hugues Verdière." }
];

const INITIAL_ACTIONS = [
  {
    id: "act-foret-herblay",
    title: "Redécouverte de la Forêt Herblaysienne : Comment concilier ville et nature ?",
    theme: "citoyennete",
    type: "evenement",
    association: "Ensemble en Parisis",
    associationLogo: "🌲",
    commune: "Herblay-sur-Seine",
    address: "Esplanade des Frères Lumière (Rendez-vous à 10h)",
    date: "Samedi 17 Octobre 2026",
    rawDate: "2026-10-17",
    time: "10h00 - 12h00 (2h)",
    spotsTotal: 25,
    spotsTaken: 11,
    isUrgent: false,
    isWeekend: true,
    isFeatured: true,
    image: "photos/evenement-foret-herblaysienne-17-octobre.jpg",
    description: "Comment concilier ville et nature ? Venez participer à cette balade citoyenne et conviviale de 4 km guidée par Hugues Verdière, Forestier herblaysien. Au programme : Histoire de la forêt de Maubuisson, pourquoi plante-t-on des arbres, et les enjeux de l'île d'Herblay. Fin du parcours au Bois des Fontaines après un passage par les bords de Seine. Événement gratuit organisé par Ensemble en Parisis (25 places max).",
    requirements: "Événement gratuit sur inscription obligatoire (ensembleenparis@gmail.com). Durée : 2h | Distance : 4km | 25 personnes max. Une voiture sera disponible au Passeur pour les personnes ne désirant pas faire la montée. ⚠️ Balade non conseillée pour les personnes à mobilité réduite.",
    accessibility: ["Événement gratuit", "Balade nature (4km)", "Familles & Citoyens", "Voiture relais au Passeur"],
    coords: [48.9875, 2.1570],
    tags: ["#ForêtHerblaysienne", "#VieLocale", "#NatureEnVille", "#HuguesVerdière", "#Herblay", "#Maubuisson"]
  },
  {
    id: "act-1",
    title: "Grand Nettoyage d'Automne des Berges de Seine",
    theme: "env",
    type: "ponctuel",
    association: "Parisis Éco-Citoyen",
    associationLogo: "🌱",
    commune: "Herblay-sur-Seine",
    address: "Quai du Génie (Point de RDV : Ponton Municipal)",
    date: "Samedi 22 Août 2026",
    rawDate: "2026-08-22",
    time: "09h30 - 12h30",
    spotsTotal: 25,
    spotsTaken: 21,
    isUrgent: true,
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?auto=format&fit=crop&w=800&q=80",
    description: "Rejoignez notre équipe pour débarrasser les berges de Seine des déchets plastiques. Gants, pinces et sacs fournis. Pot de convivialité offert en fin de matinée !",
    requirements: "Accessible à tous, enfants accompagnés bienvenus. Prévoir des chaussures fermées.",
    accessibility: ["Familles", "Débutants bienvenus", "Accessible PMR"],
    coords: [48.9868, 2.1554],
    tags: ["#ZéroDéchet", "#BergesDeSeine", "#Environnement"]
  },
  {
    id: "act-2",
    title: "Distribution Alimentaire & Produits d'Hygiène",
    theme: "solidarite",
    type: "ponctuel",
    association: "Les Restos du Cœur Parisis",
    associationLogo: "🍲",
    commune: "Franconville",
    address: "Centre Social de l'Épine Guyon",
    date: "Samedi 22 Août 2026",
    rawDate: "2026-08-22",
    time: "14h00 - 17h30",
    spotsTotal: 8,
    spotsTaken: 5,
    isUrgent: true,
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
    description: "Préparation et distribution de paniers solidaires pour les familles du quartier. Accueil bienveillant et tri logistique.",
    requirements: "Sens du contact, bienveillance et ponctualité.",
    accessibility: ["Débutants bienvenus"],
    coords: [48.9892, 2.2285],
    tags: ["#Solidarité", "#BanqueAlimentaire", "#Entraide"]
  },
  {
    id: "act-3",
    title: "Atelier Initiation au Code & Robotique pour Collégiens",
    theme: "education",
    type: "atelier",
    association: "Numérique Pour Tous Parisis",
    associationLogo: "💻",
    commune: "Cormeilles-en-Parisis",
    address: "Médiathèque L'Éclipse, 3 av. de la Libération",
    date: "Mercredi 26 Août 2026",
    rawDate: "2026-08-26",
    time: "14h30 - 17h00",
    spotsTotal: 5,
    spotsTaken: 3,
    isUrgent: false,
    isWeekend: false,
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
    description: "Venez co-animer des ateliers ludiques de programmation Scratch et Lego Mindstorms auprès de jeunes de 11 à 15 ans.",
    requirements: "Bases en informatique / logique de code. Pédagogie et patience.",
    accessibility: ["Ados", "Débutants bienvenus"],
    coords: [48.9735, 2.2023],
    tags: ["#InclusionNumérique", "#Jeunesse", "#Savoirs"]
  },
  {
    id: "act-4",
    title: "Repair Café : Réparons Ensemble au lieu de Jeter !",
    theme: "env",
    type: "atelier",
    association: "Tiers-Lieu L'Atelier du Parisis",
    associationLogo: "🔧",
    commune: "Taverny",
    address: "Espace Sainte-Honorine, 14 rue de Paris",
    date: "Dimanche 23 Août 2026",
    rawDate: "2026-08-23",
    time: "10h00 - 13h00",
    spotsTotal: 10,
    spotsTaken: 6,
    isUrgent: false,
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    description: "Aidez les habitants à diagnostiquer et réparer leur petit électroménager, jouets et vélos dans une ambiance conviviale.",
    requirements: "Bricoleurs amateurs ou confirmés, ou aide à l'accueil café.",
    accessibility: ["Familles", "Débutants bienvenus"],
    coords: [49.0256, 2.2274],
    tags: ["#RepairCafe", "#ZéroDéchet", "#Bricolage"]
  },
  {
    id: "act-5",
    title: "Visite de Convivialité & Jeux auprès d'Aînés Isolés",
    theme: "solidarite",
    type: "regulier",
    association: "Les Amis du Bel Âge",
    associationLogo: "👵",
    commune: "Sannois",
    address: "Résidence Autonomie Les Lilas",
    date: "Mardi 25 Août 2026",
    rawDate: "2026-08-25",
    time: "15h00 - 17h00",
    spotsTotal: 6,
    spotsTaken: 4,
    isUrgent: false,
    isWeekend: false,
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80",
    description: "Partagez un moment chaleureux autour de jeux de société, d'une tisane et de discussions avec des résidents âgés.",
    requirements: "Écoute, sourire et régularité appréciée.",
    accessibility: ["Accessible PMR", "Débutants bienvenus"],
    coords: [48.9712, 2.2568],
    tags: ["#Intergénérationnel", "#LienSocial", "#Seniors"]
  },
  {
    id: "act-6",
    title: "Initiation aux Gestes Qui Sauvent & DAE",
    theme: "sante",
    type: "atelier",
    association: "Secouristes Bénévoles du Parisis",
    associationLogo: "❤️",
    commune: "Montigny-lès-Cormeilles",
    address: "Gymnase Vincent Van Gogh",
    date: "Samedi 29 Août 2026",
    rawDate: "2026-08-29",
    time: "10h00 - 12h00",
    spotsTotal: 20,
    spotsTaken: 12,
    isUrgent: false,
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80",
    description: "Session gratuite ouverte à tous pour apprendre à réagir face à un arrêt cardiaque, un étouffement et utiliser un défibrillateur.",
    requirements: "À partir de 10 ans.",
    accessibility: ["Familles", "Ados", "Accessible PMR"],
    coords: [48.9954, 2.1965],
    tags: ["#PremiersSecours", "#Santé", "#Prévention"]
  },
  {
    id: "act-7",
    title: "Concertation Citoyenne : Futur Jardin Partagé du Val",
    theme: "citoyennete",
    type: "consultation",
    association: "Collectif Citoyen Parisis Vert",
    associationLogo: "🌻",
    commune: "Cormeilles-en-Parisis",
    address: "Salle des Fêtes / En ligne",
    date: "Jeudi 27 Août 2026",
    rawDate: "2026-08-27",
    time: "19h00 - 21h00",
    spotsTotal: 50,
    spotsTaken: 38,
    isUrgent: false,
    isWeekend: false,
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80",
    description: "Venez co-concevoir les plans et le règlement d'usage du nouvel espace permacole citoyen prévu pour le printemps.",
    requirements: "Ouvert à tous les résidents du quartier.",
    accessibility: ["Familles", "Accessible PMR"],
    coords: [48.9768, 2.2045],
    tags: ["#BudgetParticipatif", "#JardinPartagé", "#DémocratieLocale"]
  },
  {
    id: "act-8",
    title: "Balade Vélo Familiale & Atelier Réglage Freins",
    theme: "culture",
    type: "evenement",
    association: "Mieux se Déplacer en Parisis",
    associationLogo: "🚲",
    commune: "Herblay-sur-Seine",
    address: "Départ Parc de la Mairie",
    date: "Dimanche 30 Août 2026",
    rawDate: "2026-08-30",
    time: "14h00 - 17h00",
    spotsTotal: 30,
    spotsTaken: 19,
    isUrgent: false,
    isWeekend: true,
    image: "https://images.unsplash.com/photo-1541625602330-2277a4c46182?auto=format&fit=crop&w=800&q=80",
    description: "Parcours sécurisé de 12 km le long des berges et des coteaux, suivi d'un goûter partagé et d'un check-up mécanique vélo.",
    requirements: "Venir avec son vélo et un casque pour les enfants.",
    accessibility: ["Familles", "Débutants bienvenus"],
    coords: [48.9905, 2.1642],
    tags: ["#Vélo", "#MobilitéDouce", "#SportSolidaire"]
  },
  {
    id: "act-9",
    title: "Soutien Scolaire Primaire & Aide aux Devoirs",
    theme: "education",
    type: "regulier",
    association: "Réussite Solidaire Parisis",
    associationLogo: "📖",
    commune: "Beauchamp",
    address: "Maison des Jeunes, 5 av. Pasteur",
    date: "Lundi 24 Août 2026",
    rawDate: "2026-08-24",
    time: "17h00 - 18h30",
    spotsTotal: 4,
    spotsTaken: 2,
    isUrgent: true,
    isWeekend: false,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    description: "Accompagnez des écoliers du CP au CM2 dans la méthodologie et l'apprentissage de la lecture.",
    requirements: "Pédagogie et bienveillance.",
    accessibility: ["Débutants bienvenus"],
    coords: [49.0145, 2.1912],
    tags: ["#SoutienScolaire", "#ÉgalitéDesChances", "#Éducation"]
  }
];

const CITIZEN_BADGES = [
  { id: "badge-1", name: "Premier Pas", icon: "🌱", desc: "1ère action solidaire accomplie", unlocked: true },
  { id: "badge-2", name: "Gardien Vert", icon: "🌍", desc: "3 missions environnementales réalisées", unlocked: true },
  { id: "badge-3", name: "Cœur Battant", icon: "❤️", desc: "10 heures de bénévolat validées", unlocked: true },
  { id: "badge-4", name: "Pilier Local", icon: "🏆", desc: "Actions dans 3 communes différentes", unlocked: false }
];



const STATUTS_DATA = {
  titre: "Statuts ASSOCIATION LOI 1901",
  nomAssociation: "Ensemble en Parisis",
  dateValidation: "18 juin 2026",
  lieuValidation: "Herblay-sur-Seine",
  siegeSocial: "151 avenue de la Chesnaie, 95220 Herblay-sur-Seine",
  duree: "99 ans",
  categories: [
    { id: "all", label: "📄 Tous les articles", icon: "📑" },
    { id: "identite", label: "🏛️ Identité & Objet", icon: "🏛️" },
    { id: "membres", label: "👥 Membres & Cotisations", icon: "👥" },
    { id: "gouvernance", label: "🗳️ Gouvernance & AG", icon: "🗳️" },
    { id: "finances", label: "💰 Finances & Fonctionnement", icon: "💰" },
    { id: "signataires", label: "✍️ Signataires officiels", icon: "✍️" }
  ],
  articles: [
    {
      num: 1,
      category: "identite",
      title: "Article premier : Dénomination",
      content: "Il est fondé entre les adhérents aux présents statuts une association régie par la loi du 1er juillet 1901 et le décret du 16 août 1901 ayant pour titre <strong>« Ensemble en Parisis »</strong>."
    },
    {
      num: 2,
      category: "identite",
      title: "Article 2 : Objet",
      content: `Cette association a pour objet de <strong>créer un espace d’expression et d’éducation populaire</strong> visant à développer du lien entre les habitant(e)s d’Herblay et plus largement du Parisis afin d’encourager la participation à la vie du territoire.<br/><br/>
      <strong>Exemples d’activités envisagées :</strong>
      <ul class="statuts-list">
        <li>Pique-niques citoyens et conviviaux,</li>
        <li>Participation au <em>« Clean up Day »</em> mondial (nettoyage des rives de la Seine avec les communes avoisinantes),</li>
        <li>Organisation de cafés rencontre/débat et d'échanges d'idées,</li>
        <li>Favorisation du lien intergénérationnel par un festival de l’image mettant en relation des jeunes avec des personnes âgées,</li>
        <li>Activités croisées et partenariats avec d’autres associations locales…</li>
      </ul>`
    },
    {
      num: 3,
      category: "identite",
      title: "Article 3 : Siège social",
      content: "Le siège social est fixé au <strong>151 avenue de la Chesnaie à 95220 Herblay sur Seine</strong>."
    },
    {
      num: 4,
      category: "identite",
      title: "Article 4 : Durée",
      content: "La durée de l’association est fixée à <strong>99 ans</strong>."
    },
    {
      num: 5,
      category: "membres",
      title: "Article 5 : Composition",
      content: `L’association se compose de :
      <ul class="statuts-list">
        <li><strong>a) Membres fondateurs</strong></li>
        <li><strong>b) Membres bienfaiteurs</strong></li>
        <li><strong>c) Membres actifs ou adhérents</strong></li>
        <li><strong>d) Membres d’honneur</strong></li>
      </ul>`
    },
    {
      num: 6,
      category: "membres",
      title: "Article 6 : Admission",
      content: "Peut devenir membre toute personne physique ou morale adhérant aux présents statuts et aux valeurs portées par l’association."
    },
    {
      num: 7,
      category: "membres",
      title: "Article 7 : Membres / Cotisation",
      content: `Sont <strong>membres fondateurs</strong> ceux qui ont pris l’engagement de verser une cotisation annuelle de <strong>15€</strong>.<br/><br/>
      Sont <strong>membres bienfaiteurs</strong> ceux qui ont acquitté une cotisation libre d’un montant supérieur à celui de la cotisation.<br/><br/>
      Les <strong>adhérents</strong> verseront une cotisation d’un montant libre.<br/><br/>
      Le montant de la cotisation pourra être modifié par l’assemblée générale ordinaire.`
    },
    {
      num: 8,
      category: "membres",
      title: "Article 8 : Radiation",
      content: `La qualité de membre se perd par :
      <ul class="statuts-list">
        <li>La démission,</li>
        <li>Le non-paiement de la cotisation,</li>
        <li>L’exclusion prononcée par le conseil d’administration pour motif grave, notamment non-respect des statuts ou comportement contraire aux valeurs de l’association, après que l’intéressé·e a été invité·e à présenter sa défense,</li>
        <li>Le décès.</li>
      </ul>`
    },
    {
      num: 9,
      category: "gouvernance",
      title: "Article 9 : Assemblée générale ordinaire",
      content: `L’assemblée générale ordinaire comprend l’ensemble des membres à jour de leur cotisation.<br/><br/>
      Elle se réunit au moins <strong>une fois par an</strong> avec un ordre du jour prédéfini et après envoi d’une convocation <strong>15 jours avant</strong> la date prévue pour l’assemblée. La période prévue pour l’assemblée générale annuelle sera <strong>juin</strong> (anniversaire de création) ou <strong>décembre</strong> (fin d’exercice budgétaire).<br/><br/>
      Elle :
      <ul class="statuts-list">
        <li>Approuve le rapport moral et financier,</li>
        <li>Définit les orientations,</li>
        <li>Élit les membres du conseil d’administration.</li>
      </ul>
      Les décisions sont prises à la majorité des membres présents ou représentés. En cas d’égalité, la voix du président sera prépondérante.`
    },
    {
      num: 10,
      category: "gouvernance",
      title: "Article 10 : Assemblée générale extraordinaire",
      content: `Elle est compétente pour modifier les statuts ou prononcer la dissolution.<br/><br/>
      Les décisions sont prises à la <strong>majorité des deux tiers</strong>.`
    },
    {
      num: 11,
      category: "gouvernance",
      title: "Article 11 : Conseil d’administration",
      content: `L’association est dirigée par un <strong>conseil d’administration élu pour 1 (un) an</strong> par l’assemblée générale. Le conseil d’administration visera la <strong>parité hommes et femmes</strong>.<br/><br/>
      Il met en œuvre les décisions de l’assemblée générale et assure la gestion de l’association.<br/><br/>
      Le Conseil d’administration se compose à sa création des membres fondateurs. Ce dernier sera renouvelé par l’Assemblée générale ordinaire : le nombre des membres et les administrateurs seront choisis à la majorité simple.<br/><br/>
      Le conseil d’administration se réunit aussi souvent que nécessaire avec <em>a minima</em> la moitié de ses membres. Les décisions sont validées à la majorité simple à défaut de consensus.`
    },
    {
      num: 12,
      category: "gouvernance",
      title: "Article 12 : Bureau",
      content: `Le conseil d’administration élit en son sein, à main levée, un bureau composé de :
      <ul class="statuts-list">
        <li>Un président</li>
        <li>Un trésorier</li>
        <li>Un secrétaire</li>
      </ul>
      En complément des trois membres indispensables à la création de l’association, ont été élu.e.s :
      <ul class="statuts-list">
        <li>Un président d’honneur</li>
        <li>Une vice-présidente</li>
        <li>Une secrétaire adjointe</li>
      </ul>
      Le bureau assure la gestion courante. Par principe de bonne gouvernance, les fonctions de président·e, trésorier·e, secrétaire ne peuvent être exercées par un·e élu·e en mandat exécutif local. De même que les fonctions de Président et trésorier ne sont cumulables.`
    },
    {
      num: 13,
      category: "finances",
      title: "Article 13 : Ressources",
      content: `Les ressources de l’association comprennent :
      <ul class="statuts-list">
        <li>Les cotisations,</li>
        <li>Les dons manuels,</li>
        <li>Les subventions publiques ou privées,</li>
        <li>Les recettes d’activités,</li>
        <li>Toute ressource autorisée par les lois et règlements en vigueur.</li>
      </ul>`
    },
    {
      num: 14,
      category: "finances",
      title: "Article 14 : Indemnités",
      content: `Toutes les fonctions, y compris celles des membres du conseil d’administration et du bureau, sont <strong>gratuites et bénévoles</strong>. Seuls les frais occasionnés par l’accomplissement de leur mandat sont remboursés sur justificatifs. Le rapport financier présenté à l’assemblée générale ordinaire présente, par bénéficiaire, les remboursements de frais de mission, de déplacement ou de représentation.<br/><br/>
      Ces dispositions pourront être affinées dans un règlement intérieur (nature des frais, des missions, qualité des bénéficiaires, etc.).`
    },
    {
      num: 15,
      category: "finances",
      title: "Article 15 : Règlement intérieur",
      content: "Un règlement intérieur ou une charte éthique pourra être établi ultérieurement par le conseil d’administration pour compléter les présents statuts."
    },
    {
      num: 16,
      category: "finances",
      title: "Article 16 : Dissolution",
      content: `En cas de dissolution, l’assemblée générale désigne un ou plusieurs liquidateurs.<br/><br/>
      L’actif net est dévolu à une ou plusieurs associations poursuivant des objectifs similaires.`
    }
  ],
  signataires: [
    { role: "Le Président", nom: "Paul Delage", signature: "Delage" },
    { role: "Le Trésorier", nom: "Nasser Smat", signature: "smati" },
    { role: "Le Secrétaire", nom: "Daniel Thieux", signature: "Thieux" }
  ]
};

