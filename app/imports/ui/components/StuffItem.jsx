/* eslint-disable prefer-template */
import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class StuffItem extends React.Component {
  render() {
    return (
        <Table.Row>
          <Table.Cell>{this.props.stuff.name}</Table.Cell>
          <Table.Cell>{this.props.stuff.owner}</Table.Cell>
          <Table.Cell>
            <a href={'https://maps.google.com/?q=' + this.props.stuff.address}>{this.props.stuff.address}</a>
          </Table.Cell>
          <Table.Cell>{this.props.stuff.date.toString().slice(0, 20)}</Table.Cell>
          <Table.Cell>{this.props.stuff.visibility}</Table.Cell>
          <Table.Cell>
            <Link to={`/edit/${this.props.stuff._id}`}>Edit</Link>
          </Table.Cell>
        </Table.Row>
    );
  }
}

/** Require a document to be passed to this component. */
StuffItem.propTypes = {
  stuff: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(StuffItem);
