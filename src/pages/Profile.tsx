import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';
import { default as MUIAvatar } from '@material-ui/core/Avatar';
import TodayIcon from '@material-ui/icons/Today';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { RouteComponentProps } from 'react-router-dom';

import { BudgeUser } from '../budge-app-env';
import Shell from '../components/Shell';
import Avatar from '../components/Avatar';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { BudgeState } from '../state/rootState';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';

type ProfileProps = RouteComponentProps & {
  user: BudgeUser | null;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
};

class Profile extends React.Component<ProfileProps, {}> {
  render() {
    const { user, history, toggleSideDrawerOpen } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render Profile component');
    }

    const monthlyBillAmount = null;

    return (
      <Shell
        title="Profile"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          toggleSideDrawerOpen();
        }}
      >
        <List>
          <ListItem onClick={() => history.push('/editProfile')}>
            <Avatar avatar={user.avatar} />
            <ListItemText primary={user.displayName} />
          </ListItem>
          <Divider />
          <ListItem onClick={() => history.push('/bills')}>
            <MUIAvatar color="secondary">
              <TodayIcon />
            </MUIAvatar>
            <ListItemText
              primary={
                monthlyBillAmount !== null ? `$${monthlyBillAmount}/month` : 'Add recurring bills'
              }
            />
          </ListItem>
        </List>
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
      toggleSideDrawerOpen,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile);
