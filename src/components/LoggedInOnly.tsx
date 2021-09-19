import * as React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { getUserEndpoint } from '../app/backend';

interface Props {
  children: React.ReactNode;
}

export function LoggedInOnly(props: Props) {
  const history = useHistory();
  const [isLoggedIn, setIsLoggedIn] = React.useState<boolean>(false);

  React.useEffect(() => {
    getUserEndpoint()
      .then(() => setIsLoggedIn(true))
      .catch(() => history.replace('/'));
  }, []);

  if (isLoggedIn === false) return null;

  return <>{props.children}</>;
}
