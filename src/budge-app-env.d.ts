import IconType from './enums/IconType';
import UploadStatus from './enums/UploadStatus';
import Cadence from './enums/Cadence';

interface BudgeIcon {
  type: IconType;
  value: string;
}

interface BudgeUser {
  id: string;

  persistedDisplayName: string | null;
  persistedAvatar: BudgeIcon | null;
  persistedTheme: string | null;
  persistedBudget: BudgeBudget | null;

  displayName: string | null;
  avatar: BudgeIcon | null;
  theme: string | null;
  budget: BudgeBudget | null;
}

interface BudgeUpload {
  downloadURL?: string;
  error?: Error;
  progress: number;
  status: UploadStatus;
}

interface BudgeBill {
  id: string;
  name: string;
  amount: number;
  cadence: Cadence;
  icon: BudgeIcon;
}

interface BudgeExpense {
  id: string;
  name: string;
  amount: number;
  timestamp: number; // ms since epoch
  icon: BudgeIcon;
}

interface BudgeBudget {
  amount: number;
}

interface UserDocument {
  displayName: string | null;
  avatar: BudgeIcon | null;
  theme: string | null;
  budget: BudgeBudget | null;
}
