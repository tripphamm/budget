import { BudgeBill } from '../../budge-app-env';

interface BillState {
  bills: {
    [billId: string]: BudgeBill;
  };
  saveBillErrors: {
    [billId: string]: Error | null;
  };
  deleteBillErrors: {
    [billId: string]: Error | null;
  };
  fetchBillsError: Error | null;
  fetchedBills: boolean;
}
