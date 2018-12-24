import axios from 'axios';
import { SubmissionError } from 'redux-form';

export default function onSubmit(values) {
  // CSRF対策トークンを取得してからログインのPOSTを行う
  return axios.get('/csrf-token')
    .then((res) => {
      document.querySelector('meta[name=csrf-token]').setAttribute('content', res.data.token);
    })
    .then(() => axios.post('/api/login', values))
    .catch(() => {
      throw new SubmissionError({ _error: 'authenticated failure' });
    });
}
