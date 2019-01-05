import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Wrapper from '~/components/routings/Wrapper';
import * as rootReducer from '~/reducers/login';
import Login from '~/components/routings/Login';

ReactDOM.render(
  <Wrapper rootReducer={rootReducer}>
    <Login />
  </Wrapper>,
  document.getElementById('root'),
);
