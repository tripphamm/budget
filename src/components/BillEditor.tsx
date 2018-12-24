import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { default as createUuid } from 'uuid/v4';
import NumberFormat from 'react-number-format';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import { Select, OutlinedInput, MenuItem, Theme, withTheme } from '@material-ui/core';

import Shell from '../components/Shell';

import Cadence from '../enums/Cadence';
import BottomAction from '../components/BottomAction';
import IconType from '../enums/IconType';
import { SaveBillActionCreator } from '../state/bill/actions';
import { BudgeState } from '../state/rootState';
import { saveBill } from '../state/bill/asyncActionCreators';
import { BudgeBill, BudgeIcon } from '../budge-app-env';
import Loading from './Loading';
import { getImageSrcByUnicodeOrShortName } from '../utils/emojiUtil';

const billIcons = [
  ':money_with_wings:',
  ':iphone:',
  ':tv:',
  ':house:',
  ':potable_water:',
  ':bulb:',
  ':shopping_cart:',
  ':credit_card:',
  ':red_car:',
  ':fuelpump:',
  ':fire:',
  ':mortar_board:',
];

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

type BillEditorProps = RouteComponentProps & {
  theme: Theme;
  loading?: boolean;
  bill?: BudgeBill;
  saveBill: SaveBillActionCreator;
};

interface BillEditorState {
  name: string;
  amount: number;
  cadence: Cadence;
  icon: BudgeIcon;
}

class BillEditor extends React.Component<BillEditorProps, BillEditorState> {
  constructor(props: BillEditorProps) {
    super(props);

    this.state = {
      name: props.bill ? props.bill.name : '',
      amount: props.bill ? props.bill.amount : 0,
      cadence: props.bill ? props.bill.cadence : Cadence.MONTHLY,
      icon: props.bill ? props.bill.icon : { type: IconType.EMOJI, value: ':money_with_wings:' },
    };

    this.setName = this.setName.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.setCadence = this.setCadence.bind(this);
    this.setIcon = this.setIcon.bind(this);
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

  setIcon(icon: BudgeIcon) {
    this.setState({ icon });
  }

  render() {
    const { name, amount, cadence, icon } = this.state;
    const { theme, history, bill, saveBill, loading = false } = this.props;

    return (
      <Shell
        title={bill ? 'Edit Bill' : 'Add Bill'}
        iconElementLeft={<ArrowBackIcon />}
        onLeftIconButtonClick={history.goBack}
        bottomBarElement={
          <BottomAction
            label="Save"
            disabled={loading && name.length === 0 && amount === 0}
            onClick={() =>
              saveBill(
                {
                  id: bill ? bill.id : createUuid(),
                  name,
                  amount,
                  cadence,
                  icon,
                },
                () => {
                  history.push('/bills');
                },
              )
            }
          />
        }
      >
        {loading && <Loading message="Loading bill..." />}
        {!loading && (
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
            <div
              style={{
                padding: 5,
                maxHeight: 175, // enough room for 2 rows of icons
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                flexWrap: 'wrap',
                overflowX: 'scroll',
              }}
            >
              {billIcons.map(emojiShortName => {
                const selected = icon.type === IconType.EMOJI && icon.value === emojiShortName;

                return (
                  <button
                    type="button"
                    onClick={() => this.setIcon({ type: IconType.EMOJI, value: emojiShortName })}
                    key={`bill-icon-option-${emojiShortName}`}
                    style={{
                      background: 'unset',
                      border: 'none',
                      borderRadius: 4,
                      boxShadow: selected ? `0 0 0 3px ${theme.palette.secondary.main}` : '',
                      padding: 2,
                      margin: 2,
                    }}
                  >
                    <img
                      style={{
                        height: 64,
                        width: 64,
                      }}
                      src={getImageSrcByUnicodeOrShortName(emojiShortName)}
                      alt={emojiShortName}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}
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
    },
    dispatch,
  );
}

export default withTheme()(
  withRouter(
    connect(
      null,
      mapDispatchToProps,
    )(BillEditor),
  ),
);
