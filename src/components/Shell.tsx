import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import SideDrawer from './SideDrawer';
import { appBarHeight, bottomNavHeight } from '../settings/magicNumbers';
import { BudgeState, BudgeUser } from '../budge-app-env';

type ShellProps = RouteComponentProps & {
  user: BudgeUser | null;
  title?: string;
  iconElementLeft?: JSX.Element;
  onLeftIconButtonClick?: () => void;
  iconElementRight?: JSX.Element;
  onRightIconButtonClick?: () => void;
  bottomAction?: string;
  bottomActionOnClick?: () => void;
};

class Shell extends React.Component<ShellProps, {}> {
  render() {
    const {
      user,
      title = 'Budge',
      iconElementLeft,
      onLeftIconButtonClick,
      iconElementRight,
      onRightIconButtonClick,
      bottomAction,
      bottomActionOnClick,
      children,
      history,
      match,
    } = this.props;

    const { url } = match;

    let selectedBottomNavValue;
    if (url.includes('profile')) {
      selectedBottomNavValue = 'profile';
    } else if (url.includes('expenses')) {
      selectedBottomNavValue = 'expenses';
    } else if (url.includes('trends')) {
      selectedBottomNavValue = 'trends';
    } else {
      selectedBottomNavValue = 'expenses';
    }

    const bottomNavOnChange = (event: any, pageKey: string) => {
      switch (pageKey) {
        case 'profile':
          history.push('/profile');
          break;
        case 'expenses':
          history.push('/expenses');
          break;
        case 'trends':
          history.push('/trends');
          break;
        default:
          throw new Error(`Unrecognized navigation: ${pageKey}`);
      }
    };

    return (
      <div
        style={{
          position: 'relative',
          height: '100vh',
        }}
      >
        <AppBar position="static">
          <Toolbar>
            <IconButton color="inherit" onClick={onLeftIconButtonClick}>
              {iconElementLeft}
            </IconButton>
            {/* flexGrow is required to push the right IconButton to the right side */}
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              {title}
            </Typography>
            <IconButton color="inherit" onClick={onRightIconButtonClick}>
              {iconElementRight}
            </IconButton>
          </Toolbar>
        </AppBar>
        {user !== null && <SideDrawer />}
        <div
          style={{
            // set the size of the viewport (between the app bar and bottom nav)
            height: `calc(100vh - ${appBarHeight + bottomNavHeight}px)`,
            overflow: 'auto',
          }}
        >
          {children}
        </div>
        {/* Add an element that's the same size as the bottom nav so that content won't get blocked */}
        {bottomAction && (
          <Button
            fullWidth
            variant="contained"
            style={{ height: bottomNavHeight, backgroundColor: 'green', color: 'white' }}
            onClick={bottomActionOnClick}
          >
            {bottomAction}
          </Button>
        )}
        {!bottomAction && (
          <div>
            <div style={{ height: bottomNavHeight }} />
            <BottomNavigation
              value={selectedBottomNavValue}
              onChange={bottomNavOnChange}
              style={{
                width: '100vw',
                position: 'absolute',
                bottom: 0,
              }}
            >
              <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} />
              <BottomNavigationAction label="Expenses" value="expenses" icon={<ReceiptIcon />} />
              <BottomNavigationAction label="Trends" value="trends" icon={<AssessmentIcon />} />
            </BottomNavigation>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    user: state.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Shell),
);
