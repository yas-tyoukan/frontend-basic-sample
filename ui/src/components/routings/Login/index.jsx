import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router';
import Login from '~/components/pages/Login';

export default () => (
  <Switch>
    <Redirect exact from="/" to="/login" />
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/password-reminder">
      <div>id:user1/pass:p</div>
    </Route>
    <Redirect from="*" to="/login" />
  </Switch>
);
