import ActionType from './ActionType';
import UploadState from '../enums/UploadState';
import { BudgeAvatar, BudgeUser, UserDocument } from '../budge-app-env';
import {
  ToggleSideDrawerOpenAction,
  ToggleAuthenticatingAction,
  ToggleSavingAction,
  SetUserSuccessAction,
  SetUserFailureAction,
  ClearSetUserErrorAction,
  StartUploadAction,
  ProgressUploadAction,
  CompleteUploadAction,
  FailUploadAction,
  SetUserDisplayNameAction,
  SetUserAvatarAction,
  SaveUserSuccessAction,
  SaveUserFailureAction,
  ClearSaveUserErrorAction,
  SetUserThemeAction,
} from './actions';

export function toggleSideDrawerOpen(open?: boolean): ToggleSideDrawerOpenAction {
  return {
    type: ActionType.TOGGLE_SIDE_DRAWER_OPEN,
    open,
  };
}

export function toggleAuthenticating(authenticating: boolean): ToggleAuthenticatingAction {
  return {
    type: ActionType.TOGGLE_AUTHENTICATING,
    authenticating,
  };
}

export function toggleSaving(saving: boolean): ToggleSavingAction {
  return {
    type: ActionType.TOGGLE_SAVING,
    saving,
  };
}

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

export function startUpload(uploadId: string): StartUploadAction {
  return {
    type: ActionType.START_UPLOAD,
    uploadId,
  };
}

export function progressUpload(
  uploadId: string,
  state: UploadState,
  progress: number,
): ProgressUploadAction {
  return {
    type: ActionType.PROGRESS_UPLOAD,
    uploadId,
    progress,
    state,
  };
}

export function completeUpload(uploadId: string): CompleteUploadAction {
  return {
    type: ActionType.COMPLETE_UPLOAD,
    uploadId,
  };
}

export function failUpload(uploadId: string, error: Error): FailUploadAction {
  return {
    type: ActionType.FAIL_UPLOAD,
    uploadId,
    error,
  };
}

export function setUserDisplayName(displayName: string): SetUserDisplayNameAction {
  return {
    type: ActionType.SET_USER_DISPLAY_NAME,
    displayName,
  };
}

export function setUserAvatar(avatar: BudgeAvatar): SetUserAvatarAction {
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
