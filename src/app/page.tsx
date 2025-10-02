'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import HeroSection from '@/components/sections/HeroSection'
import BenefitsSection from '@/components/sections/BenefitsSection'
import MonstersSection from '@/components/sections/MonstersSection'
import ActionsSection from '@/components/sections/ActionsSection'
import NewsletterSection from '@/components/sections/NewsletterSection'

export default function Home (): React.ReactNode {
  return (
    <div className='min-h-screen bg-gradient-to-b from-white to-lavender-50'>
      <Header onCreateCharacter={() => { console.log('Créer un personnage') }} />
      <HeroSection />
      <BenefitsSection />
      <MonstersSection />
      <ActionsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
