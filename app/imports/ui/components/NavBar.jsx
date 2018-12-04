import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#043565' };
    return (
      <Menu style={menuStyle} attached="top" inverted>
        {this.props.currentUser ? (
          <Menu.Item as={NavLink} activeClassName="" exact to="/list">
            <Header inverted as='h1'>eventr</Header>
          </Menu.Item>) : (
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>eventr</Header>
          </Menu.Item>)}
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} activeClassName="active" exact to="/add" key='add'>Create an Event</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/mylist" key='list'>My Events</Menu.Item>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/list" key='list'>Public Events</Menu.Item>]
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
            <Dropdown text="Login" pointing="top right">
              <Dropdown.Menu>
                <Dropdown.Item text="Sign In" as={NavLink} exact to="/signin"/>
                <Dropdown.Item text="Sign Up" as={NavLink} exact to="/signup"/>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Dropdown text={this.props.currentUser} pointing="top right">
              <Dropdown.Menu>
                <Dropdown.Item text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
