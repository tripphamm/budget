import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import { Typography, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import Shell from '../components/Shell';
import FloatingAddButton from '../components/floatingActionButtons/Add';
import FloatingActionButtonBuffer from '../components/floatingActionButtons/FloatingActionButtonBuffer';

import { BudgeBill } from '../budge-app-env';
import { floatingActionButtonBufferHeight } from '../settings/magicNumbers';
import { BudgeState } from '../state/rootState';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';
import { fetchBills } from '../state/bill/asyncActionCreators';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { FetchBillsActionCreator } from '../state/bill/actions';
import Avatar from '../components/Avatar';
import Cadence from '../enums/Cadence';
import Loading from '../components/Loading';

const cadenceToPer = {
  [Cadence.DAILY]: 'per day',
  [Cadence.WEEKLY]: 'per week',
  [Cadence.BI_WEEKLY]: 'every 2 weeks',
  [Cadence.MONTHLY]: 'per month',
  [Cadence.ANUALLY]: 'per year',
};

type BillsProps = RouteComponentProps & {
  bills: { [id: string]: BudgeBill };
  saveBillErrors: { [id: string]: Error | null };
  fetchBillsError: Error | null;
  fetchBills: FetchBillsActionCreator;
  fetchedBills: boolean;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
};

class Bills extends React.Component<BillsProps, {}> {
  componentDidMount() {
    if (!this.props.fetchedBills) {
      this.props.fetchBills();
    }
  }

  render() {
    const { history, bills, fetchedBills, fetchBillsError } = this.props;

    const billIds = Object.keys(bills);

    return (
      <Shell
        title="Bills"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          this.props.toggleSideDrawerOpen();
        }}
      >
        {!fetchedBills && <Loading message="Loading bills..." />}
        {fetchedBills && billIds.length === 0 && (
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
        {fetchedBills && billIds.length > 0 && (
          <List>
            {billIds.map(id => {
              const bill = bills[id];

              return (
                <ListItem button key={bill.id} onClick={() => history.push(`/bills/${bill.id}`)}>
                  <ListItemIcon>
                    <Avatar avatar={bill.icon} />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={bill.name}
                    secondary={`$${bill.amount.toFixed(2)} ${cadenceToPer[bill.cadence]}`}
                  />
                </ListItem>
              );
            })}
          </List>
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
    fetchBillsError: state.billState.fetchBillsError,
    fetchedBills: state.billState.fetchedBills,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      toggleSideDrawerOpen,
      fetchBills,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Bills);
