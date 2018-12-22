import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { History } from 'history';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import Shell from '../components/Shell';
import { SetUserDisplayNameAction, SetUserAvatarAction } from '../state/actions';
import { setUserDisplayName, setUserAvatar } from '../state/actionCreators';
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

type WelcomeProps = RouteComponentProps & {
  user: BudgeUser | null;
  setUserDisplayName: (name: string) => SetUserDisplayNameAction;
  setUserAvatar: (avatar: BudgeAvatar) => SetUserAvatarAction;
};

class Welcome extends React.Component<WelcomeProps, {}> {
  render() {
    const { user, setUserAvatar, setUserDisplayName } = this.props;

    if (user === null) {
      throw new Error('`user` must be non-null to render Welcome component');
    }

    return (
      <Shell title="Welcome to Budge">
        <Typography variant="h2">Welcome</Typography>
        <Typography>What should we call you?</Typography>
        <TextField
          label="Name"
          value={user.displayName ? user.displayName : ''}
          onChange={event => setUserDisplayName(event.target.value)}
        />
        <Typography>Choose a mascot</Typography>
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
      setUserDisplayName,
    },
    dispatch,
  );
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(Welcome),
);
