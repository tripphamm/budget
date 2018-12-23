import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { withTheme, Theme } from '@material-ui/core';

import Shell from '../components/Shell';
import BottomAction from '../components/BottomAction';

import { getImageSrcByUnicodeOrShortName } from '../utils/emojiUtil';
import { BudgeIcon, BudgeUser } from '../budge-app-env';
import IconType from '../enums/IconType';
import { RouteComponentProps } from 'react-router';
import { SetUserAvatarAction, SaveUserActionCreator } from '../state/user/actions';
import { BudgeState } from '../state/rootState';
import { setUserAvatar } from '../state/user/actionCreators';
import { saveUser } from '../state/user/asyncActionCreators';

const avatars = [
  ':dog:',
  ':cat:',
  ':mouse:',
  ':hamster:',
  ':rabbit:',
  ':fox:',
  ':bear:',
  ':panda_face:',
  ':koala:',
  ':tiger:',
  ':lion_face:',
  ':cow:',
  ':pig:',
  ':frog:',
  ':monkey_face:',
  ':gorilla:',
  ':chicken:',
  ':penguin:',
  ':bird:',
  ':duck:',
  ':hatched_chick:',
  ':eagle:',
  ':owl:',
  ':bat:',
  ':wolf:',
  ':boar:',
  ':horse:',
  ':zebra:',
  ':butterfly:',
  ':snail:',
  ':spider:',
  ':turtle:',
  ':lizard:',
  ':snake:',
  ':octopus:',
  ':blowfish:',
  ':fish:',
  ':dolphin:',
  ':whale:',
  ':shark:',
  ':crocodile:',
  ':elephant:',
  ':giraffe:',
  ':raccoon:',
];

type ChooseAvatarProps = RouteComponentProps & {
  theme: Theme;
  user: BudgeUser | null;
  setUserAvatar: (avatar: BudgeIcon) => SetUserAvatarAction;
  saveUser: SaveUserActionCreator;
};

class ChooseAvatar extends React.Component<ChooseAvatarProps, {}> {
  render() {
    const { user, theme, history, match, setUserAvatar, saveUser } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render ChooseAvatar component');
    }

    return (
      <Shell
        title="Choose an avatar"
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
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-evenly',
          }}
        >
          {avatars.map(emojiShortName => {
            const selected =
              user.avatar &&
              user.avatar.type === IconType.EMOJI &&
              user.avatar.value === emojiShortName;

            return (
              <button
                type="button"
                onClick={() => setUserAvatar({ type: IconType.EMOJI, value: emojiShortName })}
                key={`avatar-option-${emojiShortName}`}
                style={{
                  background: 'unset',
                  border: 'none',

                  borderRadius: 4,
                  boxShadow: selected ? `0 0 0 3px ${theme.palette.secondary.main}` : '',
                  padding: 2,
                  margin: 2,
                }}
              >
                <img src={getImageSrcByUnicodeOrShortName(emojiShortName)} alt={emojiShortName} />
              </button>
            );
          })}
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
      setUserAvatar,
      saveUser,
    },
    dispatch,
  );
}

export default withTheme()(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChooseAvatar),
);
