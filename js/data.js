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
    desc: "Conseils de quartier, concertations, entraide entre voisins et aménagement participatif.",
    count: 8
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

const INITIAL_ACTIONS = [
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

