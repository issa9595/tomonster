// Clean Architecture: Presentation layer imports application components
import HeaderWrapper from '@/components/header-wrapper'
import HeroSection from '@/components/hero-section'
import BenefitsSection from '@/components/benefits-section'
import MonstersSection from '@/components/monsters-section'
import ActionsSection from '@/components/actions-section'
import NewsletterSection from '@/components/newsletter-section'
import Footer from '@/components/footer'
import { Metadata } from 'next'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

export const metadata: Readonly<Metadata> = {
  title: 'ToMonster - Adopte et prends soin de ton compagnon virtuel',
  description: 'ToMonster est une application web où tu peux adopter, nourrir, jouer et faire évoluer ton propre monstre virtuel. Rejoins-nous pour une aventure amusante et interactive !',
  keywords: 'ToMonster, monstre virtuel, adoption, jeu, aventure',
  openGraph: {
    title: 'ToMonster - Adopte et prends soin de ton compagnon virtuel',
    description: 'ToMonster est une application web où tu peux adopter, nourrir, jouer et faire évoluer ton propre monstre virtuel. Rejoins-nous pour une aventure amusante et interactive !'
  },
  twitter: {
    title: 'ToMonster - Adopte et prends soin de ton compagnon virtuel',
    description: 'ToMonster est une application web où tu peux adopter, nourrir, jouer et faire évoluer ton propre monstre virtuel. Rejoins-nous pour une aventure amusante et interactive !'
  }
}

// Single Responsibility: Home page orchestrates the layout of sections
export default async function Home (): Promise<React.ReactNode> {
  const session = await auth.api.getSession({ headers: await headers() })
  if (session !== null && session !== undefined) {
    redirect('/app')
  }

  return (
    <div className='font-sans'>
      <HeaderWrapper />
      <HeroSection />
      <BenefitsSection />
      <MonstersSection />
      <ActionsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
