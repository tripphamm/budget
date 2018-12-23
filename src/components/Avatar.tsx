import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';

import { BudgeIcon } from '../budge-app-env';
import { getImageSrcByUnicodeOrShortName } from '../utils/emojiUtil';
import IconType from '../enums/IconType';

interface AvatarProps {
  avatar: BudgeIcon | null;
}

const avatar: React.FunctionComponent<AvatarProps> = (props: AvatarProps) => {
  const { avatar } = props;

  if (avatar === null) {
    return <Avatar />;
  }

  switch (avatar.type) {
    case IconType.EMOJI:
      const emojiShortName = avatar.value;
      return <Avatar src={getImageSrcByUnicodeOrShortName(emojiShortName)} alt={emojiShortName} />;
    default:
      throw new Error(`Unknown avatar type ${avatar.type}`);
  }
};

export default avatar;
