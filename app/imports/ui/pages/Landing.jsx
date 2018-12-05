import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Meteor} from 'meteor/meteor';

class Landing extends React.Component {
  render() {
    if (Meteor.user()) {
      return <Redirect to='/events'/>;
    }
    return (
        <Grid verticalAlign='middle' textAlign='center' container style={{ padding: '5%' }}>
          <Grid.Column width={12}>
            <h1>Welcome to eventr, the open event sharing app</h1>
            <p>Please sign in in the upper right hand corner</p>
          </Grid.Column>

        </Grid>
    );
  }
}

export default Landing;
