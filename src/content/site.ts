/**
 * Tout le texte du site est ici. Modifier ce fichier suffit pour changer le contenu.
 * Les libellés de packs et de formats de livraison sont des propositions à valider.
 */

export const site = {
  name: "Use Case Factory",
  title: "Use Case Factory · Des détections prêtes à produire",
  description:
    "Des use cases de détection complets pour Splunk, Microsoft Sentinel, Elastic et QRadar : règle, mapping MITRE ATT&CK, sources requises, tuning, test et runbook.",
  cta: "Demander le catalogue",
};

export const nav = [
  { href: "#fiche", label: "Une fiche" },
  { href: "#contenu", label: "Contenu" },
  { href: "#siem", label: "SIEM" },
  { href: "#packs", label: "Packs" },
  { href: "#faq", label: "Questions" },
];

export const hero = {
  headline: ["Des détections", "prêtes à produire."],
  lead: "Use Case Factory fabrique des use cases de détection complets : la règle, mais aussi tout ce qui la rend exploitable par un SOC. Livrés en packs, pour votre SIEM.",
  secondary: "Voir une fiche",
};

export const problem = {
  heading: "Une requête ne fait pas une détection.",
  body: "Écrire la requête prend une heure. La rendre exploitable prend des semaines : vérifier que les journaux arrivent, absorber les faux positifs, rejouer l'attaque, écrire la consigne pour l'analyste qui recevra l'alerte à trois heures du matin.",
  left: "Une règle récupérée",
  right: "Un use case fabriqué",
  rows: [
    {
      topic: "Sources de logs",
      without: "Supposées présentes",
      with: "Listées, avec la politique d'audit à activer",
    },
    {
      topic: "Faux positifs",
      without: "Découverts en production",
      with: "Documentés, avec leurs exclusions prêtes",
    },
    {
      topic: "Validation",
      without: "Aucune",
      with: "Procédure de simulation rejouable",
    },
    {
      topic: "Analyste",
      without: "Seul face à l'alerte",
      with: "Runbook d'investigation joint",
    },
    {
      topic: "Portabilité",
      without: "Un seul langage",
      with: "Quatre SIEM et le format Sigma",
    },
  ],
};

export const anatomy = {
  heading: "Six pièces par use case.",
  body: "Les repères renvoient à la fiche ci-dessus. Chaque use case du catalogue est livré avec les six, sans exception.",
  parts: [
    {
      mark: "A",
      name: "La règle",
      text: "Écrite dans le langage de votre SIEM, commentée, avec ses seuils exposés en paramètres.",
    },
    {
      mark: "B",
      name: "Le mapping ATT&CK",
      text: "Tactique, technique et sous-technique, pour suivre votre couverture dans le temps.",
    },
    {
      mark: "C",
      name: "Les sources requises",
      text: "Journaux, identifiants d'événements et réglages d'audit sans lesquels la règle reste muette.",
    },
    {
      mark: "D",
      name: "Le guide de tuning",
      text: "Faux positifs connus et mécanisme d'exclusion tenu hors de la règle, dans une table.",
    },
    {
      mark: "E",
      name: "Le test",
      text: "Une procédure de simulation à rejouer pour prouver que l'alerte se déclenche chez vous.",
    },
    {
      mark: "F",
      name: "Le runbook",
      text: "Les premières vérifications à mener par l'analyste, dans l'ordre.",
    },
  ],
};

export const siem = {
  heading: "Votre SIEM, son langage.",
  body: "Chaque use case est maintenu dans quatre langages et en Sigma, le format pivot qui couvre les autres plateformes.",
  columns: ["Plateforme", "Langage", "Format livré"],
  rows: [
    { platform: "Splunk", language: "SPL", format: "Recherche corrélée, savedsearches.conf" },
    { platform: "Microsoft Sentinel", language: "KQL", format: "Règle analytique planifiée, YAML" },
    { platform: "Elastic Security", language: "ES|QL", format: "Règle de détection, NDJSON" },
    { platform: "IBM QRadar", language: "AQL", format: "Recherche AQL et règle associée" },
    { platform: "Autres plateformes", language: "Sigma", format: "Règle et corrélation, à convertir" },
  ],
};

export const process = {
  heading: "De la commande à la première alerte.",
  steps: [
    {
      name: "Vous choisissez",
      text: "Un pack par périmètre : identités, postes, cloud, réseau, serveurs.",
    },
    {
      name: "Vous vérifiez vos logs",
      text: "La liste des sources requises dit, avant tout déploiement, ce qui fonctionnera chez vous.",
    },
    {
      name: "Vous importez",
      text: "Les règles arrivent dans le format natif de votre SIEM. Pas de réécriture.",
    },
    {
      name: "Vous réglez",
      text: "Le guide de tuning et le test vous amènent à une alerte fiable, puis en production.",
    },
  ],
};

export const packs = {
  heading: "Le catalogue, par périmètre.",
  body: "Chaque pack regroupe les use cases d'un même périmètre technique. Les techniques citées donnent un aperçu de la couverture.",
  items: [
    {
      ref: "AD",
      name: "Active Directory et identités",
      text: "Vol d'identifiants, abus de Kerberos, modifications sensibles de l'annuaire.",
      techniques: ["T1558.003 Kerberoasting", "T1003.006 DCSync", "T1110.003 Password Spraying", "T1484.001 Modification de GPO"],
    },
    {
      ref: "WIN",
      name: "Postes et serveurs Windows",
      text: "Exécution, persistance et effacement de traces sur les systèmes Windows.",
      techniques: ["T1059.001 PowerShell", "T1003.001 Mémoire LSASS", "T1053.005 Tâche planifiée", "T1070.001 Effacement des journaux"],
    },
    {
      ref: "M365",
      name: "Microsoft 365 et Entra ID",
      text: "Compromission de comptes cloud, règles de messagerie, élévation de rôles.",
      techniques: ["T1078.004 Comptes cloud", "T1114.003 Règle de transfert", "T1098.003 Rôles cloud ajoutés", "T1621 Harcèlement MFA"],
    },
    {
      ref: "NET",
      name: "Réseau et périmètre",
      text: "Canaux de commande, tunnels, reconnaissance et exfiltration.",
      techniques: ["T1071.004 DNS", "T1572 Tunnel de protocole", "T1046 Découverte de services", "T1048 Exfiltration par protocole alternatif"],
    },
    {
      ref: "LNX",
      name: "Linux et serveurs",
      text: "Persistance, élévation de privilèges et accès distants sur les serveurs Linux.",
      techniques: ["T1053.003 Cron", "T1548.003 Sudo", "T1098.004 Clés SSH autorisées", "T1070.002 Effacement des journaux"],
    },
  ],
};

export const maker = {
  heading: "Fabriqué par quelqu'un qui reçoit les alertes.",
  body: "Use Case Factory est conçu par un analyste SOC senior : vingt ans de détection, de la migration de SIEM au triage d'alertes, sur QRadar, Splunk, Elastic et Cortex. Chaque fiche est écrite pour l'analyste qui devra s'en servir.",
};

export const faq = {
  heading: "Questions fréquentes.",
  items: [
    {
      q: "D'où viennent les règles ?",
      a: "Elles sont écrites pour le catalogue, à partir des techniques publiques décrites dans MITRE ATT&CK. Aucune règle ne provient de l'environnement d'un client.",
    },
    {
      q: "Mon SIEM n'est pas dans la liste.",
      a: "Chaque use case est aussi livré en Sigma. Ce format se convertit vers la plupart des plateformes du marché avec les outils de la communauté Sigma.",
    },
    {
      q: "Que faut-il côté journaux ?",
      a: "Chaque fiche liste ses sources, ses identifiants d'événements et les réglages d'audit nécessaires. Vous savez avant de déployer quelles règles fonctionneront chez vous.",
    },
    {
      q: "Et les faux positifs ?",
      a: "Les cas connus sont documentés dans chaque fiche. Les exclusions se tiennent dans une table séparée de la règle, pour que vous puissiez les ajuster sans toucher à la logique de détection.",
    },
    {
      q: "Comment voir le contenu d'un pack avant d'acheter ?",
      a: "Demandez le catalogue : vous recevez la liste des use cases de chaque pack et une fiche complète en exemple.",
    },
  ],
};

export const contact = {
  heading: "Demandez le catalogue.",
  body: "Dites-nous quel SIEM vous utilisez et quel périmètre vous voulez couvrir. Vous recevez la liste des use cases et une fiche complète en exemple.",
  siemOptions: ["Splunk", "Microsoft Sentinel", "Elastic Security", "IBM QRadar", "Autre"],
  labels: {
    name: "Nom",
    email: "E-mail professionnel",
    company: "Société",
    siem: "SIEM utilisé",
    message: "Périmètre à couvrir",
    messageHint: "Facultatif",
    submit: "Envoyer la demande",
    sending: "Envoi en cours",
  },
  feedback: {
    success: "Demande reçue. Nous vous répondons par e-mail.",
    invalid: "Vérifiez les champs signalés, puis renvoyez la demande.",
    unavailable: "Le formulaire n'est pas encore relié à une boîte de réception. Votre demande n'a pas été envoyée.",
    error: "L'envoi a échoué. Réessayez dans un instant.",
  },
  errors: {
    name: "Indiquez votre nom.",
    email: "Indiquez une adresse e-mail valide.",
    company: "Indiquez votre société.",
  },
};

export const footer = {
  legal:
    "Splunk, Microsoft Sentinel, Elastic et IBM QRadar sont des marques de leurs détenteurs respectifs. Use Case Factory n'est affilié à aucun éditeur. MITRE ATT&CK est une marque de The MITRE Corporation.",
};
