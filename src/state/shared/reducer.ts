import ActionType from './ActionType';
import initialState from './initialState';
import { AnyAction } from './actions';

export default (state: SharedState = initialState, action: AnyAction): SharedState => {
  switch (action.type) {
    case ActionType.TOGGLE_AUTHENTICATING:
      return {
        ...state,
        authenticating: action.authenticating,
      };
    case ActionType.TOGGLE_SAVING:
      return {
        ...state,
        saving: action.saving,
      };
    case ActionType.TOGGLE_LOADING:
      return {
        ...state,
        loading: action.loading,
      };
    case ActionType.TOGGLE_SIDE_DRAWER_OPEN:
      return {
        ...state,
        sideDrawerOpen: action.open === undefined ? !state.sideDrawerOpen : action.open,
      };

    default:
      return state;
  }
};
