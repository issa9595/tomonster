import Button from '../button'

export default function HeroSection (): React.ReactNode {
  return (
    <section id='hero' className='pt-24 pb-16 px-4 sm:px-6 lg:px-8'>
      <div className='container mx-auto'>
        <div className='flex flex-col lg:flex-row items-center justify-between gap-12 py-12'>
          {/* Contenu texte */}
          <div className='flex-1 space-y-6 text-center lg:text-left'>
            <h1 className='text-5xl lg:text-6xl font-bold text-moody-blue-950 leading-tight'>
              Adoptez votre
              <span className='text-lavender-600'> petit monstre </span>
              et vivez une aventure unique !
            </h1>
            <p className='text-xl text-gray-600 max-w-2xl'>
              Découvrez l&apos;univers magique de ToMonster où vous prenez soin de votre
              compagnon virtuel. Nourrissez-le, jouez avec lui et regardez-le grandir !
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4'>
              <Button size='xl' variant='primary'>
                Commencer l&apos;aventure
              </Button>
              <Button size='xl' variant='outline'>
                En savoir plus
              </Button>
            </div>
            <div className='flex items-center gap-8 justify-center lg:justify-start pt-8'>
              <div className='text-center'>
                <p className='text-3xl font-bold text-lavender-600'>10K+</p>
                <p className='text-sm text-gray-600'>Joueurs actifs</p>
              </div>
              <div className='text-center'>
                <p className='text-3xl font-bold text-lavender-600'>50+</p>
                <p className='text-sm text-gray-600'>Monstres uniques</p>
              </div>
              <div className='text-center'>
                <p className='text-3xl font-bold text-lavender-600'>4.8★</p>
                <p className='text-sm text-gray-600'>Note moyenne</p>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className='flex-1 flex justify-center'>
            <div className='relative w-full max-w-md'>
              <div className='absolute inset-0 bg-gradient-to-r from-lavender-400 to-bouquet-400 rounded-full blur-3xl opacity-30 animate-pulse' />
              <div className='relative bg-white rounded-3xl shadow-2xl p-8 border-4 border-lavender-200'>
                <div className='text-center space-y-4'>
                  <div className='text-9xl animate-bounce'>🐙</div>
                  <p className='text-2xl font-bold text-moody-blue-900'>Bubbles</p>
                  <div className='flex justify-center gap-4'>
                    <div className='bg-lavender-100 px-4 py-2 rounded-full'>
                      <p className='text-sm font-semibold text-lavender-700'>❤️ 95%</p>
                    </div>
                    <div className='bg-bouquet-100 px-4 py-2 rounded-full'>
                      <p className='text-sm font-semibold text-bouquet-700'>🍔 80%</p>
                    </div>
                    <div className='bg-moody-blue-100 px-4 py-2 rounded-full'>
                      <p className='text-sm font-semibold text-moody-blue-700'>😊 100%</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
