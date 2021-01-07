import { call, put, all, takeLatest } from 'redux-saga/effects';
import {
  Creators as CompanyDetailsCreators,
  Types as CompanyDetailsTypes,
} from 'appStore/ducks/company/details';
import api from 'services/api';
import { callApi } from 'appStore/sagas/auth';
import interceptResponse from 'services/interceptResponse';
import interceptError from 'services/interceptError';

function* getCompanyDetails({ payload }) {
  try {
    const { slug } = payload;
    const request = call(api.get, `api/v1/company/${slug}`);
    const response = yield callApi(request);
    yield interceptResponse(response);
    yield put(CompanyDetailsCreators.getSuccess(response.data));
  } catch (err) {
    yield interceptError(CompanyDetailsCreators.getFailure, err);
  }
}

export default function* () {
  yield all([takeLatest(CompanyDetailsTypes.GET_REQUEST, getCompanyDetails)]);
}
