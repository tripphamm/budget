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
  deleteExpenseSuccess,
  deleteExpenseFailure,
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
        .collection('users')
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

export function deleteExpense(expenseId: string, onDeleteComplete?: () => void) {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleSaving(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('`user` must be  non-null in order to delete an expense');
      }

      await firestore
        .collection('users')
        .doc(user.id)
        .collection('expenses')
        .doc(expenseId)
        .delete();

      if (typeof onDeleteComplete === 'function') {
        onDeleteComplete();
      }

      dispatch(deleteExpenseSuccess(expenseId));
    } catch (error) {
      dispatch(deleteExpenseFailure(expenseId, error));
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
        .collection('users')
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

      const expensesSnapshot = await firestore
        .collection('users')
        .doc(user.id)
        .collection('expenses')
        .where('year', '==', year)
        .where('month', '==', month)
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
