import ActionType from './ActionType';
import { BudgeBill } from '../../budge-app-env';
import {
  SaveBillSuccessAction,
  SaveBillFailureAction,
  ClearSaveBillErrorAction,
  FetchBillsSuccessAction,
  FetchBillsFailureAction,
  ClearFetchBillsErrorAction,
  DeleteBillSuccessAction,
  DeleteBillFailureAction,
  ClearDeleteBillErrorAction,
} from './actions';

export function saveBillSuccess(bill: BudgeBill): SaveBillSuccessAction {
  return {
    type: ActionType.SAVE_BILL_SUCCESS,
    bill,
  };
}

export function saveBillFailure(billId: string, error: Error): SaveBillFailureAction {
  return {
    type: ActionType.SAVE_BILL_FAILURE,
    billId,
    error,
  };
}

export function clearSaveBillError(billId: string): ClearSaveBillErrorAction {
  return {
    type: ActionType.CLEAR_SAVE_BILL_ERROR,
    billId,
  };
}

export function deleteBillSuccess(billId: string): DeleteBillSuccessAction {
  return {
    type: ActionType.DELETE_BILL_SUCCESS,
    billId,
  };
}

export function deleteBillFailure(billId: string, error: Error): DeleteBillFailureAction {
  return {
    type: ActionType.DELETE_BILL_FAILURE,
    billId,
    error,
  };
}

export function clearDeleteBillError(billId: string): ClearDeleteBillErrorAction {
  return {
    type: ActionType.CLEAR_DELETE_BILL_ERROR,
    billId,
  };
}

export function fetchBillsSuccess(bills: { [billId: string]: BudgeBill }): FetchBillsSuccessAction {
  return {
    type: ActionType.FETCH_BILLS_SUCCESS,
    bills,
  };
}

export function fetchBillsFailure(error: Error): FetchBillsFailureAction {
  return {
    type: ActionType.FETCH_BILLS_FAILURE,
    error,
  };
}

export function clearFetchBillsError(): ClearFetchBillsErrorAction {
  return {
    type: ActionType.CLEAR_FETCH_BILLS_ERROR,
  };
}
