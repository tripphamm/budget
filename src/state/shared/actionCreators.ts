import ActionType from './ActionType';
import {
  ToggleSideDrawerOpenAction,
  ToggleAuthenticatingAction,
  ToggleSavingAction,
  ToggleLoadingAction,
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

export function toggleLoading(loading: boolean): ToggleLoadingAction {
  return {
    type: ActionType.TOGGLE_LOADING,
    loading,
  };
}
