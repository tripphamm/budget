import ActionType from '../enums/ActionType';
import UploadState from '../enums/UploadState';
import { BudgeAvatar, BudgeUser } from '../budge-app-env';

type AnyAction =
  | SetUserSuccessAction
  | ClearSetUserErrorAction
  | SetUserFailureAction
  | ToggleSideDrawerOpenAction
  | ToggleAuthenticatingAction
  | ToggleSavingAction
  | StartUploadAction
  | ProgressUploadAction
  | CompleteUploadAction
  | FailUploadAction
  | SetUserDisplayNameAction
  | SetUserAvatarAction;

interface ToggleSideDrawerOpenAction {
  type: ActionType.TOGGLE_SIDE_DRAWER_OPEN;
  open?: boolean;
}

interface ToggleAuthenticatingAction {
  type: ActionType.TOGGLE_AUTHENTICATING;
  authenticating: boolean;
}

interface ToggleSavingAction {
  type: ActionType.TOGGLE_SAVING;
  saving: boolean;
}

interface SetUserSuccessAction {
  type: ActionType.SET_USER_SUCCESS;
  user: BudgeUser | null;
}

interface SetUserFailureAction {
  type: ActionType.SET_USER_FAILURE;
  error: Error;
}

interface ClearSetUserErrorAction {
  type: ActionType.CLEAR_SET_USER_ERROR;
}

interface StartUploadAction {
  type: ActionType.START_UPLOAD;
  uploadId: string;
}

interface ProgressUploadAction {
  type: ActionType.PROGRESS_UPLOAD;
  uploadId: string;
  progress: number;
  state: UploadState;
}

interface CompleteUploadAction {
  type: ActionType.COMPLETE_UPLOAD;
  uploadId: string;
}

interface FailUploadAction {
  type: ActionType.FAIL_UPLOAD;
  uploadId: string;
  error: Error;
}

interface SetUserDisplayNameAction {
  type: ActionType.SET_USER_DISPLAY_NAME;
  displayName: string;
}

interface SetUserAvatarAction {
  type: ActionType.SET_USER_AVATAR;
  avatar: BudgeAvatar;
}
