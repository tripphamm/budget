import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import {
  Avatar as MUIAvatar,
  Theme,
  withTheme,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';

import { BudgeUser } from '../budge-app-env';
import Shell from '../components/Shell';
import Avatar from '../components/Avatar';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { BudgeState } from '../state/rootState';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';

type ProfileProps = RouteComponentProps & {
  theme: Theme;
  user: BudgeUser | null;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
};

class Profile extends React.Component<ProfileProps, {}> {
  render() {
    const { user, theme, history, toggleSideDrawerOpen } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render Profile component');
    }

    // assume that displayName is non-null
    const displayName: string = user.displayName as string;

    // todo: what if userName is an empty string
    return (
      <Shell
        title="Profile"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          toggleSideDrawerOpen();
        }}
      >
        <button
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          onClick={() => history.push('/chooseAvatar')}
        >
          <Avatar avatar={user.avatar} size={100} />
        </button>
        <List>
          <ListItem button onClick={() => history.push('/chooseName')}>
            <MUIAvatar style={{ backgroundColor: theme.palette.secondary.main }}>
              {displayName.slice(0, 1).toUpperCase()}
            </MUIAvatar>
            <ListItemText primary={displayName} />
          </ListItem>
          <ListItem button onClick={() => history.push('/chooseTheme')}>
            <MUIAvatar style={{ backgroundColor: theme.palette.primary.main }} />
            <ListItemText>Theme</ListItemText>
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

export default withTheme()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Profile),
);
