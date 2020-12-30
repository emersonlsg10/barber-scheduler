import { all, fork } from 'redux-saga/effects';
import auth from './auth';
import userDetails from './user/details';
import schedulesList from './schedules/list';
import schedulesDetails from './schedules/details';
import schedulesCreate from './schedules/create';
import servicesList from './services/list';
import servicesDelete from './services/delete';
import servicesCreate from './services/create';
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
    fork(servicesList),
    fork(servicesDelete),
    fork(servicesCreate),
  ]);
}

export default rootSaga;
