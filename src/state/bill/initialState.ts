import { BillState } from './state';

const initialState: BillState = {
  bills: {},
  saveBillErrors: {},
  fetchBillsError: null,
};

export default initialState;
