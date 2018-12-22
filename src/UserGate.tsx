import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { observeAuthState, unobserveAuthState } from './state/asyncActionCreators';

import SignIn from './pages/SignIn';
import ChooseName from './pages/ChooseName';
import ChooseAvatar from './pages/ChooseAvatar';
import ChooseTheme from './pages/ChooseTheme';
import { BudgeUser, BudgeState } from './budge-app-env';

interface UserGateProps {
  user: BudgeUser | null;
  children: JSX.Element;
  observeAuthState: () => (dispatch: Dispatch) => void;
  unobserveAuthState: () => () => void;
}

class UserGate extends React.Component<UserGateProps, {}> {
  componentDidMount() {
    this.props.observeAuthState();
  }

  componentWillUnmount() {
    this.props.unobserveAuthState();
  }

  render() {
    const { user, children } = this.props;

    if (!user) {
      return <SignIn />;
    }

    if (user.persistedDisplayName === null) {
      return <ChooseName />;
    }

    if (user.persistedAvatar === null) {
      return <ChooseAvatar />;
    }

    if (user.persistedTheme === null) {
      return <ChooseTheme />;
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
