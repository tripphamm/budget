import { combineReducers } from 'redux';

import billReducer from './bill/reducer';
import expenseReducer from './expense/reducer';
import sharedReducer from './shared/reducer';
import uploadReducer from './upload/reducer';
import userReducer from './user/reducer';

import billInitialState from './bill/initialState';
import expenseInitialState from './expense/initialState';
import sharedInitialState from './shared/initialState';
import uploadInitialState from './upload/initialState';
import userInitialState from './user/initialState';
import { BudgeState } from './rootState';

export const initialState: BudgeState = {
  billState: billInitialState,
  expenseState: expenseInitialState,
  sharedState: sharedInitialState,
  uploadState: uploadInitialState,
  userState: userInitialState,
};

export const reducer = combineReducers({
  billState: billReducer,
  expenseState: expenseReducer,
  sharedState: sharedReducer,
  uploadState: uploadReducer,
  userState: userReducer,
});
