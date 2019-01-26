import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import { FetchExpensesActionCreator } from '../state/expense/actions';
import { fetchExpenses } from '../state/expense/asyncActionCreators';
import { BudgeExpense } from '../budge-app-env';
import { BudgeState } from '../state/rootState';
import NotFound from './NotFound';
import ExpenseEditor from '../components/ExpenseEditor';

interface EditExpenseRouteParams {
  expenseId: string;
}

type EditExpenseProps = RouteComponentProps<EditExpenseRouteParams> & {
  fetchExpenses: FetchExpensesActionCreator;
  fetchedExpenses: boolean;
  expenses: { [id: string]: BudgeExpense };
};

class EditExpense extends React.Component<EditExpenseProps, {}> {
  componentDidMount() {
    const { fetchedExpenses, fetchExpenses } = this.props;

    if (!fetchedExpenses) {
      fetchExpenses();
    }
  }

  render() {
    const { expenses, match, fetchedExpenses } = this.props;
    const { params } = match;
    const { expenseId } = params;

    const expense = expenses[expenseId];

    if (!fetchedExpenses) {
      <ExpenseEditor loading={true} />;
    }

    if (!expense) {
      <NotFound />;
    }

    return <ExpenseEditor expense={expense} />;
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    expenses: state.expenseState.expenses,
    fetchExpensesError: state.expenseState.fetchExpensesError,
    fetchedExpenses: state.expenseState.fetchedExpenses,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      fetchExpenses,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditExpense);
