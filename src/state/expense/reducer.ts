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
          [action.id]: action.error,
        },
      };
    case ActionType.CLEAR_SAVE_EXPENSE_ERROR:
      return {
        ...state,
        saveExpenseErrors: {
          ...state.saveExpenseErrors,
          [action.id]: null,
        },
      };
    default:
      return state;
  }
};
