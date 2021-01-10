/* eslint-disable no-unused-vars */
import { call, put, all, takeEvery, delay } from 'redux-saga/effects';
import {
  Creators as SchedulesCreateCreators,
  Types as SchedulesCreateTypes,
} from 'appStore/ducks/schedules/create';
import Notifications from 'react-notification-system-redux';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getSchedulesCreate({ payload }) {
  try {
    const { date, schedule, service_id, company_id } = payload;

    const { total_time } = service_id.reduce((a, b) => ({
      total_time: a.time + b.time,
    }));

    const { total_value } = service_id.reduce((a, b) => ({
      total_value: a.price + b.price,
    }));

    const request = call(api.post, `api/v1/schedules`, {
      date,
      schedule,
      total_time,
      total_value,
      service_id,
      company_id,
    });
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield delay(1000);
    yield put(SchedulesCreateCreators.getSuccess(response.data));
    yield put(Notifications.success({ title: response.data.msg }));
  } catch (err) {
    yield interceptError(SchedulesCreateCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeEvery(SchedulesCreateTypes.GET_REQUEST, getSchedulesCreate)]);
}
