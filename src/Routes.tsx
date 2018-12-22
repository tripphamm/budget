import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

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

const routes: React.FunctionComponent = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />

      <Route exact path="/profile" component={Profile} />
      <Route exact path="/chooseName" component={ChooseName} />
      <Route exact path="/chooseAvatar" component={ChooseAvatar} />
      <Route exact path="/chooseTheme" component={ChooseTheme} />

      <Route exact path="/newBill" component={AddBill} />
      <Route exact path="/bills" component={Bills} />
      <Route path="/bills/:billId" component={EditBill} />

      <Route exact path="/newExpense" component={AddExpense} />
      <Route exact path="/expenses" component={Expenses} />
      <Route path="/expenses/:expenseId" component={EditExpense} />

      <Route path="*" component={NotFound} />
    </Switch>
  );
};

export default routes;
