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
    default:
      return state;
  }
};
