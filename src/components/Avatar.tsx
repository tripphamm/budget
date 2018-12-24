import * as React from 'react';
import { Avatar as MUIAvatar } from '@material-ui/core';

import { BudgeIcon } from '../budge-app-env';
import IconType from '../enums/IconType';
import EmojiIconAvatar from './EmojiIconAvatar';

interface AvatarProps {
  avatar: BudgeIcon | null;
}

const Avatar: React.FunctionComponent<AvatarProps> = (props: AvatarProps) => {
  const { avatar } = props;

  if (avatar === null) {
    return <MUIAvatar />;
  }

  switch (avatar.type) {
    case IconType.EMOJI:
      return <EmojiIconAvatar emojiShortName={avatar.value} />;
    default:
      throw new Error(`Unknown avatar type ${avatar.type}`);
  }
};

export default Avatar;
