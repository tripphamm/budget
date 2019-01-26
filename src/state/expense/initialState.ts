import { ExpenseState } from './state';

const initialState: ExpenseState = {
  expenses: {},
  saveExpenseErrors: {},
  fetchExpenseErrors: {},
  fetchExpensesByMonthErrorMatrix: null,
  fetchedExpensesByMonthMatrix: null,
};

export default initialState;
