'use client'

export default function NewsletterSection (): React.ReactNode {
  return (
    <section id='newsletter' className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lavender-600 via-bouquet-500 to-moody-blue-600'>
      <div className='container mx-auto'>
        <div className='max-w-3xl mx-auto text-center text-white space-y-6'>
          <div className='text-6xl mb-4'>📧</div>
          <h2 className='text-4xl font-bold mb-4'>
            Rejoignez notre communauté !
          </h2>
          <p className='text-xl mb-2'>
            Inscrivez-vous à notre newsletter et recevez
          </p>
          <div className='inline-block bg-white text-lavender-600 px-6 py-3 rounded-full text-2xl font-bold mb-6 shadow-lg'>
            10% de réduction
          </div>
          <p className='text-lg mb-8'>
            sur votre premier achat in-app !
          </p>

          <div className='bg-white/10 backdrop-blur-sm rounded-2xl p-8 space-y-6'>
            <div className='flex flex-col sm:flex-row gap-4 max-w-xl mx-auto'>
              <input
                type='email'
                placeholder='Votre adresse email'
                className='flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 text-lg'
              />
              <button className='bg-white text-lavender-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-lavender-50 transition-all duration-300 hover:scale-105 shadow-lg'>
                S&apos;abonner
              </button>
            </div>

            <div className='flex flex-wrap justify-center gap-6 text-sm'>
              <div className='flex items-center gap-2'>
                <span className='text-2xl'>✨</span>
                <span>Offres exclusives</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-2xl'>🎁</span>
                <span>Cadeaux réguliers</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='text-2xl'>📰</span>
                <span>Actualités en avant-première</span>
              </div>
            </div>

            <p className='text-xs text-white/80'>
              En vous inscrivant, vous acceptez de recevoir nos emails marketing.
              Vous pouvez vous désabonner à tout moment.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
