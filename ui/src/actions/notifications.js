import axios from 'axios';
import {
  RECEIVE_NOTIFICATIONS,
  REQUEST_NOTIFICATIONS,
  REQUEST_NOTIFICATIONS_FAILED,
} from '../actionTypes/app';

export const requestNotifications = () => ({
  type: REQUEST_NOTIFICATIONS,
});

export const requestNotificationsFailed = error => ({
  type: REQUEST_NOTIFICATIONS_FAILED,
  error,
});

export const recieveNotifications = data => ({
  type: RECEIVE_NOTIFICATIONS,
  data,
});

export const getNotifications = () => (dispatch) => {
  dispatch(requestNotifications());
  axios.get('/api/notifications')
    .then(({ data }) => dispatch(recieveNotifications(data)))
    .catch(error => dispatch(requestNotificationsFailed(error)));
};
