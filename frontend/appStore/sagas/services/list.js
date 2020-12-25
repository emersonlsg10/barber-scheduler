import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  Creators as ServicesListCreators,
  Types as ServicesListTypes,
} from 'appStore/ducks/services/list';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getServicesList() {
  try {
    const request = call(api.get, `api/v1/services`);
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield put(ServicesListCreators.getSuccess(response.data));
  } catch (err) {
    yield interceptError(ServicesListCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(ServicesListTypes.GET_REQUEST, getServicesList)]);
}
