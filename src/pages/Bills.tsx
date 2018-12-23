import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography, MenuList, MenuItem } from '@material-ui/core';

import Shell from '../components/Shell';
import FloatingAddButton from '../components/floatingActionButtons/Add';
import FloatingActionButtonBuffer from '../components/floatingActionButtons/FloatingActionButtonBuffer';

import { BudgeBill } from '../budge-app-env';
import { floatingActionButtonBufferHeight } from '../settings/magicNumbers';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { BudgeState } from '../state/rootState';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';

type BillsProps = RouteComponentProps & {
  bills: { [id: string]: BudgeBill };
  saveBillErrors: { [id: string]: Error | null };
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
};

class Bills extends React.Component<BillsProps, {}> {
  componentDidMount() {}

  render() {
    const { bills, saveBillErrors } = this.props;

    const billIds = Object.keys(bills);

    return (
      <Shell
        title="Bills"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          this.props.toggleSideDrawerOpen();
        }}
      >
        {billIds.length === 0 && (
          <div
            style={{
              height: `calc(100% - ${floatingActionButtonBufferHeight}px`,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography>Nothing here yet</Typography>
          </div>
        )}
        {billIds.length > 0 && (
          <MenuList>
            {billIds.map(id => {
              const bill = bills[id];

              return <MenuItem>{bill.name}</MenuItem>;
            })}
          </MenuList>
        )}
        <FloatingActionButtonBuffer />
        <FloatingAddButton
          onClick={() => {
            this.props.history.push('/newBill');
          }}
        />
      </Shell>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    bills: state.billState.bills,
    saveBillErrors: state.billState.saveBillErrors,
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
)(Bills);
