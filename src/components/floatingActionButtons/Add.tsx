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

const Add: React.FunctionComponent<FloatingAddButtonProps> = props => {
  return (
    <Fab
      {...props}
      color="secondary"
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

export default Add;
