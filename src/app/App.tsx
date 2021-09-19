import React from 'react';
import { useHistory } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';

import Expenses from './Expenses';
import Login from './Login';
import { getUserEndpoint } from './backend';
import { UserInterface } from './types';
import { LoggedInOnly } from '../components/LoggedInOnly';
import { getMonthAsString } from '../helpers';
import { authContext } from './authContext';

const currentMonth = new Date().getMonth() + 1;
const currentYear = new Date().getFullYear();

export default function App() {
  const [user, setUser] = React.useState<UserInterface | null>(null);
  const history = useHistory();

  React.useEffect(() => {
    getUserEndpoint().then(setUser, onSignOut);
  }, []);

  function onSignOut() {
    setUser(null);
    history.replace(`/`);
  }

  function handleUserSignIn(user: UserInterface) {
    setUser(user);
    history.push(`/${currentYear}-${getMonthAsString(currentMonth)}`);
  }

  return (
    <div>
      <Switch>
        <Route path='/' exact={true}>
          <Login onSignIn={handleUserSignIn} />
        </Route>
        {user !== null && (
          <authContext.Provider value={{ user, onSignOut }}>
            <LoggedInOnly>
              <Route path='/despesas/:year-:month'>
                <Expenses />
              </Route>
            </LoggedInOnly>
          </authContext.Provider>
        )}
      </Switch>
    </div>
  );
}
