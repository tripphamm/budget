import * as React from 'react';
import Button from '@material-ui/core/Button';

import { bottomNavHeight } from '../settings/magicNumbers';

interface BottomActionProps {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

class BottomAction extends React.Component<BottomActionProps, {}> {
  render() {
    const { label, onClick, disabled = false } = this.props;

    return (
      <Button
        fullWidth
        disabled={disabled}
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
