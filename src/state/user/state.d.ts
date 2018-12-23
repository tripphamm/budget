import { BudgeUser } from '../../budge-app-env';

interface UserState {
  user: BudgeUser | null;
  setUserError: Error | null;
  saveUserError: Error | null;
}
