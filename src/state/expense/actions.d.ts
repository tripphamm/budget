import { Dispatch } from 'redux';

import ActionType from './ActionType';
import { BudgeExpense, BudgeBill } from '../../budge-app-env';
import { BudgeState } from '../rootState';

type AnyExpenseAction =
  | SaveExpenseSuccessAction
  | SaveExpenseFailureAction
  | ClearSaveExpenseErrorAction
  | FetchExpensesSuccessAction
  | FetchExpensesFailureAction
  | ClearFetchExpensesErrorAction;

interface SaveExpenseSuccessAction {
  type: ActionType.SAVE_EXPENSE_SUCCESS;
  expense: BudgeExpense;
}

interface SaveExpenseFailureAction {
  type: ActionType.SAVE_EXPENSE_FAILURE;
  id: string;
  error: Error;
}

interface ClearSaveExpenseErrorAction {
  type: ActionType.CLEAR_SAVE_EXPENSE_ERROR;
  id: string;
}

interface FetchExpensesSuccessAction {
  type: ActionType.FETCH_EXPENSES_SUCCESS;
}

interface FetchExpensesFailureAction {
  type: ActionType.FETCH_EXPENSES_FAILURE;
  error: Error;
}

interface ClearFetchExpensesErrorAction {
  type: ActionType.CLEAR_FETCH_EXPENSES_ERROR;
}

// action creators

type SaveExpenseActionCreator = (
  bill: BudgeBill,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;