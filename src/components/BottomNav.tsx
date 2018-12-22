import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import ReceiptIcon from '@material-ui/icons/Receipt';
import AssessmentIcon from '@material-ui/icons/Assessment';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

class BottomNav extends React.Component<RouteComponentProps, {}> {
  render() {
    const { history, match } = this.props;

    const { url } = match;

    let selectedBottomNavValue;
    if (url.includes('profile')) {
      selectedBottomNavValue = 'profile';
    } else if (url.includes('expenses')) {
      selectedBottomNavValue = 'expenses';
    } else if (url.includes('trends')) {
      selectedBottomNavValue = 'trends';
    } else {
      selectedBottomNavValue = 'expenses';
    }

    const bottomNavOnChange = (event: any, pageKey: string) => {
      switch (pageKey) {
        case 'profile':
          history.push('/profile');
          break;
        case 'expenses':
          history.push('/expenses');
          break;
        case 'trends':
          history.push('/trends');
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
        <BottomNavigationAction label="Trends" value="trends" icon={<AssessmentIcon />} />
      </BottomNavigation>
    );
  }
}

export default withRouter(BottomNav);
