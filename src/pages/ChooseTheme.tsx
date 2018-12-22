import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Shell from '../components/Shell';
import BottomAction from '../components/BottomAction';

import { SetUserThemeAction } from '../state/actions';
import { setUserTheme } from '../state/actionCreators';
import { saveUser } from '../state/asyncActionCreators';
import { BudgeUser, BudgeState } from '../budge-app-env';

interface ChooseThemeProps {
  user: BudgeUser | null;
  setUserTheme: (name: string) => SetUserThemeAction;
  saveUser: () => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;
}

const colors = ['red', 'blue', 'green', 'black'];

class ChooseTheme extends React.Component<ChooseThemeProps, {}> {
  render() {
    const { user, setUserTheme, saveUser } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render ChooseTheme component');
    }

    return (
      <Shell
        title="Choose a theme color"
        renderSideDrawer={false}
        bottomBarElement={
          <BottomAction
            label="Save"
            labelColor="white"
            backgroundColor="green"
            onClick={saveUser}
          />
        }
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {colors.map(color => {
            const selected = user.theme && user.theme === color;

            return (
              <button
                type="button"
                onClick={() => setUserTheme(color)}
                key={`theme-option-${color}`}
                style={{
                  backgroundColor: color,
                  border: 'none',

                  height: 64,
                  width: 64,

                  borderRadius: 4,
                  boxShadow: selected ? '0 0 0 3px blue' : '',
                  padding: 2,
                  margin: 2,
                }}
              />
            );
          })}
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
      setUserTheme,
      saveUser,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseTheme);
