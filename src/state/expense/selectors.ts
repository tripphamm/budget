import { createSelector } from 'reselect';
import { BudgeState } from '../rootState';
import { ExpensesMatrix } from './state';

const selectExpenses = (state: BudgeState) => state.expenseState.expenses;

export const selectExpensesByMonthMatrix = createSelector(
  selectExpenses,
  expenses => {
    return Object.keys(expenses).reduce((expensesMatrix: ExpensesMatrix, expenseId) => {
      const expense = expenses[expenseId];
      const { year, month } = expense;

      if (expensesMatrix![year] === undefined) {
        return {
          ...expensesMatrix,
          [year]: {
            [month]: {
              [expenseId]: expense,
            },
          },
        };
      }

      if (expensesMatrix![year][month] === undefined) {
        return {
          ...expensesMatrix,
          [year]: {
            ...expensesMatrix![year],
            [month]: {
              [expenseId]: expense,
            },
          },
        };
      }

      return {
        ...expensesMatrix,
        [year]: {
          ...expensesMatrix![year],
          [month]: {
            ...expensesMatrix![year][month],
            [expenseId]: expense,
          },
        },
      };
    }, {});
  },
);
