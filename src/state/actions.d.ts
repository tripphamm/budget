import ActionType from './ActionType';
import UploadState from '../enums/UploadState';
import {
  BudgeIcon,
  BudgeUser,
  UserDocument,
  BudgeState,
  BudgeBill,
  BudgeExpense,
} from '../budge-app-env';
import { Dispatch } from 'redux';

type AnyAction =
  | SetUserSuccessAction
  | SetUserFailureAction
  | ClearSetUserErrorAction
  | SaveUserSuccessAction
  | SaveUserFailureAction
  | ClearSaveUserErrorAction
  | SaveBillSuccessAction
  | SaveBillFailureAction
  | ClearSaveBillErrorAction
  | SaveExpenseSuccessAction
  | SaveExpenseFailureAction
  | ClearSaveExpenseErrorAction
  | ToggleSideDrawerOpenAction
  | ToggleAuthenticatingAction
  | ToggleSavingAction
  | StartUploadAction
  | ProgressUploadAction
  | CompleteUploadAction
  | FailUploadAction
  | SetUserDisplayNameAction
  | SetUserAvatarAction
  | SetUserThemeAction;

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

interface SaveUserSuccessAction {
  type: ActionType.SAVE_USER_SUCCESS;
  userDocument: UserDocument;
}

interface SaveUserFailureAction {
  type: ActionType.SAVE_USER_FAILURE;
  error: Error;
}

interface ClearSaveUserErrorAction {
  type: ActionType.CLEAR_SAVE_USER_ERROR;
}

interface SaveBillSuccessAction {
  type: ActionType.SAVE_BILL_SUCCESS;
  bill: BudgeBill;
}

interface SaveBillFailureAction {
  type: ActionType.SAVE_BILL_FAILURE;
  id: string;
  error: Error;
}

interface ClearSaveBillErrorAction {
  type: ActionType.CLEAR_SAVE_BILL_ERROR;
  id: string;
}

interface SaveExpenseSuccessAction {
  type: ActionType.SAVE_EXPENSE_SUCCESS;
  expense: BudgeExpense;
}

interface SaveExpenseFailureAction {
  type: ActionType.SAVE_EXPENSE_FAILURE;
  id: string;
  error: Error;
}

interface ClearSaveExpenseErrorAction {
  type: ActionType.CLEAR_SAVE_EXPENSE_ERROR;
  id: string;
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
  avatar: BudgeIcon;
}

interface SetUserThemeAction {
  type: ActionType.SET_USER_THEME;
  theme: string;
}

// action creators

type SaveUserActionCreator = (
  onSaveComplete: () => void,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;
