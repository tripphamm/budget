import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { default as createUuid } from 'uuid/v4';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { Select, OutlinedInput, MenuItem, Theme, withTheme } from '@material-ui/core';

import Shell from '../components/Shell';
import BottomAction from '../components/BottomAction';
import CurrencyTextField from '../components/CurrencyTextField';

import Cadence from '../enums/Cadence';
import IconType from '../enums/IconType';
import { SaveBillActionCreator, DeleteBillActionCreator } from '../state/bill/actions';
import { BudgeState } from '../state/rootState';
import { saveBill, deleteBill } from '../state/bill/asyncActionCreators';
import { BudgeBill, BudgeIcon } from '../budge-app-env';
import EmojiIcon from './EmojiIcon';
import FullScreenMessage from './FullScreenMessage';

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
  ':woman_lifting_weights:',
];

type BillEditorProps = RouteComponentProps & {
  theme: Theme;
  loading?: boolean;
  bill?: BudgeBill;
  saveBill: SaveBillActionCreator;
  deleteBill: DeleteBillActionCreator;
};

interface BillEditorState {
  name: string;
  amount: number;
  cadence: Cadence;
  icon: BudgeIcon;
}

const defaultState = {
  name: '',
  amount: 0,
  cadence: Cadence.MONTHLY,
  icon: { type: IconType.EMOJI, value: ':money_with_wings:' },
};

class BillEditor extends React.Component<BillEditorProps, BillEditorState> {
  constructor(props: BillEditorProps) {
    super(props);

    this.state = { ...defaultState };

    this.setName = this.setName.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.setCadence = this.setCadence.bind(this);
    this.setIcon = this.setIcon.bind(this);
  }

  componentDidMount() {
    const { bill } = this.props;

    if (bill) {
      this.setState({
        ...defaultState,
        ...(bill.name ? { name: bill.name } : {}),
        ...(bill.amount ? { amount: bill.amount } : {}),
        ...(bill.cadence ? { cadence: bill.cadence } : {}),
        ...(bill.icon ? { icon: bill.icon } : {}),
      });
    }
  }

  componentDidUpdate(prevProps: BillEditorProps) {
    const { bill } = this.props;

    if (!prevProps.bill && bill) {
      this.setState({
        ...defaultState,
        ...(bill.name ? { name: bill.name } : {}),
        ...(bill.amount ? { amount: bill.amount } : {}),
        ...(bill.cadence ? { cadence: bill.cadence } : {}),
        ...(bill.icon ? { icon: bill.icon } : {}),
      });
    }
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
    const { theme, history, bill, saveBill, deleteBill, loading = false } = this.props;

    return (
      <Shell
        title={bill ? 'Edit Bill' : 'Add Bill'}
        iconElementLeft={<ArrowBackIcon />}
        onLeftIconButtonClick={() => history.push('/bills')}
        iconElementRight={bill ? <DeleteIcon /> : undefined}
        onRightIconButtonClick={
          bill ? () => deleteBill(bill.id, () => history.push('/bills')) : undefined
        }
        bottomBarElement={
          <BottomAction
            label="Save"
            disabled={loading || name.length === 0 || amount === 0}
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
        {loading && <FullScreenMessage message="Loading bill..." />}
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
            <CurrencyTextField
              variant="outlined"
              fullWidth
              label="Amount"
              value={amount}
              onChange={event => this.setAmount(parseFloat(event.target.value))}
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
                    <EmojiIcon emojiShortName={emojiShortName} size={40} />
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
      deleteBill,
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
