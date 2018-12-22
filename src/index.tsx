import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as ReduxStoreProvider } from 'react-redux';

import { getStore } from './state/store';
import initialState from './state/initialState';
import App from './App';

ReactDOM.render(
  <ReduxStoreProvider store={getStore(initialState)}>
    <App />
  </ReduxStoreProvider>,
  document.getElementById('root'),
);
