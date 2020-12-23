import { call, put, all, takeLatest, delay } from 'redux-saga/effects';
import Router from 'next/router';
// import { Creators as ProfileCreators } from 'appStore/ducks/perfil';
import { setCookie, removeCookie } from 'utils/cookie';
import { Creators as AuthCreators } from 'appStore/ducks/auth';
import {
  Creators as LoginCreators,
  Types as LoginTypes,
} from 'appStore/ducks/login';
import api from 'services/api';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';
// import Notifications from 'react-notification-system-redux';

function* getLogin({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, 'api/v1/login', {
      uid: email,
      password,
      grant_type: 'password',
    });
    yield interceptResponse(response);

    const { data } = response;
    yield call(setCookie, 'auth', data.token);
    yield delay(500);
    yield put(LoginCreators.getLoginSuccess());
    yield call(Router.push, { pathname: '/' });
  } catch (err) {
    yield interceptError(LoginCreators.getLoginFailure, err);
  }
}

function* getLogout() {
  yield call(removeCookie, 'auth');
  yield call(Router.push, {
    pathname: '/',
  });
  yield put(AuthCreators.getLogoutSuccess());
}

export default function* AuthSagas() {
  yield all([
    takeLatest(LoginTypes.GET_REQUEST, getLogin),
    takeLatest(LoginTypes.GET_LOGOUT_REQUEST, getLogout),
  ]);
}
