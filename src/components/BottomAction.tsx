import * as React from 'react';
import Button from '@material-ui/core/Button';

import { bottomNavHeight } from '../settings/magicNumbers';

interface BottomActionProps {
  label: string;
  onClick: () => void;
  backgroundColor: string;
  labelColor: string;
}

class BottomAction extends React.Component<BottomActionProps, {}> {
  render() {
    const { label, onClick, backgroundColor, labelColor } = this.props;

    return (
      <Button
        fullWidth
        variant="contained"
        style={{ height: bottomNavHeight, backgroundColor, color: labelColor }}
        onClick={onClick}
      >
        {label}
      </Button>
    );
  }
}

export default BottomAction;
