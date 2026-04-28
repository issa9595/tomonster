# Performance Optimization Plan

## Techniques appliquées

### 1. `useMemo` — Mémorisation de calculs coûteux

**Où :** `src/components/shop/accessories-shop-section.tsx`

```tsx
const filteredCatalog = useMemo(
  () => ACCESSORIES_CATALOG.filter(a => a.category === activeCategory),
  [activeCategory]
)
```

**Pourquoi :** Le catalogue complet est filtré à chaque render. `useMemo` évite de recalculer le filtre si la catégorie n'a pas changé.

---

### 2. `useCallback` — Stabilisation des handlers

**Où :** `src/components/accessories/accessory-selector.tsx`, `src/components/backgrounds/background-selector.tsx`

```tsx
const handleEquip = useCallback(async (id: string) => {
  await equipAccessory(monsterId, id, category)
  router.refresh()
}, [monsterId, category, router])
```

**Pourquoi :** Les handlers créés à chaque render provoquent des re-renders inutiles sur les composants enfants. `useCallback` garantit la stabilité de référence.

---

### 3. `dynamic()` — Chargement différé

**Où :** `src/app/app/wallet/page.tsx`

```tsx
const AccessoriesShopSection = dynamic(
  () => import('@/components/shop/accessories-shop-section'),
  { loading: () => <div className="animate-pulse h-40 bg-gray-100 rounded-2xl" /> }
)
```

**Pourquoi :** Les sections shop sont volumineuses (catalogue complet). Le lazy loading réduit le bundle initial de la page wallet.

---

### 4. ISR — Incremental Static Regeneration

**Où :** `src/app/app/gallery/page.tsx`

```tsx
export const revalidate = 30
```

**Pourquoi :** La galerie communautaire est lue fréquemment mais les données ne changent pas toutes les secondes. ISR sert la page depuis le cache pendant 30 secondes, réduisant la charge MongoDB.

---

### 5. Index MongoDB — Requêtes optimisées

**Où :** `src/db/models/monster.model.ts`

```ts
monsterSchema.index({ ownerId: 1 })
monsterSchema.index({ isPublic: 1, createdAt: -1 })
```

**Pourquoi :**
- Index `ownerId` accélère toutes les requêtes `Monster.find({ ownerId: userId })`
- Index composé `isPublic + createdAt` optimise la requête de galerie triée par date

---

## Recommandations futures

- Ajouter `React.memo` sur `MonsterCard` si la liste de monstres dépasse 20 items
- Paginer les requêtes MongoDB dès que le nombre de monstres par utilisateur dépasse 50
- Envisager Redis pour le cache des quêtes quotidiennes si l'audience scale
