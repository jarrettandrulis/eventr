import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


const defaultAccounts = [
  { email: 'admin@test.com', password: 'changeme' },
  { email: 'jarrett@foo.com', password: 'changeme' },
];

function createUser(email, password) {
  console.log(`  Creating user ${email}.`);
  Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (defaultAccounts) {
    console.log('Creating the default user(s)');
    defaultAccounts.map(({ email, password }) => createUser(email, password));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
