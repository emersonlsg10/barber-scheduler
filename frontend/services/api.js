import { create } from 'apisauce';
import appUtils from 'utils/appUtils';

const apiUrl = {
  hml: 'https://reqres.in/api',
  prod: 'https://reqres.in/api',
};

const api = create({
  baseURL: appUtils.isDev ? apiUrl.hml : apiUrl.prod,
  headers: {
    Authorization: '',
  },
});

export default api;
