import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import BottomNav from './BottomNav';
import SideDrawer from './SideDrawer';
import { appBarHeight, bottomNavHeight } from '../settings/magicNumbers';

interface ShellProps {
  title?: string;
  iconElementLeft?: JSX.Element;
  onLeftIconButtonClick?: () => void;
  iconElementRight?: JSX.Element;
  onRightIconButtonClick?: () => void;
  bottomBarElement?: JSX.Element | null;
  renderSideDrawer?: boolean;
}

class Shell extends React.Component<ShellProps, {}> {
  render() {
    const {
      title = 'Budge',
      renderSideDrawer = true,
      iconElementLeft,
      onLeftIconButtonClick,
      iconElementRight,
      onRightIconButtonClick,
      bottomBarElement = <BottomNav />,
      children,
    } = this.props;

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
        {renderSideDrawer && <SideDrawer />}
        <div
          style={{
            boxSizing: 'border-box',
            // set the size of the viewport (between the app bar and bottom nav)
            height: `calc(100vh - ${appBarHeight + bottomNavHeight}px)`,
            overflow: 'auto',
            padding: 20,
          }}
        >
          {children}
        </div>
        {bottomBarElement}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators({}, dispatch);
}

export default connect(
  null,
  mapDispatchToProps,
)(Shell);
