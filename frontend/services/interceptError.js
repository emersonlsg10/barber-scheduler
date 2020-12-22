import { put } from 'redux-saga/effects';
import { type ApiErrorResponse } from 'apisauce';
import appUtils from 'utils/appUtils';

function* interceptError(creator, response: ApiErrorResponse) {
  if (appUtils.isDev) {
    console.log(response);
    console.tron.log(response);
  }
  let message = 'Houve um erro no servidor. Tente novamente em instantes';
  if (response?.data?.msg) {
    message = response.data.msg;
    yield put(creator(response.data.msg)); // dispatch ação específica de error
    return message;
  }
  yield put(creator(message));
  return message;
}

export default interceptError;
