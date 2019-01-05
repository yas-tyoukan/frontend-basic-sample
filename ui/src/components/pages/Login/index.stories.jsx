import React from 'react';
import { action } from '@storybook/addon-actions';
import Login from '.';

export default stories => stories
  .add('default', () => (
    <Login
      onSubmit={action('onSubmit')}
      onSubmitSuccess={action('onSubmitSuccess')}
    />
  ));
