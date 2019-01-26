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
  OutlinedInput,
  Select,
  Typography,
} from '@material-ui/core';

import Shell from '../components/Shell';
import FloatingAddButton from '../components/floatingActionButtons/Add';
import FloatingActionButtonBuffer from '../components/floatingActionButtons/FloatingActionButtonBuffer';

import { BudgeExpense } from '../budge-app-env';
import { floatingActionButtonBufferHeight } from '../settings/magicNumbers';
import { BudgeState } from '../state/rootState';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';
import { fetchExpenses } from '../state/expense/asyncActionCreators';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { FetchExpensesActionCreator } from '../state/expense/actions';
import Avatar from '../components/Avatar';
import Loading from '../components/Loading';
import CurrentMonthExpenses from './CurrentMonthExpenses';

interface ExpensesRouteParams {
  month: string;
  year: string;
}

type ExpensesProps = RouteComponentProps<ExpensesRouteParams> & {
  expenses: { [id: string]: BudgeExpense };
  saveExpenseErrors: { [id: string]: Error | null };
  fetchExpensesError: Error | null;
  fetchExpenses: FetchExpensesActionCreator;
  fetchedExpenses: boolean;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
};

const startingYear = 2019;

class Expenses extends React.Component<ExpensesProps, {}> {
  componentDidMount() {
    if (!this.props.fetchedExpenses) {
      this.props.fetchExpenses();
    }
  }

  render() {
    const { history, match, expenses, fetchedExpenses, fetchExpensesError } = this.props;
    const { params } = match;
    const { month: monthString, year: yearString } = params;

    let month: number;
    let year: number;
    try {
      month = parseInt(monthString, 10);
      year = parseInt(yearString, 10);
    } catch (error) {
      return <CurrentMonthExpenses />;
    }

    const currentYear = new Date().getFullYear();
    const years: number[] = Array<number>(currentYear - startingYear + 1)
      .fill(0)
      .map((_, index) => startingYear + index);

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
            <MenuItem value={1}>January</MenuItem>
            <MenuItem value={2}>February</MenuItem>
            <MenuItem value={3}>March</MenuItem>
            <MenuItem value={4}>April</MenuItem>
            <MenuItem value={5}>May</MenuItem>
            <MenuItem value={6}>June</MenuItem>
            <MenuItem value={7}>July</MenuItem>
            <MenuItem value={8}>August</MenuItem>
            <MenuItem value={9}>September</MenuItem>
            <MenuItem value={10}>October</MenuItem>
            <MenuItem value={11}>November</MenuItem>
            <MenuItem value={12}>December</MenuItem>
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
            this.props.history.push('/newBill');
          }}
        />
      </Shell>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    expenses: state.expenseState.expenses,
    saveExpenseErrors: state.expenseState.saveExpenseErrors,
    fetchExpensesError: state.expenseState.fetchExpensesError,
    fetchedExpenses: state.expenseState.fetchedExpenses,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      toggleSideDrawerOpen,
      fetchExpenses,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Expenses);
