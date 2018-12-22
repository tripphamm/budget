import { BudgeState } from '../budge-app-env';

const initialState: BudgeState = {
  user: null,
  setUserError: null,
  saveUserError: null,
  authenticating: false,
  sideDrawerOpen: false,
  uploads: {},
};

export default initialState;
