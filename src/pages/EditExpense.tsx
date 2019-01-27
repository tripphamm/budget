import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { FetchExpenseActionCreator } from '../state/expense/actions';
import { fetchExpense } from '../state/expense/asyncActionCreators';
import { BudgeExpense } from '../budge-app-env';
import { BudgeState } from '../state/rootState';
import NotFound from './NotFound';
import ExpenseEditor from '../components/ExpenseEditor';

interface EditExpenseRouteParams {
  expenseId: string;
}

type EditExpenseProps = RouteComponentProps<EditExpenseRouteParams> & {
  fetchExpense: FetchExpenseActionCreator;
  fetchExpenseErrors: { [expenseId: string]: null | Error };
  expenses: { [expenseId: string]: BudgeExpense };
};

class EditExpense extends React.Component<EditExpenseProps, {}> {
  componentDidMount() {
    const { expenses, fetchExpense, match } = this.props;
    const { params } = match;
    const { expenseId } = params;

    if (!expenses[expenseId]) {
      fetchExpense(expenseId);
    }
  }

  render() {
    const { expenses, fetchExpenseErrors, match } = this.props;
    const { params } = match;
    const { expenseId } = params;

    const error = fetchExpenseErrors[expenseId];
    const expense = expenses[expenseId];

    // todo: handle different types of errors in different ways
    if (error) {
      return <NotFound />;
    }

    if (!expense) {
      return <ExpenseEditor loading={true} />;
    }

    return <ExpenseEditor expense={expense} />;
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    expenses: state.expenseState.expenses,
    fetchExpenseErrors: state.expenseState.fetchExpenseErrors,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      fetchExpense,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditExpense);
