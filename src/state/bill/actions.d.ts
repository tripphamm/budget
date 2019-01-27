import ActionType from './ActionType';
import { BudgeBill } from '../../budge-app-env';
import { Dispatch } from 'redux';
import { BudgeState } from '../rootState';

type AnyBillAction =
  | SaveBillSuccessAction
  | SaveBillFailureAction
  | ClearSaveBillErrorAction
  | DeleteBillSuccessAction
  | DeleteBillFailureAction
  | ClearDeleteBillErrorAction
  | FetchBillsSuccessAction
  | FetchBillsFailureAction
  | ClearFetchBillsErrorAction;

interface SaveBillSuccessAction {
  type: ActionType.SAVE_BILL_SUCCESS;
  bill: BudgeBill;
}

interface SaveBillFailureAction {
  type: ActionType.SAVE_BILL_FAILURE;
  billId: string;
  error: Error;
}

interface ClearSaveBillErrorAction {
  type: ActionType.CLEAR_SAVE_BILL_ERROR;
  billId: string;
}

interface DeleteBillSuccessAction {
  type: ActionType.DELETE_BILL_SUCCESS;
  billId: string;
}

interface DeleteBillFailureAction {
  type: ActionType.DELETE_BILL_FAILURE;
  billId: string;
  error: Error;
}

interface ClearDeleteBillErrorAction {
  type: ActionType.CLEAR_DELETE_BILL_ERROR;
  billId: string;
}

interface FetchBillsSuccessAction {
  type: ActionType.FETCH_BILLS_SUCCESS;
  bills: {
    [billId: string]: BudgeBill;
  };
}

interface FetchBillsFailureAction {
  type: ActionType.FETCH_BILLS_FAILURE;
  error: Error;
}

interface ClearFetchBillsErrorAction {
  type: ActionType.CLEAR_FETCH_BILLS_ERROR;
}

// action creators

type SaveBillActionCreator = (
  bill: BudgeBill,
  onSaveComplete?: () => void,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;

type DeleteBillActionCreator = (
  billId: string,
  onDeleteComplete?: () => void,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;

type FetchBillsActionCreator = () => (
  dispatch: Dispatch,
  getState: () => BudgeState,
) => Promise<void>;
