'use client'

import Button from './button'

interface HeaderProps {
  onCreateCharacter?: () => void
}

export default function Header ({ onCreateCharacter }: HeaderProps): React.ReactNode {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId)
    if (element != null) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className='fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-lavender-200 shadow-sm'>
      <nav className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between h-16'>
          {/* Logo */}
          <div className='flex items-center'>
            <div className='text-2xl font-bold text-lavender-600 flex items-center gap-2'>
              <span className='text-3xl'>🐾</span>
              <span>ToMonster</span>
            </div>
          </div>

          {/* Navigation Desktop */}
          <div className='hidden md:flex items-center gap-8'>
            <button
              onClick={() => { scrollToSection('hero') }}
              className='text-gray-700 hover:text-lavender-600 transition-colors duration-200 font-medium'
            >
              Accueil
            </button>
            <button
              onClick={() => { scrollToSection('benefits') }}
              className='text-gray-700 hover:text-lavender-600 transition-colors duration-200 font-medium'
            >
              Avantages
            </button>
            <button
              onClick={() => { scrollToSection('monsters') }}
              className='text-gray-700 hover:text-lavender-600 transition-colors duration-200 font-medium'
            >
              Monstres
            </button>
            <button
              onClick={() => { scrollToSection('actions') }}
              className='text-gray-700 hover:text-lavender-600 transition-colors duration-200 font-medium'
            >
              Actions
            </button>
            <button
              onClick={() => { scrollToSection('newsletter') }}
              className='text-gray-700 hover:text-lavender-600 transition-colors duration-200 font-medium'
            >
              Newsletter
            </button>
          </div>

          {/* CTA Button */}
          <div className='flex items-center gap-4'>
            <Button
              size='md'
              variant='primary'
              onClick={onCreateCharacter}
            >
              Créer mon monstre
            </Button>
          </div>
        </div>
      </nav>
    </header>
  )
}
