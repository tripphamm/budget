import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { FetchBillsActionCreator } from '../state/bill/actions';
import { fetchBills } from '../state/bill/asyncActionCreators';
import { BudgeBill } from '../budge-app-env';
import { BudgeState } from '../state/rootState';
import NotFound from './NotFound';
import BillEditor from '../components/BillEditor';

interface EditBillRouteParams {
  billId: string;
}

type EditBillProps = RouteComponentProps<EditBillRouteParams> & {
  fetchBills: FetchBillsActionCreator;
  fetchedBills: boolean;
  bills: { [id: string]: BudgeBill };
};

class EditBill extends React.Component<EditBillProps, {}> {
  componentDidMount() {
    const { fetchedBills, fetchBills } = this.props;

    if (!fetchedBills) {
      fetchBills();
    }
  }

  render() {
    const { bills, match, fetchedBills } = this.props;
    const { params } = match;
    const { billId } = params;

    const bill = bills[billId];

    if (!fetchedBills) {
      return <BillEditor loading={true} />;
    }

    if (!bill) {
      return <NotFound />;
    }

    return <BillEditor bill={bill} />;
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    bills: state.billState.bills,
    fetchBillsError: state.billState.fetchBillsError,
    fetchedBills: state.billState.fetchedBills,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      fetchBills,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditBill);
