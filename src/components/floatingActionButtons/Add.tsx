import * as React from 'react';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import {
  floatingActionButtonSize,
  floatingActionButtonOffsetBottom,
  floatingActionButtonOffsetRight,
} from '../../settings/magicNumbers';

interface FloatingAddButtonProps {
  onClick: () => void;
}

const add: React.FunctionComponent<FloatingAddButtonProps> = props => {
  return (
    <Button
      {...props}
      color="primary"
      variant="fab"
      style={{
        position: 'fixed',
        bottom: floatingActionButtonOffsetBottom,
        right: floatingActionButtonOffsetRight,
        height: floatingActionButtonSize,
        width: floatingActionButtonSize,
      }}
    >
      <AddIcon />
    </Button>
  );
};

export default add;
