import { call, put, all, takeLatest, select, delay } from 'redux-saga/effects';
import {
  Creators as ServicesCreateCreators,
  Types as ServicesCreateTypes,
} from 'appStore/ducks/services/create';
import { Creators as ServicesListCreators } from 'appStore/ducks/services/list';
import api from 'services/api';
import Notifications from 'react-notification-system-redux';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getServicesCreate({ payload }) {
  try {
    const { name, price, time } = payload;
    const request = call(api.post, `api/v1/services`, {
      name,
      price,
      time: time.id,
    });
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield delay(1000);
    const { data: servicesList, total } = yield select(
      state => state.services.list
    );
    yield put(
      ServicesListCreators.getSuccess({
        data: { data: [...servicesList?.data, response.data.data] },
        total: total + 1,
      })
    );
    yield put(ServicesCreateCreators.getSuccess(response.data));
    yield put(Notifications.success({ title: response.data.msg }));
  } catch (err) {
    yield interceptError(ServicesCreateCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(ServicesCreateTypes.GET_REQUEST, getServicesCreate)]);
}
