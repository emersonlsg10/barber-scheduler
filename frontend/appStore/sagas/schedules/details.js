import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  Creators as SchedulesDetailsCreators,
  Types as SchedulesDetailsTypes,
} from 'appStore/ducks/schedules/details';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getSchedulesList({ payload }) {
  try {
    const { date, schedule, slug } = payload;
    const request = call(
      api.get,
      `api/v1/schedules/${slug}?date=${date}&schedule=${schedule}`
    );
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield put(SchedulesDetailsCreators.getSuccess(response.data));
  } catch (err) {
    yield interceptError(SchedulesDetailsCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(SchedulesDetailsTypes.GET_REQUEST, getSchedulesList)]);
}
