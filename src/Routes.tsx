import * as React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import CurrentMonthExpenses from './pages/CurrentMonthExpenses';
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
import SignIn from './pages/SignIn';
import { BudgeState } from './state/rootState';
import { BudgeUser } from './budge-app-env';

import './transition-group.css';

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

    return (
      <div style={{ position: 'relative' }}>
        <TransitionGroup>
          <CSSTransition key={location.key} timeout={{ enter: 500, exit: 500 }} classNames="fade">
            <div style={{ position: 'absolute', top: 0, width: '100%' }}>
              <Switch location={location}>
                <Route exact path="/" component={Home} />

                <Route exact path="/profile" component={Profile} />
                <Route exact path="/chooseName" component={ChooseName} />
                <Route exact path="/chooseAvatar" component={ChooseAvatar} />
                <Route exact path="/chooseTheme" component={ChooseTheme} />

                <Route exact path="/newBill" component={AddBill} />
                <Route exact path="/bills" component={Bills} />
                <Route path="/bills/:billId" component={EditBill} />

                <Route exact path="/newExpense" component={AddExpense} />
                <Route exact path="/expenses" component={CurrentMonthExpenses} />
                <Route exact path="/expenses/:year/:month" component={Expenses} />
                <Route path="/expenses/:expenseId" component={EditExpense} />

                <Route path="*" component={NotFound} />
              </Switch>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </div>
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
