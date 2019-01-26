import { BudgeExpense } from '../../budge-app-env';

interface ExpenseState {
  expenses: {
    [id: string]: BudgeExpense;
  };
  saveExpenseErrors: {
    [id: string]: Error | null;
  };
  fetchExpensesError: Error | null;
  fetchedExpenses: boolean;
}
