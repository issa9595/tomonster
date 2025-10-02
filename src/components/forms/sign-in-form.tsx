import { useState } from 'react'
import InputField from '../input'
import Button from '../button'
import { authClient } from '@/lib/auth-client'

interface Credentials {
  email: string
  password: string
}

function SignInForm (): React.ReactNode {
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    console.log('form submitted', credentials)

    void authClient.signIn.email({
      email: credentials.email,
      password: credentials.password,
      callbackURL: '/dashboard' // URL de redirection après connexion réussie
    }, {
      onRequest: (ctx) => {
        console.log('sign in request', ctx)
        // afficher le chargement
      },
      onSuccess: (ctx) => {
        console.log('sign in success', ctx)
        // rediriger vers le dashboard
      },
      onError: (ctx) => {
        console.log('sign in error', ctx)
        // afficher le message d'erreur
        alert(ctx.error.message)
      }
    })
  }

  return (
    <div>
      <h1>Sign In</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <InputField
          label='Email:'
          type='email'
          name='email'
          value={credentials.email}
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
        <InputField
          label='Password:'
          type='password'
          name='password'
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
        <Button type='submit'>Sign In</Button>
      </form>
    </div>
  )
}

export default SignInForm
