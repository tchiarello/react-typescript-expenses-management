import { ExpensesInterface, UserInterface } from './types';

// export interface ExpensesInterface {
//   id: number;
//   descricao: string;
//   categoria: string;
//   valor: number;
//   mes: string;
//   dia: string;
// }
// export interface UserInterface {
//   nome: string;
//   email: string;
// }

export async function getExpenses(
  year: string,
  month: string
): Promise<ExpensesInterface[]> {
  const res = await fetch(
    `http://localhost:3001/despesas?mes=${year}-${month}&_sort=dia`,
    { credentials: 'include' }
  );

  return handleResponse(res);
}

export function getUserEndpoint(): Promise<UserInterface> {
  return fetch(`http://localhost:3001/sessao/usuario`, {
    credentials: 'include',
  }).then(handleResponse);
}

export function signInEndpoint(
  email: string,
  password: string
): Promise<UserInterface> {
  return fetch(`http://localhost:3001/sessao/criar`, {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, senha: password }),
  }).then(handleResponse);
}

export function signOutEndpoint(): Promise<UserInterface> {
  return fetch(`http://localhost:3001/sessao/finalizar`, {
    credentials: 'include',
    method: 'POST',
  }).then(handleResponse);
}

function handleResponse(res: Response) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error(res.statusText);
  }
}
