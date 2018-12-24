import React from 'react';

import LoginForm from '~/components/organisms/LoginForm';
import CenteringTemplate from '~/components/templates/CenteringTemplate';
import PropTypes from 'prop-types';
import submitLogin from '~/form/submit/login';

export default class Login extends React.PureComponent {
  static propTypes = {
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    onSubmit: submitLogin,
  };

  constructor() {
    super();
    this.onSubmit = ::this.onSubmit;
  }

  onSubmit(values) {
    const { onSubmit } = this.props;
    if (onSubmit) {
      return onSubmit(values);
    }
    return null;
  }

  render() {
    const contentsEl = (
      <>
        <h1>ログイン</h1>
        <LoginForm
          onSubmit={this.onSubmit}
          onSubmitSucceed={this.onSubmitSucceed}
        />
      </>
    );
    return (
      <CenteringTemplate
        vertical
        horizontal
        className="p_login"
        contents={contentsEl}
      />
    );
  }
}
