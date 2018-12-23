import * as React from 'react';
import Button from '@material-ui/core/Button';

import { bottomNavHeight } from '../settings/magicNumbers';

interface BottomActionProps {
  label: string;
  onClick: () => void;
}

class BottomAction extends React.Component<BottomActionProps, {}> {
  render() {
    const { label, onClick } = this.props;

    return (
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        style={{ height: bottomNavHeight }}
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }
}

export default BottomAction;
