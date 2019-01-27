import { Dispatch } from 'redux';

import ActionType from './ActionType';
import { BudgeExpense } from '../../budge-app-env';
import { BudgeState } from '../rootState';

type AnyExpenseAction =
  | SaveExpenseSuccessAction
  | SaveExpenseFailureAction
  | ClearSaveExpenseErrorAction
  | DeleteExpenseSuccessAction
  | DeleteExpenseFailureAction
  | ClearDeleteExpenseErrorAction
  | FetchExpenseSuccessAction
  | FetchExpenseFailureAction
  | ClearFetchExpenseErrorAction
  | FetchExpensesByMonthSuccessAction
  | FetchExpensesByMonthFailureAction
  | ClearFetchExpensesByMonthErrorAction
  | SetMonthAction
  | SetYearAction;

interface SaveExpenseSuccessAction {
  type: ActionType.SAVE_EXPENSE_SUCCESS;
  expense: BudgeExpense;
}

interface SaveExpenseFailureAction {
  type: ActionType.SAVE_EXPENSE_FAILURE;
  expenseId: string;
  error: Error;
}

interface ClearSaveExpenseErrorAction {
  type: ActionType.CLEAR_SAVE_EXPENSE_ERROR;
  expenseId: string;
}

interface DeleteExpenseSuccessAction {
  type: ActionType.DELETE_EXPENSE_SUCCESS;
  expenseId: string;
}

interface DeleteExpenseFailureAction {
  type: ActionType.DELETE_EXPENSE_FAILURE;
  expenseId: string;
  error: Error;
}

interface ClearDeleteExpenseErrorAction {
  type: ActionType.CLEAR_DELETE_EXPENSE_ERROR;
  expenseId: string;
}

interface FetchExpenseSuccessAction {
  type: ActionType.FETCH_EXPENSE_SUCCESS;
  expense: BudgeExpense;
}

interface FetchExpenseFailureAction {
  type: ActionType.FETCH_EXPENSE_FAILURE;
  expenseId: string;
  error: Error;
}

interface ClearFetchExpenseErrorAction {
  type: ActionType.CLEAR_FETCH_EXPENSE_ERROR;
  expenseId: string;
}

interface FetchExpensesByMonthSuccessAction {
  type: ActionType.FETCH_EXPENSES_BY_MONTH_SUCCESS;
  year: number;
  month: number;
  expenses: { [id: string]: BudgeExpense };
}

interface FetchExpensesByMonthFailureAction {
  type: ActionType.FETCH_EXPENSES_BY_MONTH_FAILURE;
  year: number;
  month: number;
  error: Error;
}

interface ClearFetchExpensesByMonthErrorAction {
  type: ActionType.CLEAR_FETCH_EXPENSES_BY_MONTH_ERROR;
  year: number;
  month: number;
}

interface SetMonthAction {
  type: ActionType.SET_MONTH;
  month: number;
}

interface SetYearAction {
  type: ActionType.SET_YEAR;
  year: number;
}

// action creators

type SaveExpenseActionCreator = (
  expense: BudgeExpense,
  onSaveComplete?: () => void,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;

type DeleteExpenseActionCreator = (
  expenseId: string,
  onDeleteComplete?: () => void,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;

type FetchExpensesByMonthActionCreator = (
  year: number,
  month: number,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;

type FetchExpenseActionCreator = (
  expenseId: string,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;
