/**
 * Fiche spécimen affichée en haut de page.
 * Règles écrites pour le site à partir de la technique publique MITRE ATT&CK T1558.003.
 * Les noms de champs suivent les intégrations standard de chaque SIEM ; à relire avant publication.
 */

export type SiemId = "sigma" | "splunk" | "sentinel" | "elastic" | "qradar";

export type Rule = {
  id: SiemId;
  label: string;
  language: string;
  delivery: string;
  comment: "#" | "//" | "--" | "```";
  keywords: string[];
  code: string;
};

export const specimen = {
  ref: "UC-AD-007",
  title: "Kerberoasting : rafale de tickets de service RC4",
  severity: "Moyenne",
  attack: {
    tactic: "TA0006 · Credential Access",
    technique: "T1558.003 · Kerberoasting",
  },
  sources: [
    "Journal Sécurité Windows des contrôleurs de domaine",
    "Événement 4769 (ticket de service Kerberos demandé)",
    "Audit « Opérations de ticket de service Kerberos » activé",
  ],
  falsePositives: [
    "Scanners de vulnérabilités authentifiés",
    "Applications anciennes limitées à RC4",
    "Outils d'inventaire qui énumèrent les SPN",
  ],
  tuning: "Exclusions par compte et par adresse source, tenues dans une table de correspondance.",
  test: "Atomic Red Team T1558.003, test 1, depuis un poste du domaine.",
  runbook: [
    "Identifier le compte demandeur et son poste",
    "Lister les SPN visés et leurs privilèges",
    "Vérifier l'âge des mots de passe des comptes de service ciblés",
  ],
} as const;

export const rules: Rule[] = [
  {
    id: "sigma",
    label: "Sigma",
    language: "YAML",
    delivery: "Règle Sigma et règle de corrélation (.yml)",
    comment: "#",
    keywords: ["title", "id", "status", "logsource", "product", "service", "detection", "selection", "condition", "level", "tags", "correlation", "type", "rules", "group-by", "timespan", "field", "gte", "name"],
    code: `title: Ticket de service Kerberos chiffré en RC4
name: tgs_rc4
status: stable
logsource:
  product: windows
  service: security
detection:
  selection:
    EventID: 4769
    TicketEncryptionType: '0x17'
  filter_machine:
    ServiceName|endswith: '$'
  filter_krbtgt:
    ServiceName: 'krbtgt'
  condition: selection and not 1 of filter_*
tags:
  - attack.credential_access
  - attack.t1558.003
---
title: Kerberoasting, rafale de tickets RC4
correlation:
  type: value_count
  rules:
    - tgs_rc4
  group-by:
    - TargetUserName
    - IpAddress
  timespan: 10m
  condition:
    field: ServiceName
    gte: 5
level: medium`,
  },
  {
    id: "splunk",
    label: "Splunk",
    language: "SPL",
    delivery: "Recherche corrélée (savedsearches.conf)",
    comment: "```",
    keywords: ["index", "bin", "stats", "where", "lookup", "search", "dc", "values", "BY", "AS", "OUTPUT", "span"],
    code: `index=wineventlog EventCode=4769 Ticket_Encryption_Type=0x17
    Service_Name!="*$" Service_Name!="krbtgt"
\`\`\` exclusions tenues hors de la règle \`\`\`
| lookup uc_ad_007_exclusions Account_Name OUTPUT motif
| where isnull(motif)
| bin _time span=10m
| stats dc(Service_Name) AS services
        values(Service_Name) AS spn
        BY _time, Account_Name, Client_Address
| where services >= 5`,
  },
  {
    id: "sentinel",
    label: "Sentinel",
    language: "KQL",
    delivery: "Règle analytique planifiée (YAML)",
    comment: "//",
    keywords: ["where", "parse", "with", "summarize", "by", "bin", "dcount", "make_set", "and", "let", "in", "extend"],
    code: `// exclusions tenues dans une watchlist
let exclusions = _GetWatchlist('uc_ad_007') | project SearchKey;
SecurityEvent
| where EventID == 4769
| parse EventData with * 'TicketEncryptionType">' EncType '<' *
| parse EventData with * 'ServiceName">' ServiceName '<' *
| parse EventData with * 'TargetUserName">' Compte '<' *
| parse EventData with * 'IpAddress">' Source '<' *
| where EncType == "0x17"
    and ServiceName !endswith "$"
    and ServiceName != "krbtgt"
    and Compte !in (exclusions)
| summarize Services = dcount(ServiceName),
            SPN = make_set(ServiceName)
    by Compte, Source, bin(TimeGenerated, 10m)
| where Services >= 5`,
  },
  {
    id: "elastic",
    label: "Elastic",
    language: "ES|QL",
    delivery: "Règle de détection ES|QL (NDJSON)",
    comment: "//",
    keywords: ["FROM", "WHERE", "EVAL", "STATS", "BY", "AND", "NOT", "LIKE", "COUNT_DISTINCT", "VALUES", "DATE_TRUNC", "minutes"],
    code: `FROM logs-system.security-*
| WHERE event.code == "4769"
    AND winlog.event_data.TicketEncryptionType == "0x17"
    AND winlog.event_data.ServiceName NOT LIKE "*$"
    AND winlog.event_data.ServiceName != "krbtgt"
| EVAL tranche = DATE_TRUNC(10 minutes, @timestamp)
| STATS services = COUNT_DISTINCT(winlog.event_data.ServiceName),
        spn = VALUES(winlog.event_data.ServiceName)
    BY tranche, winlog.event_data.TargetUserName, source.ip
| WHERE services >= 5
// exclusions : liste d'exceptions rattachée à la règle`,
  },
  {
    id: "qradar",
    label: "QRadar",
    language: "AQL",
    delivery: "Recherche AQL et règle associée",
    comment: "--",
    keywords: ["SELECT", "FROM", "WHERE", "AND", "NOT", "ILIKE", "GROUP", "BY", "HAVING", "LAST", "MINUTES", "AS", "UNIQUECOUNT", "IN", "REFERENCESETCONTAINS"],
    code: `-- propriétés personnalisées à faire correspondre à votre DSM
SELECT username, sourceip,
       UNIQUECOUNT("Service Name") AS services
FROM events
WHERE "EventID" = '4769'
  AND "Ticket Encryption Type" = '0x17'
  AND NOT "Service Name" ILIKE '%$'
  AND "Service Name" != 'krbtgt'
  -- exclusions tenues dans un jeu de référence
  AND NOT REFERENCESETCONTAINS('UC_AD_007_exclusions', username)
GROUP BY username, sourceip
HAVING services >= 5
LAST 10 MINUTES`,
  },
];
