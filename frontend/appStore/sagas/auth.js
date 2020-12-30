import {
  call,
  put,
  all,
  takeLatest,
  select,
  take,
  throttle,
} from 'redux-saga/effects';
import Router from 'next/router';

// import { Creators as ProfileCreators } from '../ducks/perfil';
import { removeCookie, setCookie } from 'utils/cookie';
import { Creators as AuthCreators, Types as AuthTypes } from '../ducks/auth';
import { Creators as UserCreators } from '../ducks/user/details';
import api from 'services/api';
import interceptResponse from 'services/interceptResponse';

function* getLogout() {
  yield call(removeCookie, 'token');
  yield call(removeCookie, 'refreshToken');
  yield call(Router.push, { pathname: '/login' });
  yield put(AuthCreators.getLogoutSuccess());
  yield put(UserCreators.getReset());
}

export function* callApi(apiCall, trowError = true) {
  const response = yield apiCall;
  const successRequest = yield call(interceptResponse, response, false);
  if (successRequest) {
    return response;
  }
  if (response.status === 401 || response.status === 422) {
    yield put(AuthCreators.getLoginRefreshTokenRequest());
    const action = yield take([
      AuthTypes.GET_REFRESH_TOKEN_SUCCESS,
      AuthTypes.GET_REFRESH_TOKEN_FAILURE,
    ]);
    if (action.type === AuthTypes.GET_REFRESH_TOKEN_FAILURE && trowError) {
      yield put(AuthCreators.getLogoutRequest());
      return;
    }
    const responseTakeTwo = yield apiCall;
    return responseTakeTwo;
  }
  throw response;
}

function* getRefreshToken() {
  const { refreshToken } = yield select(state => state.auth);
  try {
    yield call(api.setHeader, 'Authorization', `Bearer ${refreshToken}`);
    const response = yield call(api.post, 'api/v1/oauth/refresh', {
      refresh_token: refreshToken,
    });
    if (response.status !== 200) throw response;
    yield call(api.setHeader, 'Authorization', `Bearer ${response.data.token}`);
    yield call(setCookie, 'token', response.data.token);
    yield call(setCookie, 'refreshToken', response.data.refreshToken);
    yield put(AuthCreators.getLoginRefreshTokenSuccess(response.data));
  } catch (e) {
    if (e.status === 401) {
      yield put(AuthCreators.getLoginRefreshTokenFailure());
    }
  }
}

export default function* () {
  yield all([
    takeLatest(AuthTypes.GET_LOGOUT_REQUEST, getLogout),
    throttle(1000, AuthTypes.GET_REFRESH_TOKEN_REQUEST, getRefreshToken),
  ]);
}
