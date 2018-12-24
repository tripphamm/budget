import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import BillEditor from '../components/BillEditor';

type AddBillProps = RouteComponentProps;

const addBill: React.FunctionComponent<AddBillProps> = () => {
  return <BillEditor />;
};

export default addBill;
