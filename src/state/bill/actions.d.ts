import ActionType from './ActionType';
import { BudgeBill } from '../../budge-app-env';
import { Dispatch } from 'redux';
import { BudgeState } from '../rootState';

type AnyBillAction =
  | SaveBillSuccessAction
  | SaveBillFailureAction
  | ClearSaveBillErrorAction
  | FetchBillsSuccessAction
  | FetchBillsFailureAction
  | ClearFetchBillsErrorAction;

interface SaveBillSuccessAction {
  type: ActionType.SAVE_BILL_SUCCESS;
  bill: BudgeBill;
}

interface SaveBillFailureAction {
  type: ActionType.SAVE_BILL_FAILURE;
  id: string;
  error: Error;
}

interface ClearSaveBillErrorAction {
  type: ActionType.CLEAR_SAVE_BILL_ERROR;
  id: string;
}

interface FetchBillsSuccessAction {
  type: ActionType.FETCH_BILLS_SUCCESS;
  bills: {
    [id: string]: BudgeBill;
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

type FetchBillsActionCreator = () => (
  dispatch: Dispatch,
  getState: () => BudgeState,
) => Promise<void>;
