enum ActionType {
  SET_USER_SUCCESS,
  SET_USER_FAILURE,
  CLEAR_SET_USER_ERROR,

  TOGGLE_AUTHENTICATING,
  TOGGLE_LOADING,
  TOGGLE_SIDE_DRAWER_OPEN,
  TOGGLE_SAVING,

  START_UPLOAD,
  PROGRESS_UPLOAD,
  COMPLETE_UPLOAD,
  FAIL_UPLOAD,

  SET_USER_DISPLAY_NAME,
  SET_USER_AVATAR,

  // default action is never dispatched, but it forces us to add a default case to our reducers
  // this is important so that redux and middleware can dispatch their own actions and we'll handle it gracefully
  DEFAULT_ACTION,
}

export default ActionType;
