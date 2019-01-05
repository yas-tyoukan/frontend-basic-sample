import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';

import Wrapper from '~/components/routings/Wrapper';
import * as rootReducer from '~/reducers/app';
import App from '~/components/routings/App';

ReactDOM.render(
  <Wrapper rootReducer={rootReducer}>
    <App />
  </Wrapper>,
  document.getElementById('root'),
);
