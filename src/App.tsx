import * as React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Routes from './Routes';
import UserGate from './UserGate';
import { BudgeState } from './budge-app-env';

const defaultThemeColor = '#98ff98';

interface AppProps {
  themeColor: string | null;
}

class App extends React.Component<AppProps> {
  render() {
    const { themeColor } = this.props;

    const theme = createMuiTheme({
      palette: {
        primary: {
          main: themeColor !== null ? themeColor : defaultThemeColor,
        },
      },
      typography: {
        useNextVariants: true,
      },
    });

    return (
      <MuiThemeProvider theme={theme}>
        <UserGate>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </UserGate>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    themeColor: state.user !== null ? state.user.theme : null,
  };
}
export default connect(
  mapStateToProps,
  null,
)(App);
