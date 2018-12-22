import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import AddExpense from './pages/AddExpense';
import EditExpense from './pages/EditExpense';
import Expenses from './pages/Expenses';
import AddBill from './pages/AddBill';
import EditBill from './pages/EditBill';
import Bills from './pages/Bills';
import Home from './pages/Home';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

const routes: React.FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/profile" component={Profile} />

        <Route exact path="/newBill" component={AddBill} />
        <Route exact path="/bills" component={Bills} />
        <Route path="/bills/:billId" component={EditBill} />

        <Route exact path="/newExpense" component={AddExpense} />
        <Route exact path="/expenses" component={Expenses} />
        <Route path="/expenses/:expenseId" component={EditExpense} />

        <Route path="*" component={NotFound} />
      </Switch>
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default routes;
