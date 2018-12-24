import React from 'react';
import {
  addDecorator,
  configure,
  storiesOf,
} from '@storybook/react';
import {
  combineReducers,
  createStore,
} from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import { MuiThemeProvider } from '@material-ui/core';
import theme from '../src/styles/theme';
import '../src/styles/main.less';

const store = createStore(combineReducers({ form: formReducer }), { form: {} });
const ProviderDecorator = storyFn => <Provider store={store}>{storyFn()}</Provider>;
const MuiThemeDecorator = storyFn => (
  <MuiThemeProvider theme={theme}>{storyFn()}</MuiThemeProvider>
);

// automatically import all files ending in *.stories.js or *.stories.jsx
const context = require.context('../src/components', true, /\.stories.jsx?$/);

function getDirs(path) {
  return path.replace(/..?\//, '').split('/').reverse().slice(1).reverse();
}

function loadStories() {
  addDecorator(ProviderDecorator);
  addDecorator(MuiThemeDecorator);
  context.keys().sort().forEach((c) => {
    const dirs = getDirs(c);

    if (!dirs.length) return;

    const stories = storiesOf(dirs.join('/'), module);
    context(c).default(stories);
  });
}

configure(loadStories, module);
