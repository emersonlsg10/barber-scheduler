import { create } from 'apisauce';
import appUtils from 'utils/appUtils';

const apiUrl = {
  hml: 'http://127.0.0.1:3333/',
  prod: 'http://127.0.0.1:3333/',
};

const api = create({
  baseURL: appUtils.isDev ? apiUrl.hml : apiUrl.prod,
  headers: {
    Authorization: '',
  },
});

export default api;
