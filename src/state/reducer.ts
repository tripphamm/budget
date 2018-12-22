import ActionType from '../enums/ActionType';
import UploadState from '../enums/UploadState';
import initialState from '../state/initialState';
import { BudgeState, BudgeUser } from '../budge-app-env';
import { AnyAction } from './actions';

export default (state: BudgeState = initialState, action: AnyAction): BudgeState => {
  switch (action.type) {
    case ActionType.SET_USER_SUCCESS:
      return {
        ...state,
        user: action.user,
      };
    case ActionType.SET_USER_FAILURE:
      return {
        ...state,
        setUserError: action.error,
      };
    case ActionType.CLEAR_SET_USER_ERROR:
      return {
        ...state,
        setUserError: null,
      };
    case ActionType.TOGGLE_AUTHENTICATING:
      return {
        ...state,
        authenticating: action.authenticating,
      };
    case ActionType.TOGGLE_SIDE_DRAWER_OPEN:
      return {
        ...state,
        sideDrawerOpen: action.open === undefined ? !state.sideDrawerOpen : action.open,
      };
    case ActionType.START_UPLOAD:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.uploadId]: {
            progress: 0,
            state: UploadState.RUNNING,
          },
        },
      };
    case ActionType.PROGRESS_UPLOAD:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.uploadId]: {
            progress: action.progress,
            state: action.state,
          },
        },
      };
    case ActionType.COMPLETE_UPLOAD:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.uploadId]: {
            progress: 100,
            state: UploadState.COMPLETED,
          },
        },
      };
    case ActionType.FAIL_UPLOAD:
      return {
        ...state,
        uploads: {
          ...state.uploads,
          [action.uploadId]: {
            ...state.uploads[action.uploadId],
            state: UploadState.FAILED,
            error: action.error,
          },
        },
      };
    case ActionType.SET_USER_DISPLAY_NAME:
      return {
        ...state,
        user: {
          ...(state.user as BudgeUser), // tip typescript that state.user is guaranteed to be non-null
          displayName: action.displayName,
        },
      };
    case ActionType.SET_USER_AVATAR:
      return {
        ...state,
        user: {
          ...(state.user as BudgeUser), // tip typescript that state.user is guaranteed to be non-null
          avatar: action.avatar,
        },
      };
    default:
      return state;
  }
};
