import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { default as createUuid } from 'uuid/v4';
import NumberFormat from 'react-number-format';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import { Theme, withTheme } from '@material-ui/core';

import Shell from '../components/Shell';
import BottomAction from '../components/BottomAction';

import IconType from '../enums/IconType';
import { SaveExpenseActionCreator } from '../state/expense/actions';
import { BudgeState } from '../state/rootState';
import { saveExpense } from '../state/expense/asyncActionCreators';
import { BudgeExpense, BudgeIcon } from '../budge-app-env';
import Loading from './Loading';
import EmojiIcon from './EmojiIcon';

const expenseIcons = [
  ':money_with_wings:',
  ':tickets:',
  ':calling:',
  ':taxi:',
  ':shushing_face:',
  ':nail_care:',
  ':fork_knife_plate:',
  ':beers:',
  ':coffee:',
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

type ExpenseEditorProps = RouteComponentProps & {
  theme: Theme;
  loading?: boolean;
  expense?: BudgeExpense;
  saveExpense: SaveExpenseActionCreator;
};

interface ExpenseEditorState {
  name: string;
  amount: number;
  icon: BudgeIcon;
}

class ExpenseEditor extends React.Component<ExpenseEditorProps, ExpenseEditorState> {
  constructor(props: ExpenseEditorProps) {
    super(props);

    this.state = {
      name: props.expense ? props.expense.name : '',
      amount: props.expense ? props.expense.amount : 0,
      icon: props.expense
        ? props.expense.icon
        : { type: IconType.EMOJI, value: ':money_with_wings:' },
    };

    this.setName = this.setName.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.setIcon = this.setIcon.bind(this);
  }

  setName(name: string) {
    this.setState({ name });
  }

  setAmount(amount: number) {
    this.setState({ amount });
  }

  setIcon(icon: BudgeIcon) {
    this.setState({ icon });
  }

  render() {
    const { name, amount, icon } = this.state;
    const { theme, history, expense, saveExpense, loading = false } = this.props;

    return (
      <Shell
        title={expense ? 'Edit Expense' : 'Add Expense'}
        iconElementLeft={<ArrowBackIcon />}
        onLeftIconButtonClick={history.goBack}
        bottomBarElement={
          <BottomAction
            label="Save"
            disabled={loading && name.length === 0 && amount === 0}
            onClick={() =>
              saveExpense(
                {
                  id: expense ? expense.id : createUuid(),
                  name,
                  amount,
                  icon,
                  timestamp: new Date().getTime(),
                },
                () => {
                  history.push('/expenses');
                },
              )
            }
          />
        }
      >
        {loading && <Loading message="Loading expense..." />}
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
              label="Expense name"
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
              {expenseIcons.map(emojiShortName => {
                const selected = icon.type === IconType.EMOJI && icon.value === emojiShortName;

                return (
                  <button
                    type="button"
                    onClick={() => this.setIcon({ type: IconType.EMOJI, value: emojiShortName })}
                    key={`expense-icon-option-${emojiShortName}`}
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
      saveExpense,
    },
    dispatch,
  );
}

export default withTheme()(
  withRouter(
    connect(
      null,
      mapDispatchToProps,
    )(ExpenseEditor),
  ),
);
