import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { BudgeState } from '../budge-app-env';
import reducer from './reducer';

const enhancers = composeWithDevTools(applyMiddleware(thunk));

let store: Store<BudgeState> | null = null;
export function getStore(initialState?: BudgeState) {
  if (store === null) {
    store = createStore(reducer, initialState, enhancers);
  }

  return store;
}
