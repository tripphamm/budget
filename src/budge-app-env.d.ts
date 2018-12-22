import AvatarType from './enums/AvatarType';
import UploadState from './enums/UploadState';

interface BudgeState {
  user: BudgeUser | null;
  setUserError: Error | null;
  authenticating: boolean;
  sideDrawerOpen: boolean;
  uploads: {
    [key: string]: BudgeUpload;
  };
}

interface BudgeAvatar {
  type: AvatarType;
  value: string;
}

interface BudgeUser {
  id: string;
  fbDisplayName: string;
  isNew: boolean;
  displayName: string | null;
  avatar: BudgeAvatar | null;
}

interface BudgeUpload {
  downloadURL?: string;
  error?: Error;
  progress: number;
  state: UploadState;
}
