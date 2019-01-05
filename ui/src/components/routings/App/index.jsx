import React from 'react';
import {
  Redirect,
  Route,
  Switch,
} from 'react-router';
import Top from '~/components/pages/Top';

export default () => (
  <Switch>
    <Redirect exact from="/" to="/top" />
    <Route exact path="/top">
      <Top />
    </Route>
    <Route path="/*">
      <div>NOT FOUND</div>
    </Route>
  </Switch>
);
