import React from 'react';
import PropTypes from 'prop-types';

const NotificationsList = ({ loading, notifications }) => (
  <div className="o_notifications-list">
    {loading
      ? '取得中…'
      : notifications.map(({ id, date, message }) => (
        <div key={id}>
          <span>{date}</span>
          <span>{message}</span>
        </div>
      ))}
  </div>
);

NotificationsList.propTypes = {
  loading: PropTypes.bool,
  notifications: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })),
};

NotificationsList.defaultProps = {
  loading: false,
  notifications: [],
};

export default NotificationsList;
