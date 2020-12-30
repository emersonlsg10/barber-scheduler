import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  Creators as ServicesCreateCreators,
  Types as ServicesCreateTypes,
} from 'appStore/ducks/services/create';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getServicesCreate({ payload }) {
  try {
    const { name, price, time } = payload;
    const request = call(api.post, `api/v1/services`, {
      name,
      price,
      time,
    });
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield put(ServicesCreateCreators.getSuccess(response.data));
  } catch (err) {
    yield interceptError(ServicesCreateCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(ServicesCreateTypes.GET_REQUEST, getServicesCreate)]);
}
