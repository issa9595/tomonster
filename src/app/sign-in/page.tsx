import AuthFormContent from '@/components/forms/auth-form-content'
import { connectToDatabase } from '@/db'

/**
 * Page de connexion et d'inscription
 *
 * Responsabilités :
 * - Établir la connexion à la base de données
 * - Afficher le formulaire d'authentification (connexion/inscription)
 * - Créer une ambiance visuelle accueillante et ludique
 * - Rediriger les utilisateurs authentifiés vers le dashboard
 *
 * Design :
 * - Interface centrée avec animations de fond
 * - Formulaire à onglets (Sign In / Sign Up)
 * - Gradient coloré et effets de transparence
 *
 * @returns Page de connexion/inscription complète
 */
async function SignInPage (): Promise<React.ReactNode> {
  // Initialise la connexion à la base de données
  await connectToDatabase()

  return (
    <div className='min-h-screen bg-gradient-to-br from-moccaccino-50 via-fuchsia-blue-50 to-lochinvar-50 flex items-center justify-center p-4 relative overflow-hidden'>
      {/* Monstres animés en arrière-plan */}
      <div className='absolute inset-0 pointer-events-none overflow-hidden'>
        <div className='absolute top-20 left-10 text-6xl animate-bounce'>🥺</div>
        <div className='absolute top-32 right-20 text-5xl animate-pulse'>👾</div>
        <div className='absolute bottom-40 left-20 text-4xl animate-bounce' style={{ animationDelay: '1s' }}>🧸</div>
        <div className='absolute bottom-20 right-10 text-5xl animate-pulse' style={{ animationDelay: '2s' }}>🦄</div>
        <div className='absolute top-1/2 left-5 text-3xl animate-bounce' style={{ animationDelay: '0.5s' }}>🎀</div>
        <div className='absolute top-1/3 right-5 text-4xl animate-pulse' style={{ animationDelay: '1.5s' }}>🌟</div>
      </div>

      {/* Carte principale du formulaire */}
      <div className='w-full max-w-md relative z-10'>
        <div className='bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 p-8 relative overflow-hidden'>
          {/* Barre décorative en haut */}
          <div className='absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-moccaccino-400 via-fuchsia-blue-400 to-lochinvar-400' />

          {/* Message de bienvenue */}
          <div className='text-center mb-8'>
            <div className='text-5xl mb-4'>🎮</div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-moccaccino-600 to-fuchsia-blue-600 bg-clip-text text-transparent'>
              Bienvenue chez Tamagotcho !
            </h1>
            <p className='text-gray-600 mt-2 text-sm'>
              Vos petits monstres vous attendent 👹✨
            </p>
          </div>

          <AuthFormContent />
        </div>

        {/* Citation amusante sous la carte */}
        <div className='text-center mt-6 text-gray-600 text-sm'>
          <span className='italic'>"Un monstre par jour éloigne l'ennui pour toujours !"</span> 🎭
        </div>
      </div>
    </div>
  )
}

export default SignInPage
