import { call, put, all, takeLatest, delay, select } from 'redux-saga/effects';
import Router from 'next/router';
// import { Creators as ProfileCreators } from 'appStore/ducks/perfil';
import { Creators as AuthCreators } from 'appStore/ducks/auth';
import {
  Creators as LoginCreators,
  Types as LoginTypes,
} from 'appStore/ducks/login';
import api from 'services/api';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';
import { setCookie } from 'utils/cookie';
// import Notifications from 'react-notification-system-redux';

function* getLogin({ payload }) {
  try {
    const { redirect } = yield select(state => state.login);
    const { email, password, route } = payload;
    yield call(api.setHeader, 'Authorization', '');
    const response = yield call(api.post, 'api/v1/login', {
      uid: email,
      password,
      grant_type: 'password',
    });
    yield interceptResponse(response);
    yield call(setCookie, 'token', response.data.token);
    yield call(setCookie, 'refreshToken', response.data.refreshToken);
    yield put(AuthCreators.getSuccess(response.data));
    yield delay(1000);
    yield put(LoginCreators.getLoginSuccess());
    if (!route) {
      yield call(Router.replace, { pathname: `/${redirect}` });
    } else {
      yield delay(1000);
      yield window.location.assign(route);
    }
  } catch (err) {
    console.log(err);
    yield interceptError(LoginCreators.getLoginFailure, err);
  }
}

function* getLoginRedirect() {
  try {
    yield call(Router.replace, { pathname: `/login` });
  } catch (err) {
    console.log(err);
    yield interceptError(LoginCreators.getLoginFailure, err);
  }
}

export default function* () {
  yield all([
    takeLatest(LoginTypes.GET_REQUEST, getLogin),
    takeLatest(LoginTypes.GET_REQUEST, getLoginRedirect),
  ]);
}
