/* eslint-disable prefer-template */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

class EventItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.event.name}</Table.Cell>
          <Table.Cell>{this.props.event.owner}</Table.Cell>
          <Table.Cell>
            <a href={'https://maps.google.com/?q=' + this.props.event.address}>{this.props.event.address}</a>
          </Table.Cell>
          <Table.Cell>{this.props.event.date.toString().slice(0, 25)}</Table.Cell>
          <Table.Cell>{this.props.event.visibility}</Table.Cell>
          <Table.Cell>
            {this.props.event.owner === Meteor.user().username ?
            (<Link to={`/edit/${this.props.event._id}`}>Edit</Link>) :
            (<p>Cannot Edit</p>) }
          </Table.Cell>
        </Table.Row>
    );
  }
}
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};
export default withRouter(EventItem);
