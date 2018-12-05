import React from 'react';
import { Container, Loader, Header, Table } from 'semantic-ui-react';
import { Events } from '/imports/api/events/events';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

class ShareEvent extends React.Component {



  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  renderPage() {
    return (
      <Container>
        {Meteor.user() && this.props.doc.owner===Meteor.user().username?
          (<Header as="h1" textAlign="center">Copy the url to share {this.props.doc.name} with others!</Header>):
          (<Header as="h1" textAlign="center">Congratulations on being invited to {this.props.doc.name}!</Header>)
        }
        <Table celled textAlign="center" verticalAlign="middle">
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Event Information</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell>
                Event Name
              </Table.Cell>
              <Table.Cell>
              {this.props.doc.name}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Event Address
              </Table.Cell>
              <Table.Cell>
              <a href={'https://maps.google.com/?q=' + this.props.doc.address}>{this.props.doc.address}</a>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Event Date
              </Table.Cell>
              <Table.Cell>
              {this.props.doc.date.toString().slice(0, 25)}
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                Event Owner
              </Table.Cell>
              <Table.Cell>
              {this.props.doc.owner}
              </Table.Cell>
            </Table.Row>
          </Table.Body>        
        </Table>
      </Container>
    );
  }
}
ShareEvent.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};
export default withTracker(({ match }) => {
  const documentId = match.params._id;
  const subscription = Meteor.subscribe('PublicEvents');
  return {
    doc: Events.findOne(documentId),
    ready: subscription.ready(),
  };
})(ShareEvent);
