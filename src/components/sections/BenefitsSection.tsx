export default function BenefitsSection (): React.ReactNode {
  const benefits = [
    {
      emoji: '🎮',
      title: 'Gameplay addictif',
      description: 'Des mécaniques de jeu simples mais captivantes qui vous garderont engagé pendant des heures. Chaque interaction compte !',
      gradient: 'from-lavender-50 to-lavender-100'
    },
    {
      emoji: '🌈',
      title: 'Monstres uniques',
      description: 'Plus de 50 espèces de monstres différents à découvrir, chacun avec sa personnalité et ses caractéristiques spéciales.',
      gradient: 'from-bouquet-50 to-bouquet-100'
    },
    {
      emoji: '📱',
      title: 'Multi-plateforme',
      description: 'Jouez où vous voulez ! ToMonster est disponible sur web, mobile et tablette avec synchronisation en temps réel.',
      gradient: 'from-moody-blue-50 to-moody-blue-100'
    },
    {
      emoji: '🎨',
      title: 'Personnalisation',
      description: 'Customisez votre monstre avec des accessoires, des tenues et des décorations pour le rendre vraiment unique.',
      gradient: 'from-lavender-50 to-lavender-100'
    },
    {
      emoji: '👥',
      title: 'Communauté active',
      description: 'Rejoignez des milliers de joueurs, échangez des conseils et participez à des événements communautaires réguliers.',
      gradient: 'from-bouquet-50 to-bouquet-100'
    },
    {
      emoji: '🏆',
      title: 'Défis & Récompenses',
      description: 'Complétez des missions quotidiennes, participez à des tournois et débloquez des récompenses exclusives.',
      gradient: 'from-moody-blue-50 to-moody-blue-100'
    }
  ]

  return (
    <section id='benefits' className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='container mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-moody-blue-950 mb-4'>
            Pourquoi choisir ToMonster ?
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Découvrez tous les avantages de notre jeu unique et laissez-vous séduire
            par l&apos;univers fantastique de vos petits compagnons virtuels.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br ${benefit.gradient} rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}
            >
              <div className='text-5xl mb-4'>{benefit.emoji}</div>
              <h3 className='text-2xl font-bold text-moody-blue-900 mb-3'>
                {benefit.title}
              </h3>
              <p className='text-gray-700'>{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
