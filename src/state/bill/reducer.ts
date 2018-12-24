import ActionType from './ActionType';
import { BillState } from './state';
import initialState from './initialState';
import { AnyBillAction } from './actions';

export default (state: BillState = initialState, action: AnyBillAction): BillState => {
  switch (action.type) {
    case ActionType.SAVE_BILL_SUCCESS:
      return {
        ...state,
        bills: {
          ...state.bills,
          [action.bill.id as string]: action.bill,
        },
      };
    case ActionType.SAVE_BILL_FAILURE:
      return {
        ...state,
        saveBillErrors: {
          ...state.saveBillErrors,
          [action.id]: action.error,
        },
      };
    case ActionType.CLEAR_SAVE_BILL_ERROR:
      return {
        ...state,
        saveBillErrors: {
          ...state.saveBillErrors,
          [action.id]: null,
        },
      };
    case ActionType.FETCH_BILLS_SUCCESS:
      return {
        ...state,
        bills: {
          ...state.bills,
          ...action.bills,
        },
        fetchedBills: true,
      };
    case ActionType.FETCH_BILLS_FAILURE:
      return {
        ...state,
        fetchBillsError: action.error,
      };
    case ActionType.CLEAR_FETCH_BILLS_ERROR:
      return {
        ...state,
        fetchBillsError: null,
      };
    default:
      return state;
  }
};
