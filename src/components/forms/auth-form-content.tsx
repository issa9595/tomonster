'use client'

import { useState } from 'react'
import SignUpForm from './sign-up-form'
import SignInForm from './sign-in-form'
import Button from '../button'

function AuthFormContent (): React.ReactNode {
  const [isSignUp, setIsSignUp] = useState<boolean>(false)

  return (
    <div>
      <h1>Welcome Back</h1>
      <p>{isSignUp ? 'Please enter your credentials to continue.' : 'Please enter your credentials to continue.'}</p>
      {isSignUp ? <SignUpForm /> : <SignInForm />}
      <Button
        type='button'
        variant='ghost'
        onClick={() => setIsSignUp(!isSignUp)}
      >
        {isSignUp ? 'Already have an account? Sign In' : 'Create an account'}
      </Button>
    </div>
  )
}

export default AuthFormContent
