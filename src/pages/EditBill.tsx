import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import MenuIcon from '@material-ui/icons/Menu';

import Shell from '../components/Shell';

import { toggleSideDrawerOpen } from '../state/actionCreators';
import { ToggleSideDrawerOpenAction } from '../state/actions';

interface EditBillProps {
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
}

class EditBill extends React.Component<EditBillProps, {}> {
  render() {
    return (
      <Shell
        title="New Bill"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          this.props.toggleSideDrawerOpen();
        }}
      >
        <div>Add Expense</div>
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
)(EditBill);
