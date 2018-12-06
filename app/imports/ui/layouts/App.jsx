import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import 'semantic-ui-css/semantic.css';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Landing from '../pages/Landing';
import PrivateEvents from '../pages/PrivateEvents';
// import AddEvent from '../pages/AddEvent';
import ChangeEvent from '../pages/ChangeEvent';
import NotFound from '../pages/NotFound';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import Signout from '../pages/Signout';
import ShareEvent from '../pages/ShareEvent';
import Remove from '../pages/RemoveEvent';

class App extends React.Component {
  render() {
    return (
        <Router>
          <div>
            <NavBar/>
            <Switch>
              <Route exact path="/" component={Landing}/>
              <Route path="/signin" component={Signin}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/share/:_id" component={ShareEvent}/>
              <LoggedInRoute path="/events" component={PrivateEvents}/>

              <LoggedInRoute path="/edit/:_id" component={ChangeEvent}/>
              <LoggedInRoute path="/remove/:_id" component={Remove}/>
              <LoggedInRoute path="/signout" component={Signout}/>
              <Route component={NotFound}/>
            </Switch>
          </div>
        </Router>
    );
  }
}
const LoggedInRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (Meteor.userId() ?
          (<Component {...props} />) :
          (<Redirect to={{ pathname: '/signin', state: { from: props.location } }}/>
      ))}
  />
);
LoggedInRoute.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.object,
};

export default App;
