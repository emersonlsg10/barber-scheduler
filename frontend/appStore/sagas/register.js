import { call, put, all, takeLatest, delay } from 'redux-saga/effects';
import {
  Creators as RegisterUserCreators,
  Types as RegisterUserTypes,
} from 'appStore/ducks/register';
import api from 'services/api';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getRegister({ payload }) {
  try {
    const { username, email, phone, cpf, city, state, password } = payload;
    const response = yield call(api.post, 'api/v1/register', {
      username,
      email,
      phone,
      cpf,
      city,
      state,
      password,
    });
    yield interceptResponse(response);
    yield delay(1000);
    yield put(RegisterUserCreators.getSuccess(response.data));
    // yield call(Router.push, { pathname: '/login' });
  } catch (err) {
    yield interceptError(RegisterUserCreators.getFailure, err);
    // yield put(alert(err.data.msg));
  }
}

export default function* () {
  yield all([takeLatest(RegisterUserTypes.GET_REQUEST, getRegister)]);
}
