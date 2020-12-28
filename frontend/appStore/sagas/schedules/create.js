import { call, put, all, takeEvery, delay } from 'redux-saga/effects';
import {
  Creators as SchedulesCreateCreators,
  Types as SchedulesCreateTypes,
} from 'appStore/ducks/schedules/create';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getSchedulesCreate({ payload }) {
  try {
    console.log(payload); return;
    const { date, schedule, service_id } = payload;
    const request = call(api.post, `api/v1/schedules`, {
      date,
      schedule,
      service_id,
    });
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield delay(1000);
    yield put(SchedulesCreateCreators.getSuccess(response.data));
  } catch (err) {
    yield interceptError(SchedulesCreateCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeEvery(SchedulesCreateTypes.GET_REQUEST, getSchedulesCreate)]);
}
