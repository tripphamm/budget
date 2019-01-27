import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import TodayIcon from '@material-ui/icons/Today';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { BudgeState } from '../state/rootState';
import { getExpensesURL } from '../utils/routingUtil';

type BottomNavProps = RouteComponentProps & {
  lastExpensesMonth: number;
  lastExpensesYear: number;
};

class BottomNav extends React.Component<BottomNavProps, {}> {
  render() {
    const { history, match, lastExpensesMonth, lastExpensesYear } = this.props;

    const { url } = match;

    let selectedBottomNavValue;
    if (url.includes('profile')) {
      selectedBottomNavValue = 'profile';
    } else if (url.includes('expenses')) {
      selectedBottomNavValue = 'expenses';
    } else if (url.includes('bills')) {
      selectedBottomNavValue = 'bills';
    } else {
      selectedBottomNavValue = 'expenses';
    }

    const bottomNavOnChange = (event: any, pageKey: string) => {
      switch (pageKey) {
        case 'profile':
          history.push('/profile');
          break;
        case 'expenses':
          history.push(getExpensesURL(lastExpensesYear, lastExpensesMonth));
          break;
        case 'bills':
          history.push('/bills');
          break;
        default:
          throw new Error(`Unrecognized navigation: ${pageKey}`);
      }
    };

    return (
      <BottomNavigation
        value={selectedBottomNavValue}
        onChange={bottomNavOnChange}
        style={{
          width: '100vw',
          position: 'absolute',
          bottom: 0,
        }}
      >
        <BottomNavigationAction label="Profile" value="profile" icon={<PersonIcon />} />
        <BottomNavigationAction label="Expenses" value="expenses" icon={<ReceiptIcon />} />
        <BottomNavigationAction label="Bills" value="bills" icon={<TodayIcon />} />
      </BottomNavigation>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    lastExpensesMonth: state.expenseState.month,
    lastExpensesYear: state.expenseState.year,
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(BottomNav),
);
