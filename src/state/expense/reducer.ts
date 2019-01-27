import ActionType from './ActionType';
import { ExpenseState } from './state';
import initialState from './initialState';
import { AnyExpenseAction } from './actions';

export default (state: ExpenseState = initialState, action: AnyExpenseAction): ExpenseState => {
  switch (action.type) {
    case ActionType.SAVE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: {
          ...state.expenses,
          [action.expense.id as string]: action.expense,
        },
      };
    case ActionType.SAVE_EXPENSE_FAILURE:
      return {
        ...state,
        saveExpenseErrors: {
          ...state.saveExpenseErrors,
          [action.expenseId]: action.error,
        },
      };
    case ActionType.CLEAR_SAVE_EXPENSE_ERROR:
      return {
        ...state,
        saveExpenseErrors: {
          ...state.saveExpenseErrors,
          [action.expenseId]: null,
        },
      };
    case ActionType.DELETE_EXPENSE_SUCCESS:
      const { [action.expenseId]: removedExpense, ...remainingExpenses } = state.expenses;

      return {
        ...state,
        expenses: remainingExpenses,
      };
    case ActionType.DELETE_EXPENSE_FAILURE:
      return {
        ...state,
        deleteExpenseErrors: {
          ...state.deleteExpenseErrors,
          [action.expenseId]: action.error,
        },
      };
    case ActionType.CLEAR_DELETE_EXPENSE_ERROR:
      return {
        ...state,
        deleteExpenseErrors: {
          ...state.deleteExpenseErrors,
          [action.expenseId]: null,
        },
      };
    case ActionType.FETCH_EXPENSES_BY_MONTH_SUCCESS:
      return {
        ...state,
        expenses: {
          ...state.expenses,
          ...action.expenses,
        },
        fetchedExpensesByMonthMatrix: {
          [action.year]: {
            [action.month]: true,
          },
        },
      };
    case ActionType.FETCH_EXPENSES_BY_MONTH_FAILURE:
      return {
        ...state,
        fetchExpensesByMonthErrorMatrix: {
          [action.year]: {
            [action.month]: action.error,
          },
        },
      };
    case ActionType.CLEAR_FETCH_EXPENSES_BY_MONTH_ERROR:
      return {
        ...state,
        fetchExpensesByMonthErrorMatrix: {
          [action.year]: {
            [action.month]: null,
          },
        },
      };
    case ActionType.FETCH_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: {
          ...state.expenses,
          [action.expense.id as string]: action.expense,
        },
      };
    case ActionType.FETCH_EXPENSE_FAILURE:
      return {
        ...state,
        fetchExpenseErrors: {
          [action.expenseId]: action.error,
        },
      };
    case ActionType.CLEAR_FETCH_EXPENSE_ERROR:
      return {
        ...state,
        fetchExpenseErrors: {
          ...state.fetchExpenseErrors,
          [action.expenseId]: null,
        },
      };
    case ActionType.SET_MONTH:
      return {
        ...state,
        month: action.month,
      };
    case ActionType.SET_YEAR:
      return {
        ...state,
        year: action.year,
      };
    default:
      return state;
  }
};
