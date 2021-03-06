import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Theme, withTheme } from '@material-ui/core';

import Shell from '../components/Shell';
import BottomAction from '../components/BottomAction';

import { BudgeUser } from '../budge-app-env';
import { themePaletteMap } from '../utils/themeUtil';
import { SetUserThemeAction, SaveUserActionCreator } from '../state/user/actions';
import { BudgeState } from '../state/rootState';
import { setUserTheme } from '../state/user/actionCreators';
import { saveUser } from '../state/user/asyncActionCreators';

type ChooseThemeProps = RouteComponentProps & {
  user: BudgeUser | null;
  theme: Theme;
  setUserTheme: (name: string) => SetUserThemeAction;
  saveUser: SaveUserActionCreator;
};

class ChooseTheme extends React.Component<ChooseThemeProps, {}> {
  render() {
    const { user, theme, history, match, setUserTheme, saveUser } = this.props;

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
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-evenly',
            }}
          >
            {Object.keys(themePaletteMap).map(colorKey => {
              const themePalette = themePaletteMap[colorKey];
              const selected = user.theme && user.theme === colorKey;

              return (
                <button
                  type="button"
                  onClick={() => setUserTheme(colorKey)}
                  key={`theme-option-${colorKey}`}
                  style={{
                    backgroundColor: themePalette.primary[500],
                    border: 'none',

                    height: 64,
                    width: 64,

                    borderRadius: 4,
                    boxShadow: selected ? `0 0 0 3px ${theme.palette.secondary.main}` : '',
                    padding: 2,
                    margin: 2,
                  }}
                />
              );
            })}
          </div>
        </div>
      </Shell>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    user: state.userState.user,
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

export default withTheme()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChooseTheme),
);
