import ActionType from './ActionType';
import { BudgeExpense } from '../../budge-app-env';
import {
  SaveExpenseSuccessAction,
  SaveExpenseFailureAction,
  ClearSaveExpenseErrorAction,
  FetchExpensesByMonthSuccessAction,
  FetchExpensesByMonthFailureAction,
  ClearFetchExpensesByMonthErrorAction,
  FetchExpenseSuccessAction,
  FetchExpenseFailureAction,
  ClearFetchExpenseErrorAction,
} from './actions';

export function saveExpenseSuccess(expense: BudgeExpense): SaveExpenseSuccessAction {
  return {
    type: ActionType.SAVE_EXPENSE_SUCCESS,
    expense,
  };
}

export function saveExpenseFailure(expenseId: string, error: Error): SaveExpenseFailureAction {
  return {
    type: ActionType.SAVE_EXPENSE_FAILURE,
    expenseId,
    error,
  };
}

export function clearSaveExpenseError(expenseId: string): ClearSaveExpenseErrorAction {
  return {
    type: ActionType.CLEAR_SAVE_EXPENSE_ERROR,
    expenseId,
  };
}

export function fetchExpenseSuccess(expense: BudgeExpense): FetchExpenseSuccessAction {
  return {
    type: ActionType.FETCH_EXPENSE_SUCCESS,
    expense,
  };
}

export function fetchExpenseFailure(expenseId: string, error: Error): FetchExpenseFailureAction {
  return {
    type: ActionType.FETCH_EXPENSE_FAILURE,
    expenseId,
    error,
  };
}

export function clearFetchExpenseError(expenseId: string): ClearFetchExpenseErrorAction {
  return {
    type: ActionType.CLEAR_FETCH_EXPENSE_ERROR,
    expenseId,
  };
}

export function fetchExpensesByMonthSuccess(
  year: number,
  month: number,
  expenses: {
    [id: string]: BudgeExpense;
  },
): FetchExpensesByMonthSuccessAction {
  return {
    type: ActionType.FETCH_EXPENSES_BY_MONTH_SUCCESS,
    year,
    month,
    expenses,
  };
}

export function fetchExpensesByMonthFailure(
  year: number,
  month: number,
  error: Error,
): FetchExpensesByMonthFailureAction {
  return {
    type: ActionType.FETCH_EXPENSES_BY_MONTH_FAILURE,
    year,
    month,
    error,
  };
}

export function clearFetchExpensesByMonthError(
  year: number,
  month: number,
  id: string,
): ClearFetchExpensesByMonthErrorAction {
  return {
    type: ActionType.CLEAR_FETCH_EXPENSES_BY_MONTH_ERROR,
    year,
    month,
  };
}
