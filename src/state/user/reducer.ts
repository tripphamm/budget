import ActionType from './ActionType';
import { UserState } from './state';
import initialState from './initialState';
import { AnyUserAction } from './actions';
import { BudgeUser } from '../../budge-app-env';

export default (state: UserState = initialState, action: AnyUserAction): UserState => {
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
    case ActionType.SAVE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...(state.user as BudgeUser),
          persistedDisplayName: action.userDocument.displayName,
          persistedAvatar: action.userDocument.avatar,
          persistedTheme: action.userDocument.theme,
          persistedBudget: action.userDocument.budget,

          displayName: action.userDocument.displayName,
          avatar: action.userDocument.avatar,
          theme: action.userDocument.theme,
          budget: action.userDocument.budget,
        },
      };
    case ActionType.SAVE_USER_FAILURE:
      return {
        ...state,
        saveUserError: action.error,
      };
    case ActionType.CLEAR_SAVE_USER_ERROR:
      return {
        ...state,
        saveUserError: null,
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
    case ActionType.SET_USER_THEME:
      return {
        ...state,
        user: {
          ...(state.user as BudgeUser), // tip typescript that state.user is guaranteed to be non-null
          theme: action.theme,
        },
      };
    case ActionType.SET_USER_BUDGET:
      return {
        ...state,
        user: {
          ...(state.user as BudgeUser), // tip typescript that state.user is guaranteed to be non-null
          budget: action.budget,
        },
      };
    default:
      return state;
  }
};
