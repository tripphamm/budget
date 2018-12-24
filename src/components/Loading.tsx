import * as React from 'react';

const Loading: React.FunctionComponent<{ message: string | null }> = props => {
  return (
    <div
      style={{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {props.message}
    </div>
  );
};

export default Loading;
