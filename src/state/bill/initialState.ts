import { BillState } from './state';

const initialState: BillState = {
  bills: {},
  saveBillErrors: {},
  deleteBillErrors: {},
  fetchBillsError: null,
  fetchedBills: false,
};

export default initialState;
