import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { History } from 'history';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';

import Shell from '../components/Shell';
import FloatingAddButton from '../components/floatingActionButtons/Add';
import FloatingActionButtonBuffer from '../components/floatingActionButtons/FloatingActionButtonBuffer';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';

interface ExpensesProps {
  history: History;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
}

class Expenses extends React.Component<ExpensesProps, {}> {
  render() {
    return (
      <Shell
        title="Expenses"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          this.props.toggleSideDrawerOpen();
        }}
        iconElementRight={<SearchIcon />}
        onRightIconButtonClick={() => {
          this.props.history.push('/search');
        }}
      >
        <div>Expenses</div>
        <FloatingActionButtonBuffer />
        <FloatingAddButton
          onClick={() => {
            this.props.history.push('/newExpense');
          }}
        />
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
)(Expenses);
