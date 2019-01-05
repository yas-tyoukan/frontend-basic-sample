import axios from 'axios';
import {
  RECEIVE_USER,
  REQUEST_USER,
  REQUEST_USER_FAILED,
} from '../actionTypes/app';

export const requestUser = () => ({
  type: REQUEST_USER,
});

export const requestUserFailed = error => ({
  type: REQUEST_USER_FAILED,
  error,
});

export const recieveUser = data => ({
  type: RECEIVE_USER,
  data,
});

export const getUser = () => (dispatch) => {
  dispatch(requestUser());
  axios.get('/api/users/me')
    .then(({ data }) => dispatch(recieveUser(data)))
    .catch(error => dispatch(requestUserFailed(error)));
};
