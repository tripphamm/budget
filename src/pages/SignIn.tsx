import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import { History } from 'history';
import Button from '@material-ui/core/Button';

import { appBarBufferHeight } from '../settings/magicNumbers';
import Shell from '../components/Shell';

import { logInUserViaFacebook } from '../state/asyncActions';

interface SignInProps {
  logInUserViaFacebook: () => (dispatch: Dispatch) => void;
}

class SignIn extends React.Component<SignInProps, {}> {
  render() {
    return (
      <Shell>
        <div
          style={{
            height: `calc(100vh - ${appBarBufferHeight}px)`,
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
          }}
        >
          <Button
            variant="contained"
            fullWidth
            onClick={logInUserViaFacebook}
            style={{
              backgroundColor: '#3B5998', // facebook color
              color: 'white',
            }}
          >
            Log in with Facebook
          </Button>
        </div>
      </Shell>
    );
  }
}

function mapDispatchToProps(dispatch: Dispatch) {
  return bindActionCreators(
    {
      logInUserViaFacebook,
    },
    dispatch,
  );
}

export default connect(
  null,
  mapDispatchToProps,
)(SignIn);
