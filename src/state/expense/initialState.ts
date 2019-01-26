import { ExpenseState } from './state';

const initialState: ExpenseState = {
  expenses: {},
  saveExpenseErrors: {},
  fetchExpensesError: null,
  fetchedExpenses: false,
};

export default initialState;
