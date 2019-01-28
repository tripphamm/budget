import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider as ReduxStoreProvider } from 'react-redux';

import { getStore } from './state/store';
import { initialState } from './state/rootReducer';
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <ReduxStoreProvider store={getStore(initialState)}>
    <App />
  </ReduxStoreProvider>,
  document.getElementById('root'),
);

serviceWorker.register();
