import ActionType from './ActionType';
import { BudgeBill } from '../../budge-app-env';
import {
  SaveBillSuccessAction,
  SaveBillFailureAction,
  ClearSaveBillErrorAction,
  FetchBillsSuccessAction,
  FetchBillsFailureAction,
  ClearFetchBillsErrorAction,
} from './actions';

export function saveBillSuccess(bill: BudgeBill): SaveBillSuccessAction {
  return {
    type: ActionType.SAVE_BILL_SUCCESS,
    bill,
  };
}

export function saveBillFailure(id: string, error: Error): SaveBillFailureAction {
  return {
    type: ActionType.SAVE_BILL_FAILURE,
    id,
    error,
  };
}

export function clearSaveBillError(id: string): ClearSaveBillErrorAction {
  return {
    type: ActionType.CLEAR_SAVE_BILL_ERROR,
    id,
  };
}

export function fetchBillsSuccess(bills: { [id: string]: BudgeBill }): FetchBillsSuccessAction {
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

export function clearFetchBillsError(id: string): ClearFetchBillsErrorAction {
  return {
    type: ActionType.CLEAR_FETCH_BILLS_ERROR,
  };
}
