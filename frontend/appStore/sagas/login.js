import { call, put, all, takeLatest, delay } from 'redux-saga/effects';
import Router from 'next/router';
// import { Creators as ProfileCreators } from 'appStore/ducks/perfil';
import { Creators as UserCreators } from 'appStore/ducks/user/details';
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
    const { email, password, route } = payload;
    yield call(
      api.setHeader,
      'Authorization',
      'ZWFkY3Vyc291c2VyOmVhZGN1cnNvcGFzc3dvcmQ='
    );
    const response = yield call(api.post, 'api/v1/login', {
      uid: email,
      password,
      grant_type: 'password',
    });
    yield interceptResponse(response);
    yield call(setCookie, 'access_token', response.data.token);
    yield call(setCookie, 'refresh_token', response.data.refreshToken);
    yield put(AuthCreators.getSuccess(response.data));
    yield put(UserCreators.getRequest());
    yield delay(1000);
    yield put(LoginCreators.getLoginSuccess());
    if (!route) {
      yield call(Router.replace, { pathname: '/' });
    } else {
      yield delay(1000);
      yield window.location.assign(route);
    }
  } catch (err) {
    console.log(err);
    yield interceptError(LoginCreators.getLoginFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(LoginTypes.GET_REQUEST, getLogin)]);
}
