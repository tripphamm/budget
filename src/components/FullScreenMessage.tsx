import * as React from 'react';
import { Typography } from '@material-ui/core';

const FullScreenMessage: React.FunctionComponent<{ message: string | null }> = props => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography>{props.message}</Typography>
    </div>
  );
};

export default FullScreenMessage;
