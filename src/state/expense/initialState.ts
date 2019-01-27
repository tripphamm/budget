import { ExpenseState } from './state';

const today = new Date();
const initialState: ExpenseState = {
  expenses: {},
  saveExpenseErrors: {},
  deleteExpenseErrors: {},
  fetchExpenseErrors: {},
  fetchExpensesByMonthErrorMatrix: null,
  fetchedExpensesByMonthMatrix: null,
  month: today.getMonth(),
  year: today.getFullYear(),
};

export default initialState;
