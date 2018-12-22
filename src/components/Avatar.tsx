import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';

import { BudgeAvatar } from '../budge-app-env';
import { getImageSrcByUnicodeOrShortName } from '../utils/emojiUtil';
import AvatarType from '../enums/AvatarType';

interface AvatarProps {
  avatar: BudgeAvatar | null;
}

const avatar: React.FunctionComponent<AvatarProps> = (props: AvatarProps) => {
  const { avatar } = props;

  if (avatar === null) {
    return <Avatar />;
  }

  switch (avatar.type) {
    case AvatarType.EMOJI:
      const emojiShortName = avatar.value;
      return <Avatar src={getImageSrcByUnicodeOrShortName(emojiShortName)} alt={emojiShortName} />;
    default:
      throw new Error(`Unknown avatar type ${avatar.type}`);
  }
};

export default avatar;
