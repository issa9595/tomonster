# Notes d'implémentation — Évaluation Fil Rouge

## Fonctionnalités ajoutées

### 1. Système d'accessoires & backgrounds (Feature 1)

**Modèles :**
- `src/db/models/inventory.model.ts` — Inventaire par utilisateur (`accessories: string[]`, `backgrounds: string[]`)
- Monster étendu : `equippedAccessories.{hat, glasses, shoes}` + `equippedBackground`

**Catalogue :**
- `src/config/accessories.config.ts` — 18 accessoires, 4 raretés (Common/Rare/Epic/Legendary) avec prix en Koins
- `src/config/backgrounds.config.ts` — 8 fonds dégradés

**Actions (Server Actions) :**
- `src/actions/accessories.actions.ts` — `getInventory()`, `buyAccessory(id)`, `equipAccessory(monsterId, id, category)`
- `src/actions/backgrounds.actions.ts` — `buyBackground(id)`, `equipBackground(monsterId, id)`

**UI :**
- Shop dans `/app/wallet` avec sections accessoires et backgrounds (chargement `dynamic()`)
- Sélecteurs sur la page créature `/app/creatures/[id]`
- Affichage des accessoires équipés dans `GalleryCard`

---

### 2. Finalisation de la base (Feature 2)

- **Redirection homepage** : `src/app/page.tsx` redirige vers `/app` si session active
- **GitHub OAuth** : bouton ajouté dans `src/components/forms/auth-form-content.tsx`
- **Récompenses Koins** : `src/config/rewards.ts` + intégration dans `doActionOnMonster`
- **Stripe** : locale `fr`, message personnalisé, URLs corrigées vers `/app/wallet`
- **Toast notifications** : feedback immédiat lors des actions sur monstres

---

### 3. Galerie communautaire (Feature 3)

- Champ `isPublic` sur Monster (défaut `false`)
- `/app/gallery` : grille paginée des monstres publics, ISR 30s, filtre par état
- Toggle public/privé sur chaque page créature via Server Action inline
- Navigation header mise à jour avec lien Galerie

---

### 4. Quêtes quotidiennes (Feature 4)

**Modèle :**
- `src/db/models/daily-quest.model.ts` — Document par utilisateur + par jour, index unique `{ownerId, date}`

**Logique :**
- `src/config/quests.config.ts` — 8 templates, sélection déterministe de 3 quêtes/jour par hash de `userId-date`
- `src/actions/quests.actions.ts` — `getTodayQuests()` (crée si absent), `progressQuest()`, `resetAllDailyQuests()`
- `progressQuest` appelé dans `doActionOnMonster` après chaque action réussie
- Récompense Koins automatique à la complétion d'une quête

**Cron :**
- `src/app/api/cron/reset-quests/route.ts` — endpoint sécurisé par `CRON_SECRET`
- `vercel.json` — schedule `0 0 * * *` (minuit UTC)

**UI :**
- `src/components/quests/quest-card.tsx` — barre de progression + état complété
- `src/components/quests/quests-section.tsx` — grille 3 quêtes dans le dashboard

---

## Optimisations

Voir `docs/OPTIMIZATION_PLAN.md` pour le détail complet.

| Technique | Fichier | Impact |
|-----------|---------|--------|
| `useMemo` | `accessories-shop-section.tsx` | Évite re-filtrage du catalogue |
| `useCallback` | `accessory-selector.tsx`, `background-selector.tsx` | Stabilité des handlers |
| `dynamic()` | `wallet/page.tsx` | Réduction bundle initial |
| ISR 30s | `gallery/page.tsx` | Cache MongoDB galerie |
| Index MongoDB | `monster.model.ts`, `inventory.model.ts`, `daily-quest.model.ts` | Requêtes O(log n) |

---

## Variables d'environnement requises

```env
CRON_SECRET=<secret aléatoire>         # Sécurise le endpoint cron
NEXT_PUBLIC_APP_URL=https://...         # URL de l'application (pour Stripe redirects)
```
