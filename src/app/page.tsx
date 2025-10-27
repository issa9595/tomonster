import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import BenefitsSection from '@/components/benefits-section'
import MonstersSection from '@/components/monsters-section'
import ActionsSection from '@/components/actions-section'
import NewsletterSection from '@/components/newsletter-section'
import Footer from '@/components/footer'
import { Metadata } from 'next'

/**
 * Métadonnées pour la page d'accueil
 * Définit le titre, la description et les données OpenGraph/Twitter pour le SEO
 */
export const metadata: Readonly<Metadata> = {
  title: 'Tamagotcho - Adopte et prends soin de ton compagnon virtuel',
  description: 'Tamagotcho est une application web où tu peux adopter, nourrir, jouer et faire évoluer ton propre monstre virtuel. Rejoins-nous pour une aventure amusante et interactive !',
  keywords: 'Tamagotcho, monstre virtuel, adoption, jeu, aventure',
  openGraph: {
    title: 'Tamagotcho - Adopte et prends soin de ton compagnon virtuel',
    description: 'Tamagotcho est une application web où tu peux adopter, nourrir, jouer et faire évoluer ton propre monstre virtuel. Rejoins-nous pour une aventure amusante et interactive !'
  },
  twitter: {
    title: 'Tamagotcho - Adopte et prends soin de ton compagnon virtuel',
    description: 'Tamagotcho est une application web où tu peux adopter, nourrir, jouer et faire évoluer ton propre monstre virtuel. Rejoins-nous pour une aventure amusante et interactive !'
  }
}

/**
 * Page d'accueil de l'application Tamagotcho
 *
 * Responsabilités :
 * - Orchestrer l'affichage de toutes les sections de la landing page
 * - Présenter l'application aux visiteurs non connectés
 * - Encourager l'inscription et l'adoption d'un premier monstre
 *
 * Architecture :
 * - Suit le principe Single Responsibility : chaque section est un composant indépendant
 * - Applique Clean Architecture : séparation claire entre présentation et logique
 *
 * @returns Page d'accueil complète avec toutes les sections
 */
export default function Home (): React.ReactNode {
  return (
    <div className='font-sans'>
      <Header />
      <HeroSection />
      <BenefitsSection />
      <MonstersSection />
      <ActionsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
