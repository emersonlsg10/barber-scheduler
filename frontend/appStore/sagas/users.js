import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  Creators as UsersCreators,
  Types as UsersTypes,
} from 'appStore/ducks/users';
import api from 'services/api';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getUsers({ payload }) {
  try {
    const { page } = payload;
    const response = yield call(api.get, '/users', {
      page,
    });
    yield interceptResponse(response);
    const { data } = response;
    yield put(UsersCreators.getSuccess(data.data));
  } catch (err) {
    yield interceptError(UsersCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(UsersTypes.GET_REQUEST, getUsers)]);
}
