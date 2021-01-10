import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  Creators as ServicesListCreators,
  Types as ServicesListTypes,
} from 'appStore/ducks/services/list';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getServicesList(payload) {
  try {
    const { slug } = payload;
    const request = call(api.get, `api/v1/services/${slug}`);
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
