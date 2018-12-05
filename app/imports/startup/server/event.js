import { Meteor } from 'meteor/meteor';
import { Events } from '../../api/events/events.js';


/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('PublicEvents', function publish() {
    return Events.find({ visibility: 'public' });
});
Meteor.publish('PrivateEvents', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Events.find({ owner: username });
  }
  return this.ready();
});
