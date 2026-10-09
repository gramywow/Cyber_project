# Use Case Factory

Landing du catalogue de use cases de détection. Next.js, Tailwind CSS, Motion.

## Lancer

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Où modifier quoi

| Besoin | Fichier |
|---|---|
| Textes, packs, FAQ | `src/content/site.ts` |
| Fiche spécimen et règles par SIEM | `src/content/specimen.ts` |
| Couleurs, polices, boutons | `src/app/globals.css` |
| Sections de la page | `src/components/site/` |
| Envoi du formulaire | `src/app/api/contact/route.ts` |

## Formulaire de contact

L'envoi passe par [Resend](https://resend.com). Copier `.env.example` vers `.env.local` et renseigner les trois variables, ou les définir dans Vercel. Sans elles, le formulaire affiche qu'il n'est pas relié et n'accepte aucune demande.

## Mise en ligne

Importer le dépôt dans Vercel : chaque push sur la branche principale déploie le site.

## Outils de design

- `PRODUCT.md` et `DESIGN.md` : contexte produit et direction visuelle.
- `.claude/skills/impeccable` et `.claude/skills/ui-ux-pro-max` : skills de design chargées par Claude dans ce dépôt.
- `src/components/motion-primitives/` : composants Motion Primitives (MIT).

## Avant publication

- Relire les règles de `specimen.ts` sur un SIEM réel.
- Valider les noms de packs, les formats de livraison et la FAQ.
- Ajouter les mentions légales et la politique de confidentialité (obligatoires pour un site professionnel français qui collecte des e-mails).
