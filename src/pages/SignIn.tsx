import * as React from 'react';
import { bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';

import Shell from '../components/Shell';
import { logInUserViaFacebook } from '../state/user/asyncActionCreators';

interface SignInProps {
  logInUserViaFacebook: () => (dispatch: Dispatch) => void;
}

class SignIn extends React.Component<SignInProps, {}> {
  render() {
    const { logInUserViaFacebook } = this.props;

    return (
      <Shell bottomBarElement={null} renderSideDrawer={false}>
        <div
          style={{
            height: '100%',
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
              maxWidth: 400,
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
