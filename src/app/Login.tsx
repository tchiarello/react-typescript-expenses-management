import React from 'react';

import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { signInEndpoint } from './backend';
import { UserInterface } from './types';

interface LoginPropsInterface {
  onSignIn: (user: UserInterface) => void;
}

export default function Login(props: LoginPropsInterface) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState('');

  function handleChangeEmail(event: any) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event: any) {
    setPassword(event.target.value);
  }

  function signIn(event: React.FormEvent) {
    event.preventDefault();

    signInEndpoint(email, password).then(props.onSignIn, (e) => {
      setError('Email não encontrado ou senha incorreta');
    });
  }

  return (
    <Container maxWidth='sm'>
      <Box textAlign='center'>
        <h1>Login</h1>
      </Box>

      <form onSubmit={signIn}>
        <Box component='div' marginBottom='30px'>
          <TextField
            id='outlined-basic'
            label='Email'
            type='text'
            variant='outlined'
            fullWidth
            value={email}
            onChange={handleChangeEmail}
          />
        </Box>
        <Box component='div' marginBottom='30px'>
          <TextField
            id='outlined-password-input'
            label='Password'
            type='password'
            autoComplete='current-password'
            variant='outlined'
            fullWidth
            value={password}
            onChange={handleChangePassword}
          />
        </Box>

        {error && <Box marginBottom='30px'>{error}</Box>}

        <Box textAlign='center'>
          <Button type='submit' variant='contained' color='primary'>
            Enter
          </Button>
        </Box>
      </form>
    </Container>
  );
}
