# Instructions - ToMonster Landing Page

## Résumé des actions effectuées

### Date : 2 octobre 2025

#### 1. Architecture et Structure
- **Application des principes** : SOLID, Clean Code et Clean Architecture
- **Structure modulaire** : Séparation des composants en modules réutilisables
- **Organisation des fichiers** :
  - `src/components/` : Composants réutilisables (Header, Footer, Button)
  - `src/components/sections/` : Sections spécifiques de la page d'accueil
  - `src/app/` : Pages et configuration Next.js

#### 2. Composants créés

##### Composants de navigation et layout
- **Header.tsx** : 
  - Navigation fixe avec logo ToMonster (🐾)
  - Menu de navigation par ancre (Accueil, Avantages, Monstres, Actions, Newsletter)
  - Bouton CTA mis en avant "Créer mon monstre"
  - Responsive avec design moderne

- **Footer.tsx** :
  - 4 colonnes : Logo/Description, Liens rapides, Support, Informations légales
  - Liens fictifs vers CGU, Politique de confidentialité, Mentions légales, Cookies
  - Réseaux sociaux avec emojis
  - Copyright dynamique avec année actuelle
  - Design avec couleur moody-blue-950

##### Sections de contenu

- **HeroSection.tsx** :
  - Titre accrocheur avec "petit monstre" en couleur lavender
  - Sous-titre descriptif du jeu
  - 2 CTA : "Commencer l'aventure" et "En savoir plus"
  - Statistiques : 10K+ joueurs, 50+ monstres, 4.8★ note
  - Illustration d'un monstre exemple (Bubbles 🐙) avec indicateurs de stats
  - Animation de pulsation sur le fond
  - Responsive design avec mise en page flex

- **BenefitsSection.tsx** :
  - 6 cartes de bénéfices avec emojis :
    1. 🎮 Gameplay addictif
    2. 🌈 Monstres uniques (50+ espèces)
    3. 📱 Multi-plateforme
    4. 🎨 Personnalisation
    5. 👥 Communauté active
    6. 🏆 Défis & Récompenses
  - Dégradés de couleurs alternant lavender, bouquet et moody-blue
  - Effet hover avec élévation et ombre
  - Grid responsive (1/2/3 colonnes)

- **MonstersSection.tsx** :
  - Galerie de 8 monstres différents :
    1. 🐙 Bubbles (Eau, Sociable)
    2. 🦋 Flutter (Air, Calme)
    3. 🌱 Sprout (Nature, Paisible)
    4. ⭐ Sparkle (Lumière, Énergique)
    5. 🔥 Blaze (Feu, Actif)
    6. 🌙 Luna (Nuit, Doux)
    7. 🍄 Shroom (Terre, Curieux)
    8. 💎 Crystal (Cristal, Rare)
  - Chaque carte contient : emoji, nom, description, 2 tags de caractéristiques
  - Bordures colorées variant selon le monstre
  - Bouton CTA "Découvrir tous les monstres"
  - Grid responsive 1/2/4 colonnes

- **ActionsSection.tsx** :
  - 6 actions principales avec le monstre :
    1. 🍔 Nourrir
    2. 🎮 Jouer
    3. 🛁 Nettoyer
    4. 💤 Dormir
    5. 🎓 Entraîner
    6. 💝 Câliner
  - Icônes rondes avec dégradés de couleurs
  - Descriptions détaillées de chaque action
  - Encart final "Et bien plus encore !" avec dégradé tricolore
  - Grid responsive

- **NewsletterSection.tsx** :
  - Fond dégradé vibrant (lavender → bouquet → moody-blue)
  - Mise en avant de l'offre : 10% de réduction sur premier achat
  - Formulaire email avec bouton "S'abonner"
  - 3 bénéfices de l'abonnement : Offres exclusives, Cadeaux, Actualités
  - Mention RGPD/légale sur la désinscription
  - Design glassmorphism avec backdrop-blur

#### 3. Mise à jour des métadonnées
- Titre SEO : "ToMonster - Prenez soin de votre petit monstre virtuel"
- Description optimisée pour le référencement

#### 4. Utilisation des couleurs personnalisées
Toutes les sections utilisent les couleurs définies dans `globals.css` :
- **lavender** (50-950) : Couleur principale, CTA, accents
- **bouquet** (50-950) : Couleur secondaire, variations
- **moody-blue** (50-950) : Couleur tertiaire, texte sombre, footer

#### 5. Fonctionnalités implémentées
- Navigation fluide par ancres (smooth scroll)
- Design responsive mobile-first
- Animations et transitions CSS
- Effets hover interactifs
- État "use client" pour les composants interactifs
- TypeScript strict avec types React.ReactNode

#### 6. Technologies utilisées
- **Next.js 15.5.4** avec App Router
- **React 19.1.0**
- **Tailwind CSS 4** avec configuration inline @theme
- **TypeScript 5**
- Linter : ts-standard

## Structure finale des fichiers

```
src/
├── app/
│   ├── layout.tsx (mis à jour avec métadonnées)
│   ├── page.tsx (page d'accueil principale)
│   └── globals.css (couleurs personnalisées)
├── components/
│   ├── button.tsx (existant)
│   ├── Header.tsx (nouveau)
│   ├── Footer.tsx (nouveau)
│   └── sections/
│       ├── HeroSection.tsx (nouveau)
│       ├── BenefitsSection.tsx (nouveau)
│       ├── MonstersSection.tsx (nouveau)
│       ├── ActionsSection.tsx (nouveau)
│       └── NewsletterSection.tsx (nouveau)
```

## Points d'attention pour le futur

1. **Navigation** : La fonction `onCreateCharacter` dans le Header est actuellement un console.log - à remplacer par la vraie navigation vers la page de création de compte

2. **Formulaire Newsletter** : L'input email et le bouton sont statiques - implémenter la logique de soumission

3. **Images** : Les monstres utilisent actuellement des emojis - peuvent être remplacés par de vraies illustrations

4. **Animations** : Possibilité d'ajouter Framer Motion pour des animations plus avancées

5. **Accessibilité** : Ajouter des aria-labels pour améliorer l'accessibilité

6. **Internationalisation** : Structure prête pour ajouter i18n si nécessaire

## Commandes utiles

```bash
# Lancer le serveur de développement
npm run dev

# Créer un build de production
npm run build

# Lancer le linter
npm run lint
```

