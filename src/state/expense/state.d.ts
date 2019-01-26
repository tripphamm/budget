import { BudgeExpense } from '../../budge-app-env';

type ExpensesMatrix = null | {
  [year: number]: {
    [month: number]: {
      [id: string]: BudgeExpense;
    };
  };
};

type FetchExpensesByMonthErrorMatrix = null | { [year: number]: { [month: number]: null | Error } };

type FetchedExpensesByMonthMatrix = null | { [year: number]: { [month: number]: boolean } };

interface ExpenseState {
  expenses: { [expenseId: string]: BudgeExpense };
  saveExpenseErrors: {
    [expenseId: string]: Error | null;
  };
  fetchExpenseErrors: { [expenseId: string]: null | Error };
  fetchExpensesByMonthErrorMatrix: FetchExpensesByMonthErrorMatrix;
  fetchedExpensesByMonthMatrix: FetchedExpensesByMonthMatrix;
}
