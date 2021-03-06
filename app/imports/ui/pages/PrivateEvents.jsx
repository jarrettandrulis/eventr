import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { Events } from '/imports/api/events/events';
import EventItem from '/imports/ui/components/EventItem';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';


class ListEvents extends React.Component {

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
        <Container>
          <Header as="h1" textAlign="center">My Events</Header>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
                <Table.HeaderCell>Creator</Table.HeaderCell>
                <Table.HeaderCell>Address</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Visibility</Table.HeaderCell>
                <Table.HeaderCell>Options</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.events.map((event) => <EventItem key={event._id} event={event} />)}
            </Table.Body>
          </Table>
        </Container>
    );
  }
}

ListEvents.propTypes = {
  events: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

export default withTracker(() => {
  const subscription = Meteor.subscribe('PrivateEvents');
  return {
    events: Events.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListEvents);
