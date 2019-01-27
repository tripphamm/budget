import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import MenuIcon from '@material-ui/icons/Menu';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@material-ui/core';

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
import CurrentMonthExpenses from './CurrentMonthExpenses';
import {
  FetchExpensesByMonthErrorMatrix,
  FetchedExpensesByMonthMatrix,
  ExpensesMatrix,
} from '../state/expense/state';
import { selectExpensesByMonthMatrix } from '../state/expense/selectors';
import { parseDateParams, getExpensesURL } from '../utils/routingUtil';
import FullScreenMessage from '../components/FullScreenMessage';

interface ExpensesRouteParams {
  month: string;
  year: string;
}

type ExpensesProps = RouteComponentProps<ExpensesRouteParams> & {
  expensesByMonthMatrix: ExpensesMatrix;
  saveExpenseErrors: { [id: string]: Error | null };
  fetchExpensesByMonthErrorMatrix: FetchExpensesByMonthErrorMatrix;
  fetchExpensesByMonth: FetchExpensesByMonthActionCreator;
  fetchedExpensesByMonthMatrix: FetchedExpensesByMonthMatrix;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
  setMonth: (month: number) => SetMonthAction;
  setYear: (year: number) => SetYearAction;
};

const startingYear = 2018;

class Expenses extends React.Component<ExpensesProps, {}> {
  constructor(props: ExpensesProps) {
    super(props);

    this.fetchedExpenses = this.fetchedExpenses.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    const { params } = match;
    const { month: monthParam, year: yearParam } = params;

    let month: number;
    let year: number;
    try {
      const parsedDate = parseDateParams(monthParam, yearParam);
      month = parsedDate.month;
      year = parsedDate.year;
    } catch (error) {
      console.error(error);
      return;
    }

    // we remember the latest month and yar in redux
    // so that we can come back to the correct month if the user navigates away
    // the month and year from the URL should be considered the source of truth
    // the month and year in redux are only used as a cache to remember the last month visited
    this.props.setMonth(month);
    this.props.setYear(year);

    const fetchedExpenses = this.fetchedExpenses();
    if (!fetchedExpenses) {
      this.props.fetchExpensesByMonth(year, month);
    }
  }

  fetchedExpenses() {
    const { match, fetchedExpensesByMonthMatrix } = this.props;
    const { params } = match;
    const { month: monthParam, year: yearParam } = params;

    let month: number;
    let year: number;
    try {
      const parsedDate = parseDateParams(monthParam, yearParam);
      month = parsedDate.month;
      year = parsedDate.year;
    } catch (error) {
      console.error(error);
      return;
    }

    return (
      fetchedExpensesByMonthMatrix !== null &&
      fetchedExpensesByMonthMatrix[year] !== undefined &&
      fetchedExpensesByMonthMatrix[year][month] === true
    );
  }

  render() {
    const { history, match, expensesByMonthMatrix, fetchExpensesByMonthErrorMatrix } = this.props;
    const { params } = match;
    const { month: monthParam, year: yearParam } = params;

    let month: number;
    let year: number;
    try {
      const parsedDate = parseDateParams(monthParam, yearParam);
      month = parsedDate.month;
      year = parsedDate.year;
    } catch (error) {
      return <CurrentMonthExpenses />;
    }

    const today = new Date();
    // get appropriate years for the Year dropdown
    // starting with the year the app was released and every year after
    // todo: could start with the year of the earlier expense
    const currentYear = today.getFullYear();
    const years: number[] = Array<number>(currentYear - startingYear + 1)
      .fill(0)
      .map((_, index) => startingYear + index);

    // get appropriate list of months for the Month dropdown
    // if the year is the current year, filter out any months after the current month
    const currentMonth = today.getMonth();
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ].filter((_, index) => year !== currentYear || index <= currentMonth);

    // if the selected date is in the future, redirect to the current month
    if (year > currentYear || (year === currentYear && month > currentMonth)) {
      return <CurrentMonthExpenses />;
    }

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
        <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Select
            value={month}
            onChange={event => history.push(getExpensesURL(year, parseInt(event.target.value, 10)))}
          >
            {months.map((month, index) => (
              <MenuItem key={`month-select-month-${month}`} value={index}>
                {month}
              </MenuItem>
            ))}
          </Select>
          <Select
            value={year}
            onChange={event =>
              history.push(getExpensesURL(parseInt(event.target.value, 10), month))
            }
          >
            {years.map(year => (
              <MenuItem key={`year-select-year-${year}`} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </div>
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
