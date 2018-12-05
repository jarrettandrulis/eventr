import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Header, Modal, Grid, Segment } from 'semantic-ui-react';
import { Events, EventSchema } from '/imports/api/events/events';
import AutoForm from 'uniforms-semantic/AutoForm';
import TextField from 'uniforms-semantic/TextField';
import SelectField from 'uniforms-semantic/SelectField';
import DateField from 'uniforms-semantic/DateField';
import SubmitField from 'uniforms-semantic/SubmitField';
import HiddenField from 'uniforms-semantic/HiddenField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import { Bert } from 'meteor/themeteorchef:bert';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '10px', backgroundColor: '#043565' };
    return (
      <Menu style={menuStyle} attached="top" inverted>
        {this.props.currentUser ? (
          <Menu.Item as={NavLink} activeClassName="" exact to="/events">
            <Header inverted as='h1'>eventr</Header>
          </Menu.Item>) : (
          <Menu.Item as={NavLink} activeClassName="" exact to="/">
            <Header inverted as='h1'>eventr</Header>
          </Menu.Item>)}
        {this.props.currentUser ? (
            [<MyModal activeClassName="active" exact to="/events" key='events'/>,
              <Menu.Item as={NavLink} activeClassName="active" exact to="/events" key='events'>My Events</Menu.Item>,
              ]
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


class MyModal extends React.Component {
    state = { modalOpen: false };

    handleClose = () => this.setState({ modalOpen: false });

    handleOpen = () => this.setState({ modalOpen: true });

    constructor(props) {
      super(props);
      this.submit = this.submit.bind(this);
      this.insertCallback = this.insertCallback.bind(this);
      this.formRef = null;
    }

    insertCallback(error) {
      if (error) {
        Bert.alert({ type: 'danger', message: `Add failed: ${error.message}` });
      } else {
        Bert.alert({ type: 'success', message: 'Add succeeded' });
        this.formRef.reset();
        this.handleClose();
      }
    }

    /** On submit, insert the data. */
    submit(data) {
      const { name, address, date, visibility } = data;
      const owner = Meteor.user().username;
      Events.insert({ name, address, date, visibility, owner }, this.insertCallback);
    }

  render() {
    return (
      <Modal trigger={<Menu.Item
                        activeClassName="active"
                        exact to="/add"
                        key='add'
                        onClick={this.handleOpen}>
                        Create an Event
                      </Menu.Item>}
      open={this.state.modalOpen}
      onClose={this.handleClose}
      >
      <Modal.Header>Create an Event</Modal.Header>
      <Modal.Content>
        <Grid container centered>
            <Grid.Column>
              <Header as="h2" textAlign="center">Add a New Event</Header>
              <AutoForm ref={(ref) => { this.formRef = ref; }} schema={EventSchema} onSubmit={this.submit}>
                <Segment>
                  <TextField name='name'/>
                  <TextField name='address'/>
                  <DateField name='date' />
                  <SelectField name='visibility'/>
                  <SubmitField value='Submit'/>
                  <ErrorsField/>
                  <HiddenField name='owner' value='fakeuser@foo.com'/>
                </Segment>
              </AutoForm>
            </Grid.Column>
          </Grid>
      </Modal.Content>
    </Modal>
    );
  }
}
NavBar.propTypes = {
  currentUser: PropTypes.string,
};

const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

export default withRouter(NavBarContainer);
