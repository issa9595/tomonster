export default function ActionsSection (): React.ReactNode {
  const actions = [
    {
      emoji: '🍔',
      title: 'Nourrir',
      description: 'Donnez à manger à votre monstre pour maintenir son niveau d\'énergie et le garder heureux.',
      gradient: 'from-lavender-400 to-lavender-600',
      hoverBg: 'hover:bg-lavender-50'
    },
    {
      emoji: '🎮',
      title: 'Jouer',
      description: 'Amusez-vous avec votre monstre à travers différents mini-jeux et activités amusantes.',
      gradient: 'from-bouquet-400 to-bouquet-600',
      hoverBg: 'hover:bg-bouquet-50'
    },
    {
      emoji: '🛁',
      title: 'Nettoyer',
      description: 'Prenez soin de l\'hygiène de votre monstre pour qu\'il reste propre et en bonne santé.',
      gradient: 'from-moody-blue-400 to-moody-blue-600',
      hoverBg: 'hover:bg-moody-blue-50'
    },
    {
      emoji: '💤',
      title: 'Dormir',
      description: 'Mettez votre monstre au lit pour qu\'il récupère et se repose après une longue journée.',
      gradient: 'from-lavender-400 to-lavender-600',
      hoverBg: 'hover:bg-lavender-50'
    },
    {
      emoji: '🎓',
      title: 'Entraîner',
      description: 'Développez les compétences de votre monstre et débloquez de nouvelles capacités.',
      gradient: 'from-bouquet-400 to-bouquet-600',
      hoverBg: 'hover:bg-bouquet-50'
    },
    {
      emoji: '💝',
      title: 'Câliner',
      description: 'Montrez de l\'affection à votre monstre pour renforcer votre lien d\'amitié.',
      gradient: 'from-moody-blue-400 to-moody-blue-600',
      hoverBg: 'hover:bg-moody-blue-50'
    }
  ]

  return (
    <section id='actions' className='py-16 px-4 sm:px-6 lg:px-8 bg-white'>
      <div className='container mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-moody-blue-950 mb-4'>
            Prenez soin de votre monstre
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            De nombreuses actions pour interagir avec votre compagnon et créer un lien unique.
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto'>
          {actions.map((action, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center space-y-4 p-6 rounded-2xl ${action.hoverBg} transition-all duration-300`}
            >
              <div className={`w-20 h-20 bg-gradient-to-br ${action.gradient} rounded-full flex items-center justify-center text-4xl shadow-lg`}>
                {action.emoji}
              </div>
              <h3 className='text-xl font-bold text-moody-blue-900'>{action.title}</h3>
              <p className='text-gray-600'>{action.description}</p>
            </div>
          ))}
        </div>

        <div className='mt-16 bg-gradient-to-r from-lavender-100 via-bouquet-100 to-moody-blue-100 rounded-3xl p-8 max-w-4xl mx-auto'>
          <div className='text-center space-y-4'>
            <h3 className='text-2xl font-bold text-moody-blue-950'>
              Et bien plus encore !
            </h3>
            <p className='text-lg text-gray-700'>
              Explorez, décorez, participez à des événements spéciaux et découvrez
              de nouvelles surprises chaque jour avec votre monstre !
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
