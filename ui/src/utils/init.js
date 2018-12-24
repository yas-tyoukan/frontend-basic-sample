import axios from 'axios';

import { ajaxError } from '~/actions/common';

/**
 * 初期設定
 * @param {Function} dispatch dispatch関数
 */
export default (dispatch) => {
  /* ---------- axiosの設定 ---------- */
  axios.defaults.responseType = 'json';
  axios.interceptors.request.use((config) => {
    if (!(config.data && config.data.headers && config.data.headers['csrf-token'])) {
      // すでに設定されている場合をのぞいて、csrf-tokenをmetaタグから取得して設定する
      // eslint-disable-next-line no-param-reassign
      config.headers['csrf-token'] = document.querySelector('meta[name=csrf-token]').getAttribute('content');
    }
    return config;
  });
  // 共通のエラーハンドラ定義
  axios.interceptors.response.use(
    res => res,
    (error) => {
      dispatch(ajaxError(error));
      return Promise.reject(error);
    },
  );
};
