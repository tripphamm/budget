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
import { fetchExpensesByMonth } from '../state/expense/asyncActionCreators';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { FetchExpensesByMonthActionCreator } from '../state/expense/actions';
import Avatar from '../components/Avatar';
import Loading from '../components/Loading';
import CurrentMonthExpenses from './CurrentMonthExpenses';
import {
  FetchExpensesByMonthErrorMatrix,
  FetchedExpensesByMonthMatrix,
  ExpensesMatrix,
} from '../state/expense/state';
import { selectExpensesByMonthMatrix } from '../state/expense/selectors';
import { parseDateParams } from '../utils/routingUtil';

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
};

const startingYear = 2019;

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

    const fetchedExpenses = this.fetchedExpenses();
    if (!fetchedExpenses) {
      this.props.fetchExpensesByMonth(year, month);
    }
  }

  componentDidUpdate(prevProps: ExpensesProps) {
    const { match } = this.props;
    const { params } = match;
    const { month: monthParam, year: yearParam } = params;

    const { match: prevMatch } = prevProps;
    const { params: prevParams } = prevMatch;
    const { month: prevMonthParam, year: prevYearParam } = prevParams;

    // evacuate if month and year haven't changed
    if (monthParam === prevMonthParam && yearParam === prevYearParam) {
      return;
    }

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

    // get appropriate years for the Year dropdown
    // starting with the year the app was released and every year after
    // todo: could start with the year of the earlier expense
    const currentYear = new Date().getFullYear();
    const years: number[] = Array<number>(currentYear - startingYear + 1)
      .fill(0)
      .map((_, index) => startingYear + index);

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
          <Select value={month}>
            <MenuItem value={0}>January</MenuItem>
            <MenuItem value={1}>February</MenuItem>
            <MenuItem value={2}>March</MenuItem>
            <MenuItem value={3}>April</MenuItem>
            <MenuItem value={4}>May</MenuItem>
            <MenuItem value={5}>June</MenuItem>
            <MenuItem value={6}>July</MenuItem>
            <MenuItem value={7}>August</MenuItem>
            <MenuItem value={8}>September</MenuItem>
            <MenuItem value={9}>October</MenuItem>
            <MenuItem value={10}>November</MenuItem>
            <MenuItem value={11}>December</MenuItem>
          </Select>
          <Select value={year}>
            {years.map(year => (
              <MenuItem key={`year-select-year-${year}`} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </div>
        {!fetchedExpenses && <Loading message="Loading expenses..." />}
        {fetchedExpenses && expenseIds.length === 0 && (
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
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Expenses);
