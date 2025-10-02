import Button from '../button'

export default function MonstersSection (): React.ReactNode {
  const monsters = [
    { emoji: '🐙', name: 'Bubbles', description: 'Monstre aquatique joueur et câlin', tags: ['Eau', 'Sociable'], border: 'border-lavender-200', tagColors: ['bg-moody-blue-100 text-moody-blue-700', 'bg-lavender-100 text-lavender-700'] },
    { emoji: '🦋', name: 'Flutter', description: 'Créature ailée gracieuse et élégante', tags: ['Air', 'Calme'], border: 'border-bouquet-200', tagColors: ['bg-bouquet-100 text-bouquet-700', 'bg-lavender-100 text-lavender-700'] },
    { emoji: '🌱', name: 'Sprout', description: 'Petit monstre végétal plein de vie', tags: ['Nature', 'Paisible'], border: 'border-moody-blue-200', tagColors: ['bg-moody-blue-100 text-moody-blue-700', 'bg-lavender-100 text-lavender-700'] },
    { emoji: '⭐', name: 'Sparkle', description: 'Être céleste mystérieux et lumineux', tags: ['Lumière', 'Énergique'], border: 'border-lavender-200', tagColors: ['bg-lavender-100 text-lavender-700', 'bg-bouquet-100 text-bouquet-700'] },
    { emoji: '🔥', name: 'Blaze', description: 'Monstre de feu vif et passionné', tags: ['Feu', 'Actif'], border: 'border-bouquet-200', tagColors: ['bg-bouquet-100 text-bouquet-700', 'bg-moody-blue-100 text-moody-blue-700'] },
    { emoji: '🌙', name: 'Luna', description: 'Créature nocturne douce et rêveuse', tags: ['Nuit', 'Doux'], border: 'border-moody-blue-200', tagColors: ['bg-moody-blue-100 text-moody-blue-700', 'bg-lavender-100 text-lavender-700'] },
    { emoji: '🍄', name: 'Shroom', description: 'Petit champignon curieux et gourmand', tags: ['Terre', 'Curieux'], border: 'border-lavender-200', tagColors: ['bg-lavender-100 text-lavender-700', 'bg-bouquet-100 text-bouquet-700'] },
    { emoji: '💎', name: 'Crystal', description: 'Être cristallin rare et précieux', tags: ['Cristal', 'Rare'], border: 'border-bouquet-200', tagColors: ['bg-bouquet-100 text-bouquet-700', 'bg-moody-blue-100 text-moody-blue-700'] }
  ]

  return (
    <section id='monsters' className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-lavender-50 to-white'>
      <div className='container mx-auto'>
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-moody-blue-950 mb-4'>
            Rencontrez nos adorables monstres
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Chaque monstre a sa propre personnalité. Lequel choisir pour commencer
            votre aventure ?
          </p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
          {monsters.map((monster, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 ${monster.border}`}
            >
              <div className='text-center space-y-3'>
                <div className='text-8xl'>{monster.emoji}</div>
                <h3 className='text-xl font-bold text-moody-blue-900'>{monster.name}</h3>
                <p className='text-sm text-gray-600'>{monster.description}</p>
                <div className='flex justify-center gap-2 pt-2'>
                  {monster.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`${monster.tagColors[tagIndex]} px-3 py-1 rounded-full text-xs font-semibold`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='text-center mt-12'>
          <Button size='lg' variant='primary'>
            Découvrir tous les monstres
          </Button>
        </div>
      </div>
    </section>
  )
}
