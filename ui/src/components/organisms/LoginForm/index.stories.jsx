import React from 'react';
import { createDecoratedForm } from '~/components/story_utils';
import { Form } from '.';

export default stories => stories
  .add('default', () => {
    const LoginForm = createDecoratedForm('login', Form);
    return <LoginForm />;
  })
  .add('ログイン失敗', () => {
    const LoginForm = createDecoratedForm('login', Form, { submitFailed: true, error: { _error: 'error' } });
    return <LoginForm />;
  });
