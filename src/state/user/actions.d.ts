import ActionType from './ActionType';
import { BudgeUser, UserDocument, BudgeIcon } from '../../budge-app-env';
import { Dispatch } from 'redux';
import { BudgeState } from '../rootState';

type AnyUserAction =
  | SetUserSuccessAction
  | SetUserFailureAction
  | ClearSetUserErrorAction
  | SaveUserSuccessAction
  | SaveUserFailureAction
  | ClearSaveUserErrorAction
  | SetUserAvatarAction
  | SetUserDisplayNameAction
  | SetUserThemeAction;

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
  onSaveComplete?: () => void,
) => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;
