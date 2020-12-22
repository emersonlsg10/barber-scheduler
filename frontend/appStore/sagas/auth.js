import { call, put, all, takeLatest, select, take } from 'redux-saga/effects';
import Router from 'next/router';

// import { Creators as ProfileCreators } from '../ducks/perfil';
import { setCookie, removeCookie } from 'utils/cookie';
import { Creators as AuthCreators, Types as AuthTypes } from '../ducks/auth';
import api from 'services/api';
import interceptResponse from 'services/interceptResponse';

function* setToken() {
  const { token } = yield select(state => state.auth);
  yield call(api.setHeader, 'Authorization', token);
  api.setHeader('Authorization', token);
}

function* getLogin({ payload }) {
  try {
    const { login, senha } = payload;
    const response = yield call(api.post, '/usuario/autenticar', {
      login,
      senha,
      // uniqueId: DeviceInfo.getUniqueID(),
    });
    yield interceptResponse(response);

    const { data } = response;
    yield call(setCookie, 'auth', data.token);
    yield put(
      AuthCreators.getLoginSuccess({
        funcionario: data.funcionario,
        token: data.token,
      })
    );
    yield setToken();
    yield call(Router.push, {
      pathname: '/dashboard',
    });
  } catch (err) {
    yield apiUtils.sagaInterceptError(AuthCreators.getLoginFailure, err);
  }
}

function* getLogout() {
  yield call(removeCookie, 'auth');
  yield call(Router.push, {
    pathname: '/',
  });
  yield put(AuthCreators.getLogoutSuccess());
}

export function* callApi(apiCall) {
  const response = yield apiCall;
  if (response.status === 201 || response.status === 200) {
    return response;
  }
  if (response.status === 401) {
    yield put(AuthCreators.getLoginRefreshTokenRequest());
    const action = yield take([
      AuthTypes.GET_REFRESH_TOKEN_SUCCESS,
      AuthTypes.GET_REFRESH_TOKEN_FAILURE,
    ]);
    if (action.type === AuthTypes.GET_REFRESH_TOKEN_FAILURE) {
      throw response;
    }
    const responseTakeTwo = yield apiCall;
    return responseTakeTwo;
  }
  throw response;
}

function* getRefreshToken() {
  const {
    auth: {
      data: { refresh_token },
    },
  } = yield select();
  try {
    yield call(api.setHeader, 'Authorization', `Bearer ${refresh_token}`);
    const response = yield call(api.post, '/oauth/refresh');
    if (response.status !== 200) throw response;
    yield call(
      api.setHeader,
      'Authorization',
      `Bearer ${response.data.access_token}`
    );
    yield call(
      api.setHeader,
      'Authorization',
      `Bearer ${response.data.access_token}`
    );
    yield put(AuthCreators.getLoginRefreshTokenSuccess(response.data));
  } catch (e) {
    if (e.status === 401) {
      yield put(AuthCreators.getLoginRefreshTokenFailure());
    }
  }
}

export default function* () {
  yield all([
    takeLatest(AuthTypes.GET_REQUEST, getLogin),
    takeLatest(AuthTypes.GET_LOGOUT_REQUEST, getLogout),
    takeLatest(AuthTypes.GET_REFRESH_TOKEN_REQUEST, getRefreshToken),
  ]);
}
