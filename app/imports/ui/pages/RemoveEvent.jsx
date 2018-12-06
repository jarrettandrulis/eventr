import React from 'react';
import { Loader } from 'semantic-ui-react';
import { Events } from '/imports/api/events/events';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class Remove extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    Events.remove(this.props.doc._id);
    return (<Redirect to="/events"/>);
  }
}
Remove.propTypes = {
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
})(Remove);
