import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import Shell from '../components/Shell';
import FullScreenMessage from '../components/FullScreenMessage';

class NotFound extends React.Component<RouteComponentProps, {}> {
  render() {
    return (
      <Shell
        title="Not Found"
        iconElementLeft={<ArrowBackIcon />}
        onLeftIconButtonClick={this.props.history.goBack}
      >
        <FullScreenMessage message="Hmm, this page doesn't seem to exist" />
      </Shell>
    );
  }
}

export default withRouter(NotFound);
