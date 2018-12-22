import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as ReduxStoreProvider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import { getStore } from './state/store';
import initialState from './state/initialState';
import Routes from './Routes';
import UserGate from './UserGate';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <ReduxStoreProvider store={getStore(initialState)}>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <UserGate>
          <Routes />
        </UserGate>
      </BrowserRouter>
    </MuiThemeProvider>
  </ReduxStoreProvider>,
  document.getElementById('root'),
);
