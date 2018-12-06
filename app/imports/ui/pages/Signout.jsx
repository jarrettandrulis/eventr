import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect } from 'react-router-dom';

export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <Redirect to="/landing"/>
    );
  }
}
