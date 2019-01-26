import React from 'react';
import { Redirect } from 'react-router-dom';

export default function currentMonthExpenses() {
  const today = new Date();
  const month = today.getMonth() + 1; // so that Jan is 1 rather than 0
  const year = today.getFullYear();

  return <Redirect to={`/expenses/${year}/${month}`} />;
}
