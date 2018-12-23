enum ActionType {
  SET_USER_SUCCESS = 'SET_USER_SUCCESS',
  SET_USER_FAILURE = 'SET_USER_FAILURE',
  CLEAR_SET_USER_ERROR = 'CLEAR_SET_USER_ERROR',

  SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS',
  SAVE_USER_FAILURE = 'SAVE_USER_FAILURE',
  CLEAR_SAVE_USER_ERROR = 'CLEAR_SAVE_USER_ERROR',

  SAVE_BILL_SUCCESS = 'SAVE_BILL_SUCCESS',
  SAVE_BILL_FAILURE = 'SAVE_BILL_FAILURE',
  CLEAR_SAVE_BILL_ERROR = 'CLEAR_SAVE_BILL_ERROR',

  SAVE_EXPENSE_SUCCESS = 'SAVE_EXPENSE_SUCCESS',
  SAVE_EXPENSE_FAILURE = 'SAVE_EXPENSE_FAILURE',
  CLEAR_SAVE_EXPENSE_ERROR = 'CLEAR_SAVE_EXPENSE_ERROR',

  TOGGLE_AUTHENTICATING = 'TOGGLE_AUTHENTICATING',
  TOGGLE_LOADING = 'TOGGLE_LOADING',
  TOGGLE_SIDE_DRAWER_OPEN = 'TOGGLE_SIDE_DRAWER_OPEN',
  TOGGLE_SAVING = 'TOGGLE_SAVING',

  START_UPLOAD = 'START_UPLOAD',
  PROGRESS_UPLOAD = 'PROGRESS_UPLOAD',
  COMPLETE_UPLOAD = 'COMPLETE_UPLOAD',
  FAIL_UPLOAD = 'FAIL_UPLOAD',

  SET_USER_DISPLAY_NAME = 'SET_USER_DISPLAY_NAME',
  SET_USER_AVATAR = 'SET_USER_AVATAR',
  SET_USER_THEME = 'SET_USER_THEME',

  // default action is never dispatched = '', but it forces us to add a default case to our reducers
  // this is important so that redux and middleware can dispatch their own actions and we'll handle it gracefully
  DEFAULT_ACTION = 'DEFAULT_ACTION',
}

export default ActionType;
