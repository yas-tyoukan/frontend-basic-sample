import React from 'react';
import PropTypes from 'prop-types';
import {
  Field,
  propTypes as reduxFormPropTypes,
  reduxForm,
} from 'redux-form';
import './style.less';
import validate from '~/form/validates/login';
import TextField from '~/components/atoms/TextField';
import Button from '~/components/atoms/Button';

export const Form = ({
  onSubmit,
  handleSubmit,
  submitFailed,
  submitting,
  error,
}) => (
  <form
    onSubmit={handleSubmit(onSubmit)}
    className="o_login-form"
  >
    {(submitFailed && error)
      ? (
        <div className="error-box">
          <div className="messageWrapper">
            <p className="message">
              ログインIDまたはパスワードが違います。
            </p>
            <p className="message">
              入力内容に誤りがないか ご確認下さい。
            </p>
          </div>
        </div>
      )
      : ''
    }
    <Field
      name="id"
      type="text"
      component={TextField}
      placeholder="ログインID"
      fullWidth
    />
    <Field
      name="password"
      type="password"
      component={TextField}
      placeholder="パスワード"
      fullWidth
    />
    <Button type="submit" size="large" disabled={submitting} fullWidth>
      ログイン
    </Button>
  </form>
);

Form.propTypes = {
  ...reduxFormPropTypes,
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'login',
  validate,
})(Form);
