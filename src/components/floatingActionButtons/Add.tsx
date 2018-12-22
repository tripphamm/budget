import * as React from 'react';
import Fab from '@material-ui/core/Fab';
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
    <Fab
      {...props}
      color="primary"
      style={{
        position: 'fixed',
        bottom: floatingActionButtonOffsetBottom,
        right: floatingActionButtonOffsetRight,
        height: floatingActionButtonSize,
        width: floatingActionButtonSize,
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default add;
