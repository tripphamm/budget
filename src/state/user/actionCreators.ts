import ActionType from './ActionType';
import { BudgeUser, UserDocument, BudgeIcon, BudgeBudget } from '../../budge-app-env';
import {
  SetUserSuccessAction,
  SetUserFailureAction,
  ClearSetUserErrorAction,
  SaveUserSuccessAction,
  SaveUserFailureAction,
  ClearSaveUserErrorAction,
  SetUserDisplayNameAction,
  SetUserAvatarAction,
  SetUserThemeAction,
  SetUserBudgetAction,
} from './actions';

export function setUserSuccess(user: BudgeUser | null): SetUserSuccessAction {
  return {
    type: ActionType.SET_USER_SUCCESS,
    user,
  };
}

export function setUserFailure(error: Error): SetUserFailureAction {
  return {
    type: ActionType.SET_USER_FAILURE,
    error,
  };
}

export function clearSetUserError(): ClearSetUserErrorAction {
  return {
    type: ActionType.CLEAR_SET_USER_ERROR,
  };
}

export function saveUserSuccess(userDocument: UserDocument): SaveUserSuccessAction {
  return {
    type: ActionType.SAVE_USER_SUCCESS,
    userDocument,
  };
}

export function saveUserFailure(error: Error): SaveUserFailureAction {
  return {
    type: ActionType.SAVE_USER_FAILURE,
    error,
  };
}

export function clearSaveUserError(): ClearSaveUserErrorAction {
  return {
    type: ActionType.CLEAR_SAVE_USER_ERROR,
  };
}

export function setUserDisplayName(displayName: string): SetUserDisplayNameAction {
  return {
    type: ActionType.SET_USER_DISPLAY_NAME,
    displayName,
  };
}

export function setUserAvatar(avatar: BudgeIcon): SetUserAvatarAction {
  return {
    type: ActionType.SET_USER_AVATAR,
    avatar,
  };
}

export function setUserTheme(theme: string): SetUserThemeAction {
  return {
    type: ActionType.SET_USER_THEME,
    theme,
  };
}

export function setUserBudget(budget: BudgeBudget): SetUserBudgetAction {
  return {
    type: ActionType.SET_USER_BUDGET,
    budget,
  };
}
