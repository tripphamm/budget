import { Dispatch } from 'redux';

import { firestore } from '../../services/firebaseService';
import { toggleSaving, toggleLoading } from '../shared/actionCreators';
import {
  saveExpenseSuccess,
  saveExpenseFailure,
  fetchExpenseSuccess,
  fetchExpenseFailure,
  fetchExpensesByMonthSuccess,
  fetchExpensesByMonthFailure,
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

export function fetchExpense(expenseId: string) {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleLoading(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('`user` must be  non-null in order to fetch an expense');
      }

      const expensesSnapshot = await firestore
        .collection('expenses')
        .doc(user.id)
        .collection('expenses')
        .where('id', '==', expenseId)
        .get();

      if (expensesSnapshot.docs.length === 0) {
        throw new Error(`No expense found with id: ${expenseId}`);
      }

      if (expensesSnapshot.docs.length > 1) {
        throw new Error(`Multiple expenses found with id: ${expenseId}`);
      }

      const expense = expensesSnapshot.docs[0].data() as BudgeExpense;

      dispatch(fetchExpenseSuccess(expense));
    } catch (error) {
      dispatch(fetchExpenseFailure(expenseId, error));
    }

    dispatch(toggleLoading(false));
  };
}

export function fetchExpensesByMonth(year: number, month: number) {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleLoading(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('`user` must be  non-null in order to fetch expenses');
      }

      // determine the month and year to use for the max timestamp
      let maxTimestampMonth = month + 1;
      let maxTimestampYear = year;

      // if month overflows to 12 (11 == December), set month to Jan and increment the year
      if (maxTimestampMonth === 12) {
        maxTimestampMonth = 0;
        maxTimestampYear = maxTimestampYear + 1;
      }

      const minTimestamp = new Date(year, month).getTime();
      const maxTimestamp = new Date(maxTimestampYear, maxTimestampMonth).getTime();

      const expensesSnapshot = await firestore
        .collection('expenses')
        .doc(user.id)
        .collection('expenses')
        .where('timestamp', '>=', minTimestamp)
        .where('timestamp', '<', maxTimestamp)
        .get();

      const expenses = expensesSnapshot.docs
        .map(expenseDocument => expenseDocument.data())
        .reduce((acc, expense) => ({ ...acc, [expense.id]: expense }), {}) as {
        [id: string]: BudgeExpense;
      };

      dispatch(fetchExpensesByMonthSuccess(year, month, expenses));
    } catch (error) {
      dispatch(fetchExpensesByMonthFailure(year, month, error));
    }

    dispatch(toggleLoading(false));
  };
}
