import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { default as createUuid } from 'uuid/v4';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import { Theme, withTheme } from '@material-ui/core';

import Shell from '../components/Shell';
import BottomAction from '../components/BottomAction';
import CurrencyTextField from '../components/CurrencyTextField';

import IconType from '../enums/IconType';
import { SaveExpenseActionCreator, DeleteExpenseActionCreator } from '../state/expense/actions';
import { BudgeState } from '../state/rootState';
import { saveExpense, deleteExpense } from '../state/expense/asyncActionCreators';
import { BudgeExpense, BudgeIcon } from '../budge-app-env';
import EmojiIcon from './EmojiIcon';
import FullScreenMessage from './FullScreenMessage';

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

type ExpenseEditorProps = RouteComponentProps & {
  theme: Theme;
  loading?: boolean;
  expense?: BudgeExpense;
  saveExpense: SaveExpenseActionCreator;
  deleteExpense: DeleteExpenseActionCreator;
};

interface ExpenseEditorState {
  name: string;
  amount: number;
  icon: BudgeIcon;
}

const defaultState = {
  name: '',
  amount: 0,
  icon: { type: IconType.EMOJI, value: ':money_with_wings:' },
};

class ExpenseEditor extends React.Component<ExpenseEditorProps, ExpenseEditorState> {
  constructor(props: ExpenseEditorProps) {
    super(props);

    this.state = { ...defaultState };

    this.setName = this.setName.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.setIcon = this.setIcon.bind(this);
  }

  componentDidMount() {
    const { expense } = this.props;

    if (expense) {
      this.setState({
        ...defaultState,
        ...(expense.name ? { name: expense.name } : {}),
        ...(expense.amount ? { amount: expense.amount } : {}),
        ...(expense.icon ? { icon: expense.icon } : {}),
      });
    }
  }

  componentDidUpdate(prevProps: ExpenseEditorProps) {
    const { expense } = this.props;

    if (!prevProps.expense && expense) {
      this.setState({
        ...defaultState,
        ...(expense.name ? { name: expense.name } : {}),
        ...(expense.amount ? { amount: expense.amount } : {}),
        ...(expense.icon ? { icon: expense.icon } : {}),
      });
    }
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
    const { theme, history, expense, saveExpense, deleteExpense, loading = false } = this.props;

    return (
      <Shell
        title={expense ? 'Edit Expense' : 'Add Expense'}
        iconElementLeft={<ArrowBackIcon />}
        onLeftIconButtonClick={history.goBack}
        iconElementRight={expense ? <DeleteIcon /> : undefined}
        onRightIconButtonClick={
          expense ? () => deleteExpense(expense.id, history.goBack) : undefined
        }
        bottomBarElement={
          <BottomAction
            label="Save"
            disabled={loading || name.length === 0 || amount === 0}
            onClick={() =>
              saveExpense(
                {
                  id: expense ? expense.id : createUuid(),
                  name,
                  amount,
                  icon,
                  timestamp: new Date().getTime(),
                },
                history.goBack,
              )
            }
          />
        }
      >
        {loading && <FullScreenMessage message="Loading expense..." />}
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
            <CurrencyTextField
              variant="outlined"
              fullWidth
              label="Amount"
              value={amount}
              onChange={event => this.setAmount(parseFloat(event.target.value))}
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
      deleteExpense,
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
