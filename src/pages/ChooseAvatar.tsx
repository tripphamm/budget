import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import Shell from '../components/Shell';
import { SetUserAvatarAction } from '../state/actions';
import { setUserAvatar } from '../state/actionCreators';
import { saveUser } from '../state/asyncActionCreators';
import { getImageSrcByUnicodeOrShortName } from '../utils/emojiUtil';
import { BudgeAvatar, BudgeUser, BudgeState } from '../budge-app-env';
import AvatarType from '../enums/AvatarType';
import { RouteComponentProps, withRouter } from 'react-router-dom';

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
  user: BudgeUser | null;
  setUserAvatar: (avatar: BudgeAvatar) => SetUserAvatarAction;
  saveUser: () => (dispatch: Dispatch, getState: () => BudgeState) => Promise<void>;
};

class ChooseAvatar extends React.Component<ChooseAvatarProps, {}> {
  render() {
    const { user, setUserAvatar, saveUser } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render ChooseAvatar component');
    }

    return (
      <Shell title="Choose an avatar" bottomAction="Save" bottomActionOnClick={saveUser}>
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
              user.avatar.type === AvatarType.EMOJI &&
              user.avatar.value === emojiShortName;

            return (
              <button
                type="button"
                onClick={() => setUserAvatar({ type: AvatarType.EMOJI, value: emojiShortName })}
                key={`avatar-option-${emojiShortName}`}
                style={{
                  background: 'unset',
                  border: 'none',

                  borderRadius: 4,
                  boxShadow: selected ? '0 0 0 3px blue' : '',
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
    user: state.user,
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

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(ChooseAvatar),
);
