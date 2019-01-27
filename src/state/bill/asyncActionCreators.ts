import { Dispatch } from 'redux';

import { firestore } from '../../services/firebaseService';
import { BudgeBill } from '../../budge-app-env';
import { toggleSaving, toggleLoading } from '../shared/actionCreators';
import {
  saveBillSuccess,
  saveBillFailure,
  fetchBillsSuccess,
  fetchBillsFailure,
  deleteBillSuccess,
  deleteBillFailure,
} from './actionCreators';
import { BudgeState } from '../rootState';

export function saveBill(bill: BudgeBill, onSaveComplete?: () => void) {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleSaving(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('`user` must be  non-null in order to save a bill');
      }

      await firestore
        .collection('users')
        .doc(user.id)
        .collection('bills')
        .doc(bill.id)
        .set(bill);

      if (typeof onSaveComplete === 'function') {
        onSaveComplete();
      }

      dispatch(saveBillSuccess(bill));
    } catch (error) {
      dispatch(saveBillFailure(bill.id, error));
    }

    dispatch(toggleSaving(false));
  };
}

export function deleteBill(billId: string, onDeleteComplete?: () => void) {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleSaving(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('`user` must be  non-null in order to delete a bill');
      }

      await firestore
        .collection('users')
        .doc(user.id)
        .collection('bills')
        .doc(billId)
        .delete();

      if (typeof onDeleteComplete === 'function') {
        onDeleteComplete();
      }

      dispatch(deleteBillSuccess(billId));
    } catch (error) {
      dispatch(deleteBillFailure(billId, error));
    }

    dispatch(toggleSaving(false));
  };
}

export function fetchBills() {
  return async (dispatch: Dispatch, getState: () => BudgeState) => {
    dispatch(toggleLoading(true));

    try {
      const stateSnapshot = getState();
      const { userState } = stateSnapshot;
      const { user } = userState;

      if (user === null) {
        throw new Error('`user` must be  non-null in order to fetch bills');
      }

      const billsSnapshot = await firestore
        .collection('users')
        .doc(user.id)
        .collection('bills')
        .get();

      const bills = billsSnapshot.docs
        .map(billDocument => billDocument.data())
        .reduce((acc, bill) => ({ ...acc, [bill.id]: bill }), {});

      dispatch(fetchBillsSuccess(bills));
    } catch (error) {
      dispatch(fetchBillsFailure(error));
    }

    dispatch(toggleLoading(false));
  };
}
