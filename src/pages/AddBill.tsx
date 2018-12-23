import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { default as createUuid } from 'uuid/v4';
import NumberFormat from 'react-number-format';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import { Select, OutlinedInput, MenuItem } from '@material-ui/core';

import Shell from '../components/Shell';

import Cadence from '../enums/Cadence';
import BottomAction from '../components/BottomAction';
import IconType from '../enums/IconType';
import { SaveBillActionCreator } from '../state/bill/actions';
import { ToggleSideDrawerOpenAction } from '../state/shared/actions';
import { BudgeState } from '../state/rootState';
import { saveBill } from '../state/bill/asyncActionCreators';
import { toggleSideDrawerOpen } from '../state/shared/actionCreators';

function numberFormatCustom(props: any) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value,
          },
        });
      }}
      thousandSeparator
      prefix="$"
    />
  );
}

type AddBillProps = RouteComponentProps & {
  saveBill: SaveBillActionCreator;
  toggleSideDrawerOpen: (open?: boolean) => ToggleSideDrawerOpenAction;
};

interface AddBillState {
  name: string;
  amount: number;
  cadence: Cadence;
}

class AddBill extends React.Component<AddBillProps, AddBillState> {
  constructor(props: AddBillProps) {
    super(props);

    this.state = {
      name: '',
      amount: 0,
      cadence: Cadence.MONTHLY,
    };

    this.setName = this.setName.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.setCadence = this.setCadence.bind(this);
  }

  setName(name: string) {
    this.setState({ name });
  }

  setAmount(amount: number) {
    this.setState({ amount });
  }

  setCadence(cadence: Cadence) {
    this.setState({ cadence });
  }

  render() {
    const { name, amount, cadence } = this.state;
    const { history, saveBill } = this.props;

    return (
      <Shell
        title="New Bill"
        iconElementLeft={<ArrowBackIcon />}
        onLeftIconButtonClick={history.goBack}
        bottomBarElement={
          <BottomAction
            label="Save"
            onClick={() =>
              saveBill(
                {
                  id: createUuid(),
                  name,
                  amount,
                  cadence,
                  icon: {
                    type: IconType.EMOJI,
                    value: ':money_with_wings:',
                  },
                },
                () => {
                  history.push('/bills');
                },
              )
            }
          />
        }
      >
        <div
          style={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <TextField
            variant="outlined"
            fullWidth
            InputLabelProps={{ shrink: true }}
            label="Bill name"
            value={name}
            onChange={event => this.setName(event.target.value)}
          />
          <TextField
            variant="outlined"
            fullWidth
            label="Amount"
            value={amount}
            onChange={event => this.setAmount(parseFloat(event.target.value))}
            InputProps={{
              inputComponent: numberFormatCustom,
            }}
          />
          <Select
            value={cadence}
            fullWidth
            onChange={event => this.setCadence(event.target.value as Cadence)}
            input={<OutlinedInput labelWidth={0} name="Cadence" />}
          >
            <MenuItem value={Cadence.MONTHLY}>Monthly</MenuItem>
            <MenuItem value={Cadence.DAILY}>Daily</MenuItem>
            <MenuItem value={Cadence.WEEKLY}>Weekly</MenuItem>
            <MenuItem value={Cadence.ANUALLY}>Yearly</MenuItem>
          </Select>
        </div>
      </Shell>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      saveBill,
      toggleSideDrawerOpen,
    },
    dispatch,
  );
}

export default connect(
  null,
  mapDispatchToProps,
)(AddBill);
