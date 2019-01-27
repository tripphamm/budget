import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import Shell from '../components/Shell';
import FloatingAddButton from '../components/floatingActionButtons/Add';
import FloatingActionButtonBuffer from '../components/floatingActionButtons/FloatingActionButtonBuffer';

import { floatingActionButtonBufferHeight } from '../settings/magicNumbers';
import { BudgeState } from '../state/rootState';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';
import { setMonth, setYear } from '../state/expense/actionCreators';
import { fetchExpensesByMonth } from '../state/expense/asyncActionCreators';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import {
  FetchExpensesByMonthActionCreator,
  SetMonthAction,
  SetYearAction,
} from '../state/expense/actions';
import Avatar from '../components/Avatar';
import DateSelector from '../components/DateSelector';
import {
  FetchExpensesByMonthErrorMatrix,
  FetchedExpensesByMonthMatrix,
  ExpensesMatrix,
} from '../state/expense/state';
import { selectExpensesByMonthMatrix } from '../state/expense/selectors';
import { parseDateParams, getExpensesURL } from '../utils/routingUtil';
import FullScreenMessage from '../components/FullScreenMessage';

type ExpensesProps = RouteComponentProps & {
  month: number;
  year: number;
  expensesByMonthMatrix: ExpensesMatrix;
  saveExpenseErrors: { [id: string]: Error | null };
  fetchExpensesByMonthErrorMatrix: FetchExpensesByMonthErrorMatrix;
  fetchExpensesByMonth: FetchExpensesByMonthActionCreator;
  fetchedExpensesByMonthMatrix: FetchedExpensesByMonthMatrix;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
  setMonth: (month: number) => SetMonthAction;
  setYear: (year: number) => SetYearAction;
};

class Expenses extends React.Component<ExpensesProps, {}> {
  constructor(props: ExpensesProps) {
    super(props);

    this.fetchedExpenses = this.fetchedExpenses.bind(this);
  }

  componentDidMount() {
    const { month, year } = this.props;

    if (!this.fetchedExpenses()) {
      this.props.fetchExpensesByMonth(year, month);
    }
  }

  componentDidUpdate(prevProps: ExpensesProps) {
    const { month, year } = this.props;

    if (!this.fetchedExpenses()) {
      this.props.fetchExpensesByMonth(year, month);
    }
  }

  fetchedExpenses() {
    const { month, year, fetchedExpensesByMonthMatrix } = this.props;

    return (
      fetchedExpensesByMonthMatrix !== null &&
      fetchedExpensesByMonthMatrix[year] !== undefined &&
      fetchedExpensesByMonthMatrix[year][month] === true
    );
  }

  render() {
    const {
      history,
      month,
      year,
      expensesByMonthMatrix,
      setMonth,
      setYear,
      fetchExpensesByMonthErrorMatrix,
    } = this.props;

    const fetchedExpenses = this.fetchedExpenses();

    // if we have expenses for the current
    const expenses =
      expensesByMonthMatrix !== null &&
      expensesByMonthMatrix[year] !== undefined &&
      expensesByMonthMatrix[year][month] !== undefined
        ? expensesByMonthMatrix[year][month]
        : {};

    const expenseIds = Object.keys(expenses);

    return (
      <Shell
        title="Expenses"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          this.props.toggleSideDrawerOpen();
        }}
      >
        <DateSelector month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
        {!fetchedExpenses && <FullScreenMessage message="Loading expenses..." />}
        {fetchedExpenses && expenseIds.length === 0 && (
          <FullScreenMessage message="Nothing here yet" />
        )}
        {fetchedExpenses && expenseIds.length > 0 && (
          <List>
            {expenseIds.map(id => {
              const expense = expenses[id];

              return (
                <ListItem
                  button
                  key={expense.id}
                  onClick={() => history.push(`/expenses/${expense.id}`)}
                >
                  <ListItemIcon>
                    <Avatar avatar={expense.icon} size={40} />
                  </ListItemIcon>
                  <ListItemText
                    inset
                    primary={expense.name}
                    secondary={`$${expense.amount.toFixed(2)}`}
                  />
                </ListItem>
              );
            })}
          </List>
        )}
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

function mapStateToProps(state: BudgeState) {
  return {
    month: state.expenseState.month,
    year: state.expenseState.year,
    expensesByMonthMatrix: selectExpensesByMonthMatrix(state),
    saveExpenseErrors: state.expenseState.saveExpenseErrors,
    fetchExpensesByMonthErrorMatrix: state.expenseState.fetchExpensesByMonthErrorMatrix,
    fetchedExpensesByMonthMatrix: state.expenseState.fetchedExpensesByMonthMatrix,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      toggleSideDrawerOpen,
      fetchExpensesByMonth,
      setMonth,
      setYear,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Expenses);
