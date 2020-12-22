import { call, put, all, takeLatest } from 'redux-saga/effects';
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
  console.log({ payload });
  try {
    const { email, password } = payload;
    const response = yield call(api.post, '/login', {
      email,
      password,
    });
    yield interceptResponse(response);

    const { data } = response;
    yield call(setCookie, 'auth', data.token);
    yield put(LoginCreators.getLoginSuccess());
    // yield put(
    //   Notifications.success({ title: 'Autenticado com sucesso', message: 'Redirecionando...' })
    // );
    yield call(Router.push, { pathname: '/dashboard' });
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
