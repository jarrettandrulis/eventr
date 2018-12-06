/* eslint-disable react/jsx-key */
/* eslint-disable prefer-template */
import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Events } from '/imports/api/events/events';

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
            (<Link to={`/edit/${this.props.event._id}`}><Button color="blue">Edit</Button></Link>) :
            (<p>Cannot Edit</p>) }
            {this.props.event.visibility === 'public' ?
            ([<Link to={`/share/${this.props.event._id}`}><Button color="green">Share</Button></Link>]) :
            ('')}
            <Link to={`/remove/${this.props.event._id}`}><Button color="red">Remove</Button></Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}
EventItem.propTypes = {
  event: PropTypes.object.isRequired,
};
export default withRouter(EventItem);
