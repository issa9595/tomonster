'use client'

import { useState } from 'react'
import SignUpForm from './signup-form'
import SignInForm from './signin-form'
import Button from '../button'
import { authClient } from '@/lib/auth-client'

function AuthFormContent (): React.ReactNode {
  const [isSignIn, setIsSignIn] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  return (
    <div className='space-y-6'>
      {/* Error display */}
      {(error.length > 0) && (
        <div className='bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl animate-pulse'>
          <div className='flex items-center'>
            <span className='text-red-400 mr-2'>⚠️</span>
            <p className='text-red-700 text-sm font-medium'>{error}</p>
          </div>
        </div>
      )}

      {/* Form container with smooth transition */}
      <div className='transition-all duration-300 ease-in-out'>
        {isSignIn
          ? (
            <div className='animate-in fade-in duration-300'>
              <SignInForm onError={setError} />
            </div>
            )
          : (
            <div className='animate-in fade-in duration-300'>
              <SignUpForm onError={setError} />
            </div>
            )}
      </div>

      {/* GitHub OAuth */}
      <div className='relative my-2'>
        <div className='absolute inset-0 flex items-center'>
          <div className='w-full border-t border-gray-200' />
        </div>
        <div className='relative flex justify-center text-sm'>
          <span className='bg-white px-3 text-gray-400 font-medium'>ou continuer avec</span>
        </div>
      </div>

      <button
        type='button'
        onClick={async () => {
          await authClient.signIn.social({ provider: 'github', callbackURL: '/app' })
        }}
        className='w-full flex items-center justify-center gap-3 px-4 py-3 border-2 border-gray-200 rounded-2xl font-bold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all duration-200'
      >
        <svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor' aria-hidden='true'>
          <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
        </svg>
        Se connecter avec GitHub
      </button>

      {/* Toggle button */}
      <div className='text-center pt-4 border-t border-gray-200'>
        <Button
          type='button'
          variant='ghost'
          size='sm'
          onClick={() => {
            setError('') // Clear errors when switching
            setIsSignIn(!isSignIn)
          }}
        >
          {isSignIn ? '🆕 Créer un compte' : '🔐 J\'ai déjà un compte'}
        </Button>
      </div>
    </div>
  )
}

export default AuthFormContent
