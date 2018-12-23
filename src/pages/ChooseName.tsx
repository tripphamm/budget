import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Shell from '../components/Shell';
import BottomAction from '../components/BottomAction';

import { SetUserDisplayNameAction, SaveUserActionCreator } from '../state/actions';
import { setUserDisplayName } from '../state/actionCreators';
import { saveUser } from '../state/asyncActionCreators';
import { BudgeUser, BudgeState } from '../budge-app-env';
import { RouteComponentProps } from 'react-router';

type ChooseNameProps = RouteComponentProps & {
  user: BudgeUser | null;
  setUserDisplayName: (name: string) => SetUserDisplayNameAction;
  saveUser: SaveUserActionCreator;
};

class ChooseName extends React.Component<ChooseNameProps, {}> {
  render() {
    const { user, history, match, setUserDisplayName, saveUser } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render ChooseName component');
    }

    return (
      <Shell
        title="Choose a name"
        renderSideDrawer={false}
        bottomBarElement={
          <BottomAction
            label="Save"
            onClick={() =>
              saveUser(() => {
                if (!match.url.includes('/profile')) {
                  history.push('/profile');
                }
              })
            }
          />
        }
      >
        <div
          style={{
            height: '100%',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <TextField
            label="Name"
            value={user.displayName ? user.displayName : ''}
            onChange={event => setUserDisplayName(event.target.value)}
          />
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseName);
