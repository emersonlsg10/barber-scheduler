import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import userDetails from './user/details';
import schedulesList from './schedules/list';
import schedulesDetails from './schedules/details';
import schedulesCreate from './schedules/create';
import schedulesDelete from './schedules/delete';
import servicesList from './services/list';
import servicesDelete from './services/delete';
import servicesCreate from './services/create';
import companyDetails from './company/details';
import login from './login';
import register from './register';

function* rootSaga() {
  yield all([
    fork(auth),
    fork(userDetails),
    fork(login),
    fork(register),
    fork(schedulesList),
    fork(schedulesDetails),
    fork(schedulesCreate),
    fork(schedulesDelete),
    fork(servicesList),
    fork(servicesDelete),
    fork(servicesCreate),
    fork(companyDetails),
  ]);
}

export default rootSaga;
