import React, { useContext } from 'react';
import { UserInterface } from './backend';

export interface AuthContextInterface {
  user: UserInterface;
  onSignOut: () => void;
}

export const authContext = React.createContext<AuthContextInterface>({
  user: {
    nome: 'Anônimo',
    email: '',
  },
  onSignOut: () => {},
});

export function useAuthContext() {
  return useContext(authContext);
}
