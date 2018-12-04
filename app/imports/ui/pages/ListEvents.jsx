import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Events } from '/imports/api/events/events';
import EventItem from '/imports/ui/components/EventItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


/** Renders a table containing all of the Stuff documents. Use <EventItem> to render each row. */
class ListEvents extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h1" textAlign="center">List of Events</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Creator</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Visibility</Table.HeaderCell>
                <Table.HeaderCell>Edit</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.events.map((stuff) => <EventItem key={stuff._id} stuff={stuff} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListEvents.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Events');
  return {
    events: Events.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListEvents);
