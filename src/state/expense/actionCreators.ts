import ActionType from './ActionType';
import { BudgeExpense } from '../../budge-app-env';
import {
  SaveExpenseSuccessAction,
  SaveExpenseFailureAction,
  ClearSaveExpenseErrorAction,
  FetchExpensesSuccessAction,
  FetchExpensesFailureAction,
  ClearFetchExpensesErrorAction,
} from './actions';

export function saveExpenseSuccess(expense: BudgeExpense): SaveExpenseSuccessAction {
  return {
    type: ActionType.SAVE_EXPENSE_SUCCESS,
    expense,
  };
}

export function saveExpenseFailure(id: string, error: Error): SaveExpenseFailureAction {
  return {
    type: ActionType.SAVE_EXPENSE_FAILURE,
    id,
    error,
  };
}

export function clearSaveExpenseError(id: string): ClearSaveExpenseErrorAction {
  return {
    type: ActionType.CLEAR_SAVE_EXPENSE_ERROR,
    id,
  };
}

export function fetchExpensesSuccess(): FetchExpensesSuccessAction {
  return {
    type: ActionType.FETCH_EXPENSES_SUCCESS,
  };
}

export function fetchExpensesFailure(error: Error): FetchExpensesFailureAction {
  return {
    type: ActionType.FETCH_EXPENSES_FAILURE,
    error,
  };
}

export function clearFetchExpensesError(id: string): ClearFetchExpensesErrorAction {
  return {
    type: ActionType.CLEAR_FETCH_EXPENSES_ERROR,
  };
}
