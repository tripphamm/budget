import IconType from './enums/IconType';
import UploadState from './enums/UploadState';
import Cadence from './enums/Cadence';

interface BudgeState {
  user: BudgeUser | null;
  setUserError: Error | null;
  saveUserError: Error | null;
  authenticating: boolean;
  sideDrawerOpen: boolean;
  uploads: {
    [id: string]: BudgeUpload;
  };
  bills: {
    [id: string]: BudgeBill;
  };
  saveBillErrors: {
    [id: string]: Error | null;
  };
  expenses: {
    [id: string]: BudgeExpense;
  };
  saveExpenseErrors: {
    [id: string]: Error | null;
  };
}

interface BudgeIcon {
  type: IconType;
  value: string;
}

interface BudgeUser {
  id: string;

  persistedDisplayName: string | null;
  persistedAvatar: BudgeIcon | null;
  persistedTheme: string | null;

  displayName: string | null;
  avatar: BudgeIcon | null;
  theme: string | null;
}

interface BudgeUpload {
  downloadURL?: string;
  error?: Error;
  progress: number;
  state: UploadState;
}

interface BudgeBill {
  id: string;
  amount: number;
  cadence: Cadence;
  icon: BudgeIcon;
}

interface BudgeExpense {
  id: string;
  amount: number;
  timestamp: number; // ms since epoch
}

interface UserDocument {
  displayName: string | null;
  avatar: BudgeIcon | null;
  theme: string | null;
}
