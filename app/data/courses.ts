export type Course = {
  id: string;
  title: string;
  category: "Tech" | "Humanitaire" | "Entrepreneuriat";
  level: "Débutant" | "Intermédiaire" | "Avancé";
  access: "Gratuit" | "Premium";
  short: string;
};

export const courses: Course[] = [
  {
    id: "mikrotik-hotspot",
    title: "MikroTik Hotspot : tickets & portail captif",
    category: "Tech",
    level: "Intermédiaire",
    access: "Gratuit",
    short: "Créer un Hotspot, profils, vouchers, portail, dépannage de base.",
  },
  {
    id: "wireguard-remote-admin",
    title: "Accès distant sécurisé : WireGuard & règles lifeline",
    category: "Tech",
    level: "Intermédiaire",
    access: "Premium",
    short: "Configurer WG, peers, firewall input, services, éviter le lock-out.",
  },
  {
    id: "rrm-basics",
    title: "RRM & réponse d’urgence : fondamentaux",
    category: "Humanitaire",
    level: "Débutant",
    access: "Gratuit",
    short: "Principes RRM, coordination, ciblage, suivi minimal, reporting.",
  },
  {
    id: "cbt-scope",
    title: "CBT & SCOPE : de l’enregistrement au paiement",
    category: "Humanitaire",
    level: "Intermédiaire",
    access: "Premium",
    short: "Flux SCOPE, listes, distributions, contrôle, erreurs fréquentes.",
  },
  {
    id: "business-model",
    title: "Business model simple : du zéro au plan",
    category: "Entrepreneuriat",
    level: "Débutant",
    access: "Gratuit",
    short: "Proposition de valeur, clients, coûts, prix, plan d’action.",
  },
  {
    id: "marketing-terrain",
    title: "Marketing terrain : vendre et fidéliser",
    category: "Entrepreneuriat",
    level: "Intermédiaire",
    access: "Premium",
    short: "Offre, message, canaux, fidélisation, suivi des ventes.",
  },
];
