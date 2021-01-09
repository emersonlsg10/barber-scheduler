import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import {
  Creators as SchedulesListDetailsCreators,
  Types as SchedulesListTypes,
} from 'appStore/ducks/schedules/list';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getSchedulesList({ payload }) {
  try {
    const { date } = payload;
    const { redirect } = yield select(state => state.login);
    const request = call(api.get, `api/v1/schedules/${redirect}?date=${date}`);
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield put(SchedulesListDetailsCreators.getSuccess(response.data));
  } catch (err) {
    yield interceptError(SchedulesListDetailsCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(SchedulesListTypes.GET_REQUEST, getSchedulesList)]);
}
