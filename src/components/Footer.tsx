export default function Footer (): React.ReactNode {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='bg-moody-blue-950 text-white py-12'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
          {/* Logo et description */}
          <div className='col-span-1'>
            <div className='text-2xl font-bold mb-4 flex items-center gap-2'>
              <span className='text-3xl'>🐾</span>
              <span>ToMonster</span>
            </div>
            <p className='text-moody-blue-300 text-sm'>
              Prenez soin de votre petit monstre virtuel et vivez une aventure unique !
            </p>
          </div>

          {/* Liens rapides */}
          <div>
            <h3 className='font-semibold text-lg mb-4'>Liens rapides</h3>
            <ul className='space-y-2 text-moody-blue-300 text-sm'>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Accueil
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  À propos
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Communauté
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='font-semibold text-lg mb-4'>Support</h3>
            <ul className='space-y-2 text-moody-blue-300 text-sm'>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Centre d&apos;aide
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  FAQ
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Contact
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Feedback
                </a>
              </li>
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className='font-semibold text-lg mb-4'>Informations légales</h3>
            <ul className='space-y-2 text-moody-blue-300 text-sm'>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Conditions d&apos;utilisation
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Politique de confidentialité
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Mentions légales
                </a>
              </li>
              <li>
                <a href='#' className='hover:text-lavender-300 transition-colors'>
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Séparateur */}
        <div className='border-t border-moody-blue-800 mt-8 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-moody-blue-400 text-sm'>
              © {currentYear} ToMonster. Tous droits réservés.
            </p>
            <div className='flex gap-6'>
              <a href='#' className='text-moody-blue-400 hover:text-lavender-300 transition-colors'>
                <span className='text-xl'>📘</span>
              </a>
              <a href='#' className='text-moody-blue-400 hover:text-lavender-300 transition-colors'>
                <span className='text-xl'>🐦</span>
              </a>
              <a href='#' className='text-moody-blue-400 hover:text-lavender-300 transition-colors'>
                <span className='text-xl'>📷</span>
              </a>
              <a href='#' className='text-moody-blue-400 hover:text-lavender-300 transition-colors'>
                <span className='text-xl'>💬</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
