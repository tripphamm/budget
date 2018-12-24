import { BudgeBill } from '../../budge-app-env';

interface BillState {
  bills: {
    [id: string]: BudgeBill;
  };
  saveBillErrors: {
    [id: string]: Error | null;
  };
  fetchBillsError: Error | null;
  fetchedBills: boolean;
}
