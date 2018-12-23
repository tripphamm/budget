import ActionType from './ActionType';
import UploadStatus from '../../enums/UploadStatus';
import { BudgeIcon, BudgeUser, UserDocument, BudgeBill, BudgeExpense } from '../../budge-app-env';
import { Dispatch } from 'redux';

type AnyAction =
  | ToggleSideDrawerOpenAction
  | ToggleAuthenticatingAction
  | ToggleSavingAction
  | ToggleLoadingAction;

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

interface ToggleLoadingAction {
  type: ActionType.TOGGLE_LOADING;
  loading: boolean;
}
