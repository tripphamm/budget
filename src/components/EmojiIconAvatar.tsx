import * as React from 'react';
import Avatar from '@material-ui/core/Avatar';

import { getImageSrcByUnicodeOrShortName } from '../utils/emojiUtil';

interface EmojiIconAvatarProps {
  emojiShortName: string;
}

const emojiIconAvatar: React.FunctionComponent<EmojiIconAvatarProps> = (
  props: EmojiIconAvatarProps,
) => {
  const { emojiShortName } = props;

  return <Avatar src={getImageSrcByUnicodeOrShortName(emojiShortName)} alt={emojiShortName} />;
};

export default emojiIconAvatar;
