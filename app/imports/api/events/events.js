import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

const Events = new Mongo.Collection('Events');

const EventSchema = new SimpleSchema({
  name: String,
  owner: String,
  date: Date,
  address: String,
  visibility: {
    type: String,
    allowedValues: ['private', 'public'],
    defaultValue: 'private',
  },
}, { tracker: Tracker });

Events.attachSchema(EventSchema);

export { Events, EventSchema };
