import { createStore, applyMiddleware, Store } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { reducer } from './rootReducer';
import { BudgeState } from './rootState';

const enhancers = composeWithDevTools(applyMiddleware(thunk));

let store: Store<BudgeState> | null = null;
export function getStore(initialState?: BudgeState) {
  if (store === null) {
    store = createStore(reducer, initialState, enhancers);
  }

  return store;
}
