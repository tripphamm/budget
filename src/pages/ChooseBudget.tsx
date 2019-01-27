import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import Shell from '../components/Shell';
import BottomAction from '../components/BottomAction';
import CurrencyTextField from '../components/CurrencyTextField';

import { BudgeUser, BudgeBudget } from '../budge-app-env';
import { SetUserBudgetAction, SaveUserActionCreator } from '../state/user/actions';
import { BudgeState } from '../state/rootState';
import { setUserBudget } from '../state/user/actionCreators';
import { saveUser } from '../state/user/asyncActionCreators';
import { Typography } from '@material-ui/core';

type ChooseBudgetProps = RouteComponentProps & {
  user: BudgeUser | null;
  setUserBudget: (budget: BudgeBudget) => SetUserBudgetAction;
  saveUser: SaveUserActionCreator;
};

class ChooseBudget extends React.Component<ChooseBudgetProps, {}> {
  render() {
    const { user, history, match, setUserBudget, saveUser } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render ChooseBudget component');
    }

    return (
      <Shell
        title="Set a budget"
        renderSideDrawer={false}
        bottomBarElement={
          <BottomAction
            label="Save"
            onClick={() =>
              saveUser(() => {
                if (!match.url.includes('/profile')) {
                  history.push('/profile');
                }
              })
            }
          />
        }
      >
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <CurrencyTextField
            variant="outlined"
            label="Budget"
            value={user.budget ? user.budget.amount : 0}
            onChange={event => setUserBudget({ amount: parseInt(event.target.value, 10) })}
          />
          <Typography>What's left over after taxes and savings?</Typography>
        </div>
      </Shell>
    );
  }
}

function mapStateToProps(state: BudgeState) {
  return {
    user: state.userState.user,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      setUserBudget,
      saveUser,
    },
    dispatch,
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChooseBudget);
