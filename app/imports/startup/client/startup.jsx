import React from 'react';
import { render } from 'react-dom';
import { Meteor } from 'meteor/meteor';
import App from '../../ui/layouts/App.jsx';

// This page is finished -> just need to startup the app

Meteor.startup(() => {
  // eslint-disable-next-line no-undef
  render(<App />, document.getElementById('root'));
});
