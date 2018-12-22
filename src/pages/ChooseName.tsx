import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Shell from '../components/Shell';
import { SetUserDisplayNameAction } from '../state/actions';
import { setUserDisplayName } from '../state/actionCreators';
import { saveUser } from '../state/asyncActionCreators';
import { BudgeUser, BudgeState } from '../budge-app-env';
import { RouteComponentProps, withRouter } from 'react-router-dom';

type ChooseNameProps = RouteComponentProps & {
  user: BudgeUser | null;
  setUserDisplayName: (name: string) => SetUserDisplayNameAction;
  saveUser: () => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;
};

class ChooseName extends React.Component<ChooseNameProps, {}> {
  render() {
    const { user, setUserDisplayName, saveUser } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render ChooseName component');
    }

    return (
      <Shell title="Choose a name" bottomAction="Save" bottomActionOnClick={saveUser}>
        <TextField
          label="Name"
          value={user.displayName ? user.displayName : ''}
          onChange={event => setUserDisplayName(event.target.value)}
        />
      </Shell>
    );
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
      setUserDisplayName,
      saveUser,
    },
    dispatch,
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChooseName),
);
