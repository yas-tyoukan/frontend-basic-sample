import { actionTypes } from 'redux-form';

const initialState = {
  error: null,
  succeed: false,
};

export default function login(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_SUBMIT_SUCCEEDED:
      return { ...state, succeed: true };
    case actionTypes.SET_SUBMIT_FAILED:
      return { ...state, error: action.error };
    default:
      return state;
  }
}
