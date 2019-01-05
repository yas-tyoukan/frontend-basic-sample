import {
  RECEIVE_USER,
  REQUEST_USER,
  REQUEST_USER_FAILED,
} from '~/actionTypes/app';

const initialState = {
  name: '',
  loading: false,
  error: false,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case RECEIVE_USER:
      return {
        ...state,
        loading: false,
        name: action.data.name,
        error: false,
      };
    case REQUEST_USER_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return state;
  }
}
