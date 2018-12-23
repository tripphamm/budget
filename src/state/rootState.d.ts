import { ExpenseState } from './expense/state';
import { BillState } from './bill/state';
import { UploadState } from './upload/state';
import { UserState } from './user/state';

interface BudgeState {
  billState: BillState;
  expenseState: ExpenseState;
  sharedState: SharedState;
  uploadState: UploadState;
  userState: UserState;
}
