/* eslint-disable no-unused-vars */
import { call, put, all, takeEvery, delay } from 'redux-saga/effects';
import {
  Creators as SchedulesDeleteCreators,
  Types as SchedulesDeleteTypes,
} from 'appStore/ducks/schedules/delete';
import Notifications from 'react-notification-system-redux';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getScheduleDelete({ payload }) {
  try {
    const { id } = payload;

    const request = call(api.delete, `api/v1/schedules/${id}`);
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield delay(1000);
    yield put(SchedulesDeleteCreators.getSuccess(response.data));
    yield put(Notifications.success({ title: response.data.msg }));
  } catch (err) {
    yield interceptError(SchedulesDeleteCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeEvery(SchedulesDeleteTypes.GET_REQUEST, getScheduleDelete)]);
}
