import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  Creators as UserDetailsCreators,
  Types as UserDetailsTypes,
} from 'appStore/ducks/user/details';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getUserDetails() {
  try {
    const request = call(api.get, `api/v1/user`);
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield put(UserDetailsCreators.getSuccess(response.data));
  } catch (err) {
    yield interceptError(UserDetailsCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(UserDetailsTypes.GET_REQUEST, getUserDetails)]);
}
