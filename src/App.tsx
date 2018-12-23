import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Routes from './Routes';
import { getThemePaletteByName, defaultThemePalette } from './utils/themeUtil';
import { BudgeState } from './state/rootState';
import { observeAuthState, unobserveAuthState } from './state/user/asyncActionCreators';

interface AppProps {
  themeName: string | null;
  observeAuthState: () => (dispatch: Dispatch) => void;
  unobserveAuthState: () => () => void;
}

class App extends React.Component<AppProps> {
  componentDidMount() {
    this.props.observeAuthState();
  }

  componentWillUnmount() {
    this.props.unobserveAuthState();
  }

  render() {
    const { themeName } = this.props;

    const palette = getThemePaletteByName(themeName) || defaultThemePalette;

    const theme = createMuiTheme({
      palette,
      typography: {
        useNextVariants: true,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    themeName: state.userState.user !== null ? state.userState.user.theme : null,
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
)(App);
