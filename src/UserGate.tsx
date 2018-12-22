import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { observeAuthState, unobserveAuthState } from './state/asyncActions';

import SignIn from './pages/SignIn';
import Welcome from './pages/Welcome';
import { BudgeUser, BudgeState } from './budge-app-env';

interface UserGateProps {
  user: BudgeUser | null;
  children: JSX.Element;
  observeAuthState: () => (dispatch: Dispatch) => void;
  unobserveAuthState: () => () => void;
}

class UserGate extends React.Component<UserGateProps, {}> {
  componentDidMount() {
    observeAuthState();
  }

  componentWillUnmount() {
    unobserveAuthState();
  }

  render() {
    const { user, children } = this.props;

    if (!user) {
      return <SignIn />;
    }

    if (user.isNew) {
      return <Welcome />;
    }

    return children;
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      observeAuthState,
      unobserveAuthState,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserGate);
