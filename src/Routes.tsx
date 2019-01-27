import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';

import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Expenses from './pages/Expenses';
import AddBill from './pages/AddBill';
import EditBill from './pages/EditBill';
import Bills from './pages/Bills';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import ChooseAvatar from './pages/ChooseAvatar';
import ChooseTheme from './pages/ChooseTheme';
import ChooseName from './pages/ChooseName';
import ChooseBudget from './pages/ChooseBudget';
import SignIn from './pages/SignIn';
import { BudgeState } from './state/rootState';
import { BudgeUser } from './budge-app-env';

type RoutesProps = RouteComponentProps & {
  user: BudgeUser | null;
};

class Routes extends React.Component<RoutesProps> {
  render() {
    const { user, location } = this.props;

    if (user === null) {
      return <Route path="*" component={SignIn} />;
    }

    if (user.persistedDisplayName === null) {
      return <Route path="*" component={ChooseName} />;
    }

    if (user.persistedAvatar === null) {
      return <Route path="*" component={ChooseAvatar} />;
    }

    if (user.persistedTheme === null) {
      return <Route path="*" component={ChooseTheme} />;
    }

    if (user.persistedBudget === null) {
      return <Route path="*" component={ChooseBudget} />;
    }

    return (
      <Switch location={location}>
        <Route exact path="/" component={Home} />

        <Route exact path="/profile" component={Profile} />
        <Route exact path="/chooseName" component={ChooseName} />
        <Route exact path="/chooseAvatar" component={ChooseAvatar} />
        <Route exact path="/chooseTheme" component={ChooseTheme} />
        <Route exact path="/chooseBudget" component={ChooseBudget} />

        <Route exact path="/newBill" component={AddBill} />
        <Route exact path="/bills" component={Bills} />
        <Route path="/bills/:billId" component={EditBill} />

        <Route exact path="/newExpense" component={AddExpense} />
        <Route exact path="/expenses" component={Expenses} />
        <Route path="/expenses/:expenseId" component={EditExpense} />

        <Route path="*" component={NotFound} />
      </Switch>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    user: state.userState.user,
  };
}

// we need to wrap this component with withRouter so that redux's connect won't block updates
export default withRouter(
  connect(
    mapStateToProps,
    null,
  )(Routes),
);
