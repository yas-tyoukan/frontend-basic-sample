import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import './style.less';
import { getUser as getUserAction } from '~/actions/users';
import Button from '~/components/atoms/Button';

const mapStateToProps = ({ user }) => user;

const mapDispatchToProps = dispatch => ({
  getUser() {
    dispatch(getUserAction());
  },
});

const onLogout = () => {
  // ログアウトはアクションにしていない。stateの変更など不要なため
  axios.post('/api/logout');
  // ログアウト実行を待たずにログイン画面に遷移
  // SPAの繊維ではなく、リロードさせる
  window.location.href = '/login';
};


class HeaderInner extends React.PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {
      name,
      loading,
      getUser,
    } = this.props;
    if (!loading && !name) {
      // load中じゃ無いかつユーザー名がないならユーザー取得する
      getUser();
    }
  }

  render() {
    const { name } = this.props;
    return (
      <div className="o_header">
        {
          name && (
            <span className="message">
              ようこそ
              {name}
              さん
            </span>
          )
        }
        <Button onClick={onLogout}>ログアウト</Button>
      </div>
    );
  }
}

// withRouterで囲って、コンポーネントないでprops.historyが使用できるようにする
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderInner);
