import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';

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
          <ListItem onClick={() => history.push('/profile')}>
            <Avatar avatar={user.avatar} />
            <ListItemText primary={user.displayName} />
          </ListItem>
          <MenuItem onClick={logOutUser}>Log Out</MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              history.push('/');
            }}
          >
            Home
          </MenuItem>
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
