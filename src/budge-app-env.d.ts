import AvatarType from './enums/AvatarType';
import UploadState from './enums/UploadState';

interface BudgeState {
  user: BudgeUser | null;
  setUserError: Error | null;
  saveUserError: Error | null;
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

  persistedDisplayName: string | null;
  persistedAvatar: BudgeAvatar | null;
  persistedTheme: string | null;

  displayName: string | null;
  avatar: BudgeAvatar | null;
  theme: string | null;
}

interface BudgeUpload {
  downloadURL?: string;
  error?: Error;
  progress: number;
  state: UploadState;
}

interface UserDocument {
  displayName: string | null;
  avatar: BudgeAvatar | null;
  theme: string | null;
}
