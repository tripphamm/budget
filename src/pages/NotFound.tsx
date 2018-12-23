import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';

import Shell from '../components/Shell';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';

interface NotFoundProps {
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
}

class NotFound extends React.Component<NotFoundProps, {}> {
  render() {
    return (
      <Shell
        title="Not Found"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          this.props.toggleSideDrawerOpen();
        }}
      >
        <div>Not found</div>
      </Shell>
    );
  }
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
  null,
  mapDispatchToProps,
)(NotFound);
