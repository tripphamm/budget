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
  withTheme,
  Theme,
  Typography,
} from '@material-ui/core';

import Shell from '../components/Shell';
import FloatingAddButton from '../components/floatingActionButtons/Add';
import FloatingActionButtonBuffer from '../components/floatingActionButtons/FloatingActionButtonBuffer';

import { floatingActionButtonBufferHeight } from '../settings/magicNumbers';
import { BudgeState } from '../state/rootState';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';
import { setMonth, setYear } from '../state/expense/actionCreators';
import { fetchBills } from '../state/bill/asyncActionCreators';
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
import FullScreenMessage from '../components/FullScreenMessage';
import { BudgeUser, BudgeBill } from '../budge-app-env';
import NumberFormat from 'react-number-format';
import { FetchBillsActionCreator } from '../state/bill/actions';

type ExpensesProps = RouteComponentProps & {
  theme: Theme;
  user: BudgeUser | null;
  bills: { [billId: string]: BudgeBill };
  fetchedBills: boolean;
  month: number;
  year: number;
  expensesByMonthMatrix: ExpensesMatrix;
  saveExpenseErrors: { [id: string]: Error | null };
  fetchExpensesByMonthErrorMatrix: FetchExpensesByMonthErrorMatrix;
  fetchExpensesByMonth: FetchExpensesByMonthActionCreator;
  fetchedExpensesByMonthMatrix: FetchedExpensesByMonthMatrix;
  fetchBills: FetchBillsActionCreator;
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
    const { month, year, fetchedBills } = this.props;

    if (!fetchedBills) {
      this.props.fetchBills();
    }

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
      theme,
      user,
      bills,
      fetchedBills,
      history,
      month,
      year,
      expensesByMonthMatrix,
      setMonth,
      setYear,
      fetchExpensesByMonthErrorMatrix,
    } = this.props;

    const fetchedExpenses = this.fetchedExpenses();

    const loading = !fetchedExpenses || !fetchedBills;

    // if we have expenses for the current
    const expenses =
      expensesByMonthMatrix !== null &&
      expensesByMonthMatrix[year] !== undefined &&
      expensesByMonthMatrix[year][month] !== undefined
        ? expensesByMonthMatrix[year][month]
        : {};

    const expenseIds = Object.keys(expenses);

    const budget = user!.budget!.amount;
    const billsTotal = Object.keys(bills).reduce((total, billId) => {
      return total + bills[billId].amount;
    }, 0);

    const expensesTotal = expenseIds.reduce((total, expenseId) => {
      return total + expenses[expenseId].amount;
    }, 0);

    const budgetMinusBills = budget - billsTotal;

    const expensePercentage = 100 * (expensesTotal / budgetMinusBills);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    let todayMarkerPosition = null;
    if (month === currentMonth && year === currentYear) {
      const daysInThisMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      const daysLeftInThisMonth = daysInThisMonth - now.getDate();

      todayMarkerPosition = 100 - 100 * (daysLeftInThisMonth / daysInThisMonth);
    }

    let barColor = theme.palette.primary.light;
    if (todayMarkerPosition && expensePercentage > todayMarkerPosition) {
      barColor = theme.palette.error.light;
    }

    return (
      <Shell
        title="Expenses"
        iconElementLeft={<MenuIcon />}
        onLeftIconButtonClick={() => {
          this.props.toggleSideDrawerOpen();
        }}
      >
        <DateSelector month={month} year={year} onMonthChange={setMonth} onYearChange={setYear} />
        {!loading && expenseIds.length > 0 && budgetMinusBills > 0 && (
          <>
            <div
              style={{
                marginTop: 10,
                position: 'relative',
                border: `1px solid ${theme.palette.divider}`,
                height: 40,
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${expensePercentage}%`,
                  backgroundColor: barColor,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: `${todayMarkerPosition}%`,
                  height: 40,
                  width: 1,
                  backgroundColor: theme.palette.divider,
                }}
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography>
                <NumberFormat
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  suffix=" spent"
                  value={expensesTotal}
                />
              </Typography>
              <Typography variant="h4">
                <NumberFormat
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  suffix=" left"
                  value={budgetMinusBills - expensesTotal}
                />
              </Typography>
              <Typography>
                <NumberFormat
                  displayType="text"
                  thousandSeparator
                  prefix="$"
                  suffix=" max"
                  value={budgetMinusBills}
                />
              </Typography>
            </div>
          </>
        )}
        {loading && <FullScreenMessage message="Loading expenses..." />}
        {!loading && expenseIds.length === 0 && <FullScreenMessage message="Nothing here yet" />}
        {!loading && expenseIds.length > 0 && (
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
    user: state.userState.user,
    bills: state.billState.bills,
    fetchedBills: state.billState.fetchedBills,
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
      fetchBills,
    },
    dispatch,
  );
}

export default withTheme()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Expenses),
);
