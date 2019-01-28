import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Div100vh from 'react-div-100vh';

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
      <Div100vh
        style={{
          position: 'relative',
          height: '100rvh',
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
            height: `calc(100% - ${appBarHeight + bottomNavHeight}px)`,
            overflow: 'auto',
            padding: 20,
          }}
        >
          {children}
        </div>
        {bottomBarElement}
      </Div100vh>
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
