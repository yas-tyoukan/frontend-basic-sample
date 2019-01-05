import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getNotifications as getNotificationsAction } from '~/actions/notifications';
import { getUser as getUserAction } from '~/actions/users';
import Header from '~/components/organisms/Header';
import NotificationsList from '~/components/organisms/NotificationsList';
import TwoColumnsTemplate from '~/components/templates/TwoColumnsTemplate';

const mapStateToProps = ({ top, user }) => ({ ...top, user });

const mapDispatchToProps = dispatch => ({
  getNotifications() {
    dispatch(getNotificationsAction());
  },
  getUser() {
    dispatch(getUserAction());
  },
});

class TopInner extends React.PureComponent {
  static propTypes = {
    notifications: PropTypes.arrayOf(PropTypes.shape({
      date: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })).isRequired,
    loadingNotifications: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      loading: PropTypes.bool.isRequired,
    }).isRequired,
    getNotifications: PropTypes.func.isRequired,
    getUser: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const {
      loadingNotifications,
      getNotifications,
      user,
      getUser,
    } = this.props;
    if (!loadingNotifications) {
      // load中じゃ無ければお知らせ取得する
      getNotifications();
    }
    if (!user.loading && !user.name) {
      // load中じゃ無いかつユーザー名がないならユーザー取得する
      getUser();
    }
  }

  render() {
    const {
      notifications,
      loadingNotifications,
      user,
      error,
    } = this.props;
    if (error) {
      return <div>エラー</div>;
    }
    const headerEl = <Header />;
    const topContentsEl = (
      <NotificationsList
        loading={loadingNotifications}
        notifications={notifications}
      />
    );
    const bottomContents = user.loading
      ? (
        <p>ようこそ</p>
      )
      : (
        <p>
          ようこそ
          {user.name}
          さん
        </p>
      );
    return (
      <TwoColumnsTemplate
        horizontal
        className="p_top"
        headerContents={headerEl}
        topContents={topContentsEl}
        bottomContents={bottomContents}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TopInner);
