import ActionType from './ActionType';
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
    case ActionType.SAVE_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...(state.user as BudgeUser),
          persistedDisplayName: action.userDocument.displayName,
          persistedAvatar: action.userDocument.avatar,
          persistedTheme: action.userDocument.theme,

          displayName: action.userDocument.displayName,
          avatar: action.userDocument.avatar,
          theme: action.userDocument.theme,
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
    case ActionType.SAVE_BILL_SUCCESS:
      return {
        ...state,
        bills: {
          ...state.bills,
          [action.bill.id as string]: action.bill,
        },
      };
    case ActionType.SAVE_BILL_FAILURE:
      return {
        ...state,
        saveBillErrors: {
          ...state.saveBillErrors,
          [action.id]: action.error,
        },
      };
    case ActionType.CLEAR_SAVE_BILL_ERROR:
      return {
        ...state,
        saveBillErrors: {
          ...state.saveBillErrors,
          [action.id]: null,
        },
      };
    case ActionType.SAVE_EXPENSE_SUCCESS:
      return {
        ...state,
        expenses: {
          ...state.expenses,
          [action.expense.id as string]: action.expense,
        },
      };
    case ActionType.SAVE_EXPENSE_FAILURE:
      return {
        ...state,
        saveExpenseErrors: {
          ...state.saveExpenseErrors,
          [action.id]: action.error,
        },
      };
    case ActionType.CLEAR_SAVE_EXPENSE_ERROR:
      return {
        ...state,
        saveExpenseErrors: {
          ...state.saveExpenseErrors,
          [action.id]: null,
        },
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
    case ActionType.SET_USER_THEME:
      return {
        ...state,
        user: {
          ...(state.user as BudgeUser), // tip typescript that state.user is guaranteed to be non-null
          theme: action.theme,
        },
      };
    default:
      return state;
  }
};
