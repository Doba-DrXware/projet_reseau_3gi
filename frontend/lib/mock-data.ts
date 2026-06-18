export const MOCK_USER = {
  firstName: "Ibrahim",
  location: "Yaoundé, CM",
};

export const MOCK_PHARMACIES = [
  {
    id: "1",
    name: "Pharmacie du Centre",
    city: "Yaoundé",
    status: "Ouvert 24h/24",
    distance: "300m",
    onDuty: true,
  },
  {
    id: "2",
    name: "Pharmacie de la Poste",
    city: "Douala",
    status: "Ouvert jusqu'à 20h",
    distance: "1.2 km",
    onDuty: false,
  },
  {
    id: "3",
    name: "Pharmacie des Nations",
    city: "Yaoundé",
    status: "Fermé",
    distance: "2.5 km",
    onDuty: false,
  },
];

export const MOCK_MEDICATIONS = [
  {
    id: "1",
    name: "Paracétamol Biogaran 500mg",
    form: "Comprimé • Boîte de 16",
    price: 1500,
    pharmacy: "Pharmacie du Centre",
    distance: "300m",
    inStock: true,
    category: "Analgesique / Antipyrétique",
    description: "Traitement des douleurs, fièvre et maux de tête.",
    address: "Avenue Kennedy, Yaoundé",
    hours: "Ouvert 24h/24",
  },
  {
    id: "2",
    name: "Artemether / Lumefantrine 80/480mg",
    form: "Comprimé sécable • Boîte de 6",
    price: 2500,
    pharmacy: "Pharmacie de la Poste",
    distance: "1.2 km",
    inStock: true,
    category: "Antipaludéen",
    description: "Traitement du paludisme non compliqué.",
    address: "Rue de la Poste, Douala",
    hours: "Lun-Sam 8h-20h",
  },
  {
    id: "3",
    name: "Nivaquine 100mg",
    form: "Comprimé • Boîte de 20",
    price: 3200,
    pharmacy: "Pharmacie des Nations",
    distance: "2.5 km",
    inStock: false,
    category: "Antipaludéen",
    description: "Prévention et traitement du paludisme.",
    address: "Quartier Bastos, Yaoundé",
    hours: "Lun-Ven 8h-18h",
  },
];

export const MOCK_CART = [
  {
    id: "1",
    medicationId: "1",
    name: "Paracétamol Biogaran 500mg",
    form: "Comprimé • Boîte de 16",
    price: 1500,
    quantity: 2,
    pharmacy: "Pharmacie du Centre",
  },
];

export const MOCK_PRESCRIPTION = [
  { name: "Amoxicilline 500mg", found: true, pharmacy: "Pharmacie du Centre", price: 4500 },
  { name: "Ibuprofène 400mg", found: true, pharmacy: "Pharmacie de la Poste", price: 1800 },
  { name: "Vitamine C 1000mg", found: false, pharmacy: null, price: null },
];

export const MOCK_STOCK_ALERTS = [
  { id: "1", name: "Amoxicilline 500mg", level: "Critique", remaining: 0 },
  { id: "2", name: "Metformine 850mg", level: "Rupture", remaining: 0 },
  { id: "3", name: "Paracétamol 500mg", level: "Faible", remaining: 5 },
];

export const MOCK_RESERVATIONS = [
  { id: "1", client: "Marie N.", items: 2, total: 3200, status: "En attente" },
  { id: "2", client: "Paul K.", items: 1, total: 1500, status: "En attente" },
];

export const MOCK_ADMIN_PHARMACIES = [
  { id: "1", name: "Pharmacie Centrale", city: "Yaoundé", active: true, phone: "699 000 001" },
  { id: "2", name: "Pharmacie du Centre", city: "Yaoundé", active: true, phone: "699 000 002" },
  { id: "3", name: "Pharmacie de la Poste", city: "Douala", active: true, phone: "699 000 003" },
  { id: "4", name: "Pharmacie des Nations", city: "Yaoundé", active: false, phone: "699 000 004" },
];

export const PROCESSING_FEE = 200;
