import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {
  Divider,
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
  ListItemIcon,
} from '@material-ui/core';
import { Home as HomeIcon, ExitToApp as LogOutIcon } from '@material-ui/icons';

import Avatar from './Avatar';
import { BudgeUser } from '../budge-app-env';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { BudgeState } from '../state/rootState';
import { logOutUser } from '../state/user/asyncActionCreators';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';

type SideDrawerProps = RouteComponentProps & {
  user: BudgeUser | null;
  sideDrawerOpen: boolean;
  logOutUser: () => (dispatch: Dispatch) => void;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
};

class SideDrawer extends React.Component<SideDrawerProps, {}> {
  render() {
    const { user, sideDrawerOpen, history, logOutUser, toggleSideDrawerOpen } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render SideDrawer component');
    }

    const openDrawer = () => toggleSideDrawerOpen(true);
    const closeDrawer = () => toggleSideDrawerOpen(false);

    return (
      <SwipeableDrawer open={sideDrawerOpen} onClose={closeDrawer} onOpen={openDrawer}>
        <div tabIndex={0} role="button" onClick={closeDrawer} onKeyDown={closeDrawer}>
          <List>
            <ListItem button onClick={() => history.push('/profile')}>
              <Avatar avatar={user.avatar} size={40} />
              <ListItemText primary={user.displayName} />
            </ListItem>
            <ListItem button onClick={logOutUser}>
              <ListItemIcon>
                <LogOutIcon />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </ListItem>
            <Divider />
            <ListItem
              button
              onClick={() => {
                history.push('/');
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    user: state.userState.user,
    sideDrawerOpen: state.sharedState.sideDrawerOpen,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      logOutUser,
      toggleSideDrawerOpen,
    },
    dispatch,
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(SideDrawer),
);
