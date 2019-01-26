import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import ExpenseEditor from '../components/ExpenseEditor';

type AddExpenseProps = RouteComponentProps;

const addExpense: React.FunctionComponent<AddExpenseProps> = () => {
  return <ExpenseEditor />;
};

export default addExpense;
