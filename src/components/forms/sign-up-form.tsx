import { useState } from 'react'
import InputField from '../input'
import Button from '../button'

interface Credentials {
  email: string
  password: string
}

function SignUpForm (): React.ReactNode {
  const [credentials, setCredentials] = useState<Credentials>({ email: '', password: '' })
  return (
    <div>
      <h1>Sign Up</h1>
      <form>
        <InputField
          type='email'
          name='email'
          label='Email'
          value={credentials.email}
          onChangeText={(text) => setCredentials({ ...credentials, email: text })}
        />
        <InputField
          type='password'
          name='password'
          label='Password'
          value={credentials.password}
          onChangeText={(text) => setCredentials({ ...credentials, password: text })}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
