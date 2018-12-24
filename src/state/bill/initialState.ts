import { BillState } from './state';

const initialState: BillState = {
  bills: {},
  saveBillErrors: {},
  fetchBillsError: null,
  fetchedBills: false,
};

export default initialState;
