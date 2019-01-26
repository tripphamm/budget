import { Dispatch } from 'redux';

import { firestore } from '../../services/firebaseService';
import { toggleSaving, toggleLoading } from '../shared/actionCreators';
import {
  saveExpenseSuccess,
  saveExpenseFailure,
  fetchExpensesSuccess,
  fetchExpensesFailure,
} from './actionCreators';
import { BudgeExpense } from '../../budge-app-env';
import { BudgeState } from '../rootState';

export function saveExpense(expense: BudgeExpense, onSaveComplete?: () => void) {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleSaving(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('`user` must be  non-null in order to save an expense');
      }

      await firestore
        .collection('expenses')
        .doc(user.id)
        .collection('expenses')
        .doc(expense.id)
        .set(expense);

      if (typeof onSaveComplete === 'function') {
        onSaveComplete();
      }

      dispatch(saveExpenseSuccess(expense));
    } catch (error) {
      dispatch(saveExpenseFailure(expense.id, error));
    }

    dispatch(toggleSaving(false));
  };
}

export function fetchExpenses() {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleLoading(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('`user` must be  non-null in order to fetch expenses');
      }

      const expensesSnapshot = await firestore
        .collection('expenses')
        .doc(user.id)
        .collection('expenses')
        .get();

      const expenses = expensesSnapshot.docs
        .map(expenseDocument => expenseDocument.data())
        .reduce((acc, expense) => ({ ...acc, [expense.id]: expense }), {});

      dispatch(fetchExpensesSuccess(expenses));
    } catch (error) {
      dispatch(fetchExpensesFailure(error));
    }

    dispatch(toggleLoading(false));
  };
}
