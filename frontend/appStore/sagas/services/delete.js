import { call, put, all, takeLatest, select } from 'redux-saga/effects';
import {
  Creators as ServicesDeleteCreators,
  Types as ServicesDeleteTypes,
} from 'appStore/ducks/services/delete';
import { Creators as ServicesListCreators } from 'appStore/ducks/services/list';
import Notifications from 'react-notification-system-redux';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getServicesDelete({ payload }) {
  try {
    const { id } = payload;
    const request = call(api.delete, `api/v1/services/${id}`);
    const response = yield callApi(request);
    yield interceptResponse(response);
    const { data: servicesList, total } = yield select(
      state => state.services.list
    );
    yield put(
      ServicesListCreators.getSuccess({
        data: { data: [...servicesList?.data.filter(item => item.id !== id)] },
        total: total - 1,
      })
    );
    yield put(Notifications.success({ title: response.data.msg }));
  } catch (err) {
    yield interceptError(ServicesDeleteCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(ServicesDeleteTypes.GET_REQUEST, getServicesDelete)]);
}
