# Use Case Factory : direction visuelle

## Le monde : le dossier technique
Le site est un dossier de fabrication. Une « factory » livre des pièces accompagnées de leur fiche : référence, nomenclature, tolérances. La page reprend cette grammaire au lieu de l'esthétique sombre et néon habituelle du secteur.

La fiche spécimen en haut de page est le produit lui-même, pas une illustration : on change de SIEM et la règle change.

## Matières
| Jeton | Valeur | Emploi |
|---|---|---|
| `paper` | `oklch(0.968 0.01 88)` | Fond principal |
| `paper-deep` | `oklch(0.935 0.014 88)` | Sections en retrait |
| `ink` | `oklch(0.215 0.022 262)` | Texte, filets forts |
| `ink-soft` / `ink-mute` | `0.40` / `0.47` de clarté | Texte secondaire, légendes |
| `minium` | `oklch(0.63 0.21 35)` | Marques, soulignés, jamais du texte courant |
| `minium-deep` | `oklch(0.5 0.19 33)` | Bouton principal, texte d'alerte, focus |
| `plate` | `oklch(0.2 0.022 262)` | Plaque de code et section SIEM |

Clair par choix d'usage : la page est lue de jour, au bureau. Tous les couples texte et fond dépassent 4,5:1.

## Typographie
- **Big Shoulders** en capitales pour les titres. Interligne 1,04 au minimum : les capitales accentuées en ont besoin.
- **IBM Plex Sans** pour le texte.
- **IBM Plex Mono** seulement pour le code, les références et les identifiants ATT&CK.
- Polices auto-hébergées via `@fontsource`, aucun appel à un service tiers.

## Composition
- Angles droits, filets de 1 px et 1,5 px. Pas de coins arrondis, pas de dégradés, pas de verre dépoli.
- Les contenus répétés sont des lignes réglées ou des tableaux, jamais des grilles de cartes identiques.
- Pas de sur-titre au-dessus des titres. Les numéros n'apparaissent que là où l'ordre compte (étapes, repères A à F).

## Mouvement (Motion)
- Un seul moment mis en scène : la fiche. Tampon « Spécimen » qui se pose, repères A à F qui se remplissent l'un après l'autre.
- Le reste répond à une action : indicateur d'onglet, changement de règle, accordéon, retour du formulaire, barre de progression.
- Tout part d'un état visible et respecte `prefers-reduced-motion`.
- Courbe : `cubic-bezier(0.16, 1, 0.3, 1)`.

## Composants repris
`src/components/motion-primitives/` vient de Motion Primitives (MIT), bibliothèque référencée sur 21st.dev. `components.json` est en place : un composant 21st.dev s'ajoute avec `npx shadcn@latest add` et la clé `API_KEY_21ST`.
