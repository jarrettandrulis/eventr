import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Events } from '../../api/events/events.js';


/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('PublicEvents', function publish() {
  if (this.userId) {
    return Events.find({ visibility: 'public' });
  }
  return this.ready();
});
Meteor.publish('PrivateEvents', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Events.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Events.find();
  }
  return this.ready();
});
