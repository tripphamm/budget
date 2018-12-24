import * as React from 'react';
import { Avatar as MUIAvatar } from '@material-ui/core';

import { BudgeIcon } from '../budge-app-env';
import IconType from '../enums/IconType';
import EmojiIcon from './EmojiIcon';

interface AvatarProps {
  avatar: BudgeIcon | null;
  size: number;
}

const Avatar: React.FunctionComponent<AvatarProps> = (props: AvatarProps) => {
  const { avatar, size = 40 } = props;

  if (avatar === null) {
    return <MUIAvatar />;
  }

  switch (avatar.type) {
    case IconType.EMOJI:
      return <EmojiIcon emojiShortName={avatar.value} size={size} />;
    default:
      throw new Error(`Unknown avatar type ${avatar.type}`);
  }
};

export default Avatar;
