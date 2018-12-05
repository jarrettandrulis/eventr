import React from 'react';
import { Grid, Loader, Header, Segment } from 'semantic-ui-react';
import { Events, EventSchema } from '/imports/api/events/events';
import { Bert } from 'meteor/themeteorchef:bert';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import DateField from 'uniforms-semantic/DateField';
import SelectField from 'uniforms-semantic/SelectField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class ChangeEvent extends React.Component {

  submit(data) {
    const { name, address, date, visibility, _id } = data;
    Events.update(_id, { $set: { name, address, date, visibility } }, (error) => (error ?
        Bert.alert({ type: 'danger', message: `Update failed: ${error.message}` }) :
        Bert.alert({ type: 'success', message: 'Update succeeded' })));
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Grid container centered>
          <Grid.Column>
            <Header as="h2" textAlign="center">Edit Stuff</Header>
            <AutoForm schema={EventSchema} onSubmit={this.submit} model={this.props.doc}>
              <Segment>
                <TextField name='name'/>
                <TextField name='address'/>
                <DateField name='date' />
                <SelectField name='visibility'/>
                <SubmitField value='Submit'/>
                <ErrorsField/>
                <HiddenField name='owner' />
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
    );
  }
}
ChangeEvent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('PrivateEvents');
  return {
    doc: Events.findOne(documentId),
    ready: subscription.ready(),
  };
})(ChangeEvent);
